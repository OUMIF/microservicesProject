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
    public class RabbitMQEnrollmentVerification : IEnrollmentVerificationService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly string _replyQueueName;
        private readonly ConcurrentDictionary<string, TaskCompletionSource<bool>> _callbackMapper = new();
        private readonly ILogger<RabbitMQEnrollmentVerification> _logger;
        private readonly TimeSpan _requestTimeout = TimeSpan.FromSeconds(30);

        public RabbitMQEnrollmentVerification(ILogger<RabbitMQEnrollmentVerification> logger)
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

                _logger.LogInformation("Initializing enrollment verification RabbitMQ connection...");
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                // Configure durable reply queue
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
                        var response = JsonSerializer.Deserialize<EnrollmentVerificationResponse>(Encoding.UTF8.GetString(body));

                        if (response == null)
                        {
                            tcs.SetException(new InvalidOperationException("Received null enrollment verification response"));
                            return;
                        }

                        _logger.LogDebug("Received enrollment verification response for correlation ID {CorrelationId}", ea.BasicProperties.CorrelationId);
                        tcs.SetResult(response.IsEnrolled);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error processing enrollment verification response");
                        tcs.SetException(ex);
                    }
                };

                _channel.BasicConsume(
                    consumer: consumer,
                    queue: _replyQueueName,
                    autoAck: true);

                _logger.LogInformation("Enrollment verification RabbitMQ client initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize enrollment verification RabbitMQ connection");
                throw;
            }
        }

        public async Task<bool> IsStudentEnrolledAsync(int formationId, string studentId)
        {
            _logger.LogInformation("Verifying enrollment for student {StudentId} in formation {FormationId}", studentId, formationId);

            var correlationId = Guid.NewGuid().ToString();
            var tcs = new TaskCompletionSource<bool>();
            _callbackMapper.TryAdd(correlationId, tcs);

            try
            {
                var props = _channel.CreateBasicProperties();
                props.CorrelationId = correlationId;
                props.ReplyTo = _replyQueueName;
                props.Persistent = true;

                var request = new EnrollmentVerificationRequest
                {
                    FormationId = formationId,
                    StudentId = studentId
                };

                var message = JsonSerializer.Serialize(request);
                var body = Encoding.UTF8.GetBytes(message);

                _channel.BasicPublish(
                    exchange: "",
                    routingKey: "enrollment-verification-queue",
                    mandatory: true,
                    basicProperties: props,
                    body: body);

                _logger.LogDebug("Published enrollment verification request for student {StudentId}", studentId);

                // Add timeout
                using var cts = new CancellationTokenSource(_requestTimeout);
                cts.Token.Register(() =>
                {
                    if (_callbackMapper.TryRemove(correlationId, out var timeoutTcs))
                    {
                        timeoutTcs.TrySetCanceled();
                        _logger.LogWarning("Timeout occurred for enrollment verification: Student {StudentId}", studentId);
                    }
                });

                return await tcs.Task;
            }
            catch (Exception ex)
            {
                _callbackMapper.TryRemove(correlationId, out _);
                _logger.LogError(ex, "Error publishing enrollment verification request");
                throw;
            }
        }

        public void Dispose()
        {
            _logger.LogInformation("Disposing enrollment verification RabbitMQ resources");
            try
            {
                _channel?.Close();
                _connection?.Close();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error disposing enrollment verification RabbitMQ resources");
            }
            finally
            {
                _channel?.Dispose();
                _connection?.Dispose();
            }
        }

        private class EnrollmentVerificationRequest
        {
            public int FormationId { get; set; }
            public string StudentId { get; set; }
        }

        private class EnrollmentVerificationResponse
        {
            public bool IsEnrolled { get; set; }
            public string Error { get; set; }
        }
    }

    public interface IEnrollmentVerificationService
    {
        Task<bool> IsStudentEnrolledAsync(int formationId, string studentId);
    }
}