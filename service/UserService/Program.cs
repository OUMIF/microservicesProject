using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using UserService.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuration des services
builder.Services.AddDbContext<ApplicationDBCContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null)));

// Configuration d'Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
})
.AddEntityFrameworkStores<ApplicationDBCContext>()
.AddDefaultTokenProviders();

// Configuration des contrôleurs
builder.Services.AddControllers();

// Configuration de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "User Service API", Version = "v1" });
});

// Configuration CORS si nécessaire
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configuration des logs
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var app = builder.Build();

// Appliquer les migrations automatiquement
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDBCContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        logger.LogInformation("Vérification de la base de données...");

        await Task.Delay(5000);

        await context.Database.EnsureCreatedAsync();
        logger.LogInformation("Base de données vérifiée/créée.");

        var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
        if (pendingMigrations.Any())
        {
            logger.LogInformation($"Application de {pendingMigrations.Count()} migration(s)...");
            await context.Database.MigrateAsync();
            logger.LogInformation("Migrations appliquées avec succès.");
        }
        else
        {
            logger.LogInformation("Aucune migration en attente.");
        }

        await SeedData.Initialize(scope.ServiceProvider, logger);
        logger.LogInformation("Données de base initialisées.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Erreur lors de l'initialisation de la base de données : {Message}", ex.Message);
    }
}

// Middleware & pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }));

app.Run();
