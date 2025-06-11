using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using test_reponce.Data;
using test_reponce.services;
using test_reponce.Services;

var builder = WebApplication.CreateBuilder(args);

// Add RabbitMQ service
builder.Services.AddSingleton<RabbitMQFormationLookup>();
builder.Services.AddSingleton<IFormationLookupService>(provider =>
    provider.GetRequiredService<RabbitMQFormationLookup>());

// Configure database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
           .AddJwtBearer("Bearer", options =>
           {
               options.Authority = "https://localhost:5018";
               options.Audience = "https://localhost:5018";
               options.RequireHttpsMetadata = false;
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
builder.Services.AddHttpClient();

// OR register with specific configuration
builder.Services.AddHttpClient<IFormationApiService, FormationApiService>();
builder.Services.AddScoped<ITestService, TestService>();
builder.Services.AddScoped<IStudentFormationLookupService, RabbitMQStudentFormationLookup>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IStudentTestService, StudentTestService>(); // Add this line
builder.Services.AddScoped<IFormationApiService, FormationApiService>();
builder.Services.AddHttpClient();
// Add controllers
builder.Services.AddControllers();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Initialize database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.EnsureCreated();
        Console.WriteLine("Database connection successful");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database connection failed: {ex.Message}");
    }
}

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();