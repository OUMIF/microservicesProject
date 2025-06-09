using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace ApiGateway
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "_myAllowSpecificOrigins",
                    policy =>
                    {
                        policy.WithOrigins(
                                "http://localhost:4200", 
                                "http://frontend:80",
                                "http://127.0.0.1:4200",
                                "http://localhost:3000") // Ajouter d'autres origines si nécessaire
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials(); // Allow credentials
                    });
            });

            // CORRECTION: Configurez pour écouter sur le port 80 dans le conteneur
            // Le mapping Docker 5000:80 va mapper le port 80 du conteneur vers 5000 de l'hôte
            builder.WebHost.UseUrls("http://+:80");

            // Add services to the container.
            builder.Services.AddControllers();
            
            // Configuration JWT corrigée
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer("Bearer", options =>
           {
               options.RequireHttpsMetadata = false; // Pour développement et Docker
               options.SaveToken = true;
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidIssuer = "https://localhost:5018", // Doit correspondre au token JWT
                   ValidateAudience = true,
                   ValidAudience = "http://localhost:4200", // Doit correspondre au token JWT
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(
                       Encoding.UTF8.GetBytes("souhaillwa3rrrrrr@123333333haahehihasihkakjhjjsjdjjjjjjjjjjjjjjjjjjjjjjjjjhvkjygkjgkjgjkgjgjhgjgj")),
                   ValidateLifetime = true,
                   ClockSkew = TimeSpan.Zero
               };
               options.Events = new JwtBearerEvents
               {
                   OnAuthenticationFailed = context =>
                   {
                       Console.WriteLine($"Authentication failed: {context.Exception}");
                       return Task.CompletedTask;
                   },
                   OnTokenValidated = context =>
                   {
                       Console.WriteLine("Token validated successfully");
                       return Task.CompletedTask;
                   },
                   OnMessageReceived = context =>
                   {
                       Console.WriteLine("Token received");
                       return Task.CompletedTask;
                   }
               };
           });

            // Swagger/OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            // Configuration Ocelot
            builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
            builder.Services.AddOcelot(builder.Configuration);

            // Health checks
            builder.Services.AddHealthChecks();

            var app = builder.Build();

            // IMPORTANT: CORS doit être en premier
            app.UseCors("_myAllowSpecificOrigins");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Health check endpoint
            app.MapHealthChecks("/health");

            // Middleware d'authentification
            app.UseAuthentication();
            app.UseAuthorization();

            // Ocelot middleware - DOIT être après l'authentification et CORS
            await app.UseOcelot();

            app.MapControllers();

            app.Run();
        }
    }
}