using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using FormationService.Interface;
using FormationService.DTOs;

namespace FormationService.Services
{
    public class FormationLookupConsumer : BackgroundService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<FormationLookupConsumer> _logger;

        public FormationLookupConsumer(
            IServiceScopeFactory scopeFactory,
            ILogger<FormationLookupConsumer> logger,
            IConnection connection)
        {
            _scopeFactory = scopeFactory;
            _logger = logger;
            _connection = connection;
            _channel = _connection.CreateModel();

            // Configure durable queue with quality of service
            _channel.QueueDeclare(
                queue: "formation-lookup-queue",
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            _channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);

            consumer.Received += async (model, ea) =>
            {
                using var scope = _scopeFactory.CreateScope();
                var formationService = scope.ServiceProvider.GetRequiredService<IFormationService>();

                try
                {
                    var body = ea.Body.ToArray();
                    var request = JsonSerializer.Deserialize<FormationLookupRequest>(Encoding.UTF8.GetString(body));

                    if (request == null || string.IsNullOrWhiteSpace(request.Name))
                    {
                        _logger.LogWarning("Received invalid formation lookup request");
                        _channel.BasicNack(ea.DeliveryTag, false, false);
                        return;
                    }

                    _logger.LogInformation("Processing formation lookup for: {Name}", request.Name);

                    var formationId = await formationService.GetFormationIdByNameAsync(request.Name);

                    var response = new FormationLookupResponse
                    {
                        Id = formationId,
                        Error = formationId.HasValue ? null : $"Formation not found: {request.Name}"
                    };

                    var responseProps = _channel.CreateBasicProperties();
                    responseProps.CorrelationId = ea.BasicProperties.CorrelationId;
                    responseProps.Persistent = true;

                    _channel.BasicPublish(
                        exchange: "",
                        routingKey: ea.BasicProperties.ReplyTo,
                        basicProperties: responseProps,
                        body: Encoding.UTF8.GetBytes(JsonSerializer.Serialize(response)));

                    _channel.BasicAck(ea.DeliveryTag, false);
                    _logger.LogInformation("Successfully processed lookup for: {Name}", request.Name);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing formation lookup request");
                    _channel.BasicNack(ea.DeliveryTag, false, true); // Requeue
                }
            };

            _channel.BasicConsume(
                queue: "formation-lookup-queue",
                autoAck: false,
                consumer: consumer);

            _logger.LogInformation("Started consuming formation lookup requests");

            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000, stoppingToken);
            }
        }

        public override void Dispose()
        {
            try
            {
                _channel?.Close();
                _connection?.Close();
                _logger.LogInformation("RabbitMQ resources cleaned up");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error cleaning up RabbitMQ resources");
            }
            finally
            {
                base.Dispose();
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