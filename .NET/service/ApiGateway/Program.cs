
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
                        policy.WithOrigins("http://localhost:4200") // Allow the specific origin
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials(); // Allow credentials
                    });
            });

            builder.WebHost.UseUrls("http://localhost:5001", "https://localhost:5000");

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer("Bearer", options =>
           {
               options.Authority = "https://localhost:5018";
               options.Audience = "https://localhost:5018";
               options.RequireHttpsMetadata = false; // For development only
               options.SaveToken = true;
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidIssuer = "https://localhost:5018",
                   ValidateAudience = true,
                   ValidAudience = "https://localhost:5018",
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
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Configuration.AddJsonFile("ocelot.json");
            builder.Services.AddOcelot(builder.Configuration);

            var app = builder.Build();

            // Use CORS
            app.UseCors("_myAllowSpecificOrigins");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }          
           
            app.UseOcelot().Wait();


            app.MapControllers();

            app.Run();
        }
    }
}
