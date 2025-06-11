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
    public class RabbitMQFormationLookup : IFormationLookupService, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly string _replyQueueName;
        private readonly ConcurrentDictionary<string, TaskCompletionSource<int?>> _callbackMapper = new();
        private readonly ILogger<RabbitMQFormationLookup> _logger;
        private readonly TimeSpan _requestTimeout = TimeSpan.FromSeconds(30);

        public RabbitMQFormationLookup(ILogger<RabbitMQFormationLookup> logger)
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

                _logger.LogInformation("Attempting to connect to RabbitMQ...");
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
                        var response = JsonSerializer.Deserialize<FormationLookupResponse>(Encoding.UTF8.GetString(body));

                        if (response == null)
                        {
                            tcs.SetException(new InvalidOperationException("Received null response from formation service"));
                            return;
                        }

                        _logger.LogDebug("Received formation lookup response for correlation ID {CorrelationId}", ea.BasicProperties.CorrelationId);
                        tcs.SetResult(response.Id);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error processing RabbitMQ message");
                        tcs.SetException(ex);
                    }
                };

                _channel.BasicConsume(
                    consumer: consumer,
                    queue: _replyQueueName,
                    autoAck: true);

                _logger.LogInformation("RabbitMQ connection and consumer initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize RabbitMQ connection");
                throw;
            }
        }

        public async Task<int?> GetFormationIdByNameAsync(string formationName)
        {
            if (string.IsNullOrWhiteSpace(formationName))
            {
                throw new ArgumentException("Formation name cannot be empty", nameof(formationName));
            }

            _logger.LogInformation("Looking up formation ID for: {FormationName}", formationName);

            var correlationId = Guid.NewGuid().ToString();
            var tcs = new TaskCompletionSource<int?>();
            _callbackMapper.TryAdd(correlationId, tcs);

            try
            {
                var props = _channel.CreateBasicProperties();
                props.CorrelationId = correlationId;
                props.ReplyTo = _replyQueueName;
                props.Persistent = true;

                var request = new FormationLookupRequest { Name = formationName };
                var message = JsonSerializer.Serialize(request);
                var body = Encoding.UTF8.GetBytes(message);

                _channel.BasicPublish(
                    exchange: "",
                    routingKey: "formation-lookup-queue",
                    mandatory: true,
                    basicProperties: props,
                    body: body);

                _logger.LogDebug("Published formation lookup request for: {FormationName}", formationName);

                // Add timeout
                using var cts = new CancellationTokenSource(_requestTimeout);
                cts.Token.Register(() =>
                {
                    if (_callbackMapper.TryRemove(correlationId, out var timeoutTcs))
                    {
                        timeoutTcs.TrySetCanceled();
                        _logger.LogWarning("Timeout occurred for formation lookup: {FormationName}", formationName);
                    }
                });

                return await tcs.Task;
            }
            catch (Exception ex)
            {
                _callbackMapper.TryRemove(correlationId, out _);
                _logger.LogError(ex, "Error publishing formation lookup request");
                throw;
            }
        }

        public void Dispose()
        {
            _logger.LogInformation("Disposing RabbitMQ resources");
            try
            {
                _channel?.Close();
                _connection?.Close();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error disposing RabbitMQ resources");
            }
            finally
            {
                _channel?.Dispose();
                _connection?.Dispose();
            }
        }

        private class FormationLookupRequest
        {
            public string Name { get; set; }
        }

        private class FormationLookupResponse
        {
            public int? Id { get; set; }
            public string Error { get; set; }
        }
    }
}