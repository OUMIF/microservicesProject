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
                        policy.WithOrigins("http://localhost:4200", "http://frontend:80") // Allow both origins
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials(); // Allow credentials
                    });
            });

            // Configure URLs pour écouter sur le port 80 dans le conteneur
            builder.WebHost.UseUrls("http://+:80");

            // Add services to the container.
            builder.Services.AddControllers();
            
            // Configuration JWT améliorée
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer("Bearer", options =>
           {
               // Utiliser l'URL interne du service pour la validation
               options.Authority = "http://userservice:80";
               options.Audience = "http://userservice:80";
               options.RequireHttpsMetadata = false; // Pour développement et Docker
               options.SaveToken = true;
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidIssuer = "http://userservice:80",
                   ValidateAudience = true,
                   ValidAudience = "http://userservice:80",
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

            // Use CORS - DOIT être avant l'authentification
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

            // Ocelot middleware - DOIT être après l'authentification
            await app.UseOcelot();

            app.MapControllers();

            app.Run();
        }
    }
}