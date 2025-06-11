using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace test_reponce.Services
{
    public class RabbitMQStudentFormationLookup : IStudentFormationLookupService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly string _replyQueueName;
        private readonly ConcurrentDictionary<string, TaskCompletionSource<StudentFormationInfoDto>> _callbackMapper = new();
        private readonly ILogger<RabbitMQStudentFormationLookup> _logger;
        private readonly TimeSpan _requestTimeout = TimeSpan.FromSeconds(30);

        public RabbitMQStudentFormationLookup(ILogger<RabbitMQStudentFormationLookup> logger)
        {
            _logger = logger;

            try
            {
                var factory = new ConnectionFactory()
                {
                    HostName = "localhost",
                    UserName = "guest",
                    Password = "guest",
                    DispatchConsumersAsync = true,
                    AutomaticRecoveryEnabled = true,
                    NetworkRecoveryInterval = TimeSpan.FromSeconds(10)
                };

                _logger.LogInformation("Attempting to connect to RabbitMQ for student formation lookup...");
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                _replyQueueName = _channel.QueueDeclare(
                    queue: "",
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null).QueueName;

                var consumer = new AsyncEventingBasicConsumer(_channel);
                consumer.Received += async (model, ea) =>
                {
                    if (!_callbackMapper.TryRemove(ea.BasicProperties.CorrelationId, out var tcs))
                    {
                        _logger.LogWarning("Received message with unknown correlation ID: {CorrelationId}", ea.BasicProperties.CorrelationId);
                        return;
                    }

                    try
                    {
                        var body = ea.Body.ToArray();
                        var response = JsonSerializer.Deserialize<StudentFormationInfoDto>(Encoding.UTF8.GetString(body));

                        if (response == null)
                        {
                            tcs.SetException(new InvalidOperationException("Received null response from formation service"));
                            return;
                        }

                        _logger.LogDebug("Received student formation info response for correlation ID {CorrelationId}", ea.BasicProperties.CorrelationId);
                        tcs.SetResult(response);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error processing RabbitMQ message for student formation lookup");
                        tcs.SetException(ex);
                    }
                };

                _channel.BasicConsume(
                    consumer: consumer,
                    queue: _replyQueueName,
                    autoAck: true);

                _logger.LogInformation("RabbitMQ student formation lookup initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize RabbitMQ connection for student formation lookup");
                throw;
            }
        }

        public async Task<StudentFormationInfoDto> GetStudentFormationInfoAsync(string studentId)
        {
            if (string.IsNullOrWhiteSpace(studentId))
            {
                throw new ArgumentException("Student ID cannot be empty", nameof(studentId));
            }

            _logger.LogInformation("Looking up formation info for student: {StudentId}", studentId);

            var correlationId = Guid.NewGuid().ToString();
            var tcs = new TaskCompletionSource<StudentFormationInfoDto>();
            _callbackMapper.TryAdd(correlationId, tcs);

            try
            {
                var props = _channel.CreateBasicProperties();
                props.CorrelationId = correlationId;
                props.ReplyTo = _replyQueueName;
                props.Persistent = true;

                var request = new StudentFormationLookupRequest { StudentId = studentId };
                var message = JsonSerializer.Serialize(request);
                var body = Encoding.UTF8.GetBytes(message);

                _channel.BasicPublish(
                    exchange: "",
                    routingKey: "student-formation-lookup-queue",
                    mandatory: true,
                    basicProperties: props,
                    body: body);

                _logger.LogDebug("Published student formation lookup request for: {StudentId}", studentId);

                using var cts = new CancellationTokenSource(_requestTimeout);
                cts.Token.Register(() =>
                {
                    if (_callbackMapper.TryRemove(correlationId, out var timeoutTcs))
                    {
                        timeoutTcs.TrySetCanceled();
                        _logger.LogWarning("Timeout occurred for student formation lookup: {StudentId}", studentId);
                    }
                });

                return await tcs.Task;
            }
            catch (Exception ex)
            {
                _callbackMapper.TryRemove(correlationId, out _);
                _logger.LogError(ex, "Error publishing student formation lookup request");
                throw;
            }
        }

        public void Dispose()
        {
            _logger.LogInformation("Disposing RabbitMQ student formation lookup resources");
            try
            {
                _channel?.Close();
                _connection?.Close();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error disposing RabbitMQ student formation lookup resources");
            }
            finally
            {
                _channel?.Dispose();
                _connection?.Dispose();
            }
        }

        private class StudentFormationLookupRequest
        {
            public string StudentId { get; set; }
        }
    }
}