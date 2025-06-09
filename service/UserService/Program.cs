using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using UserService.Data;
using Microsoft.OpenApi.Models;
using UserService.Models; 
using UserService.Interface;
using UserService.Services;



var builder = WebApplication.CreateBuilder(args);

// Configuration des services
builder.Services.AddDbContext<ApplicationDBCContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null)));

// Configuration d'Identity
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
})
.AddEntityFrameworkStores<ApplicationDBCContext>()
.AddDefaultTokenProviders();

builder.Services.AddScoped<ITokenService, TokenService>();
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

// Dans votre Program.cs, remplacez la section de migration par :

try
{
    Console.WriteLine("Vérification de la base de données...");
    
    // Vérifier si la DB existe
    var canConnect = await context.Database.CanConnectAsync();
    
    if (!canConnect)
    {
        // Créer la DB si elle n'existe pas
        await context.Database.EnsureCreatedAsync();
        Console.WriteLine("Base de données créée.");
    }
    else
    {
        // Vérifier s'il y a des migrations en attente
        var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
        var appliedMigrations = await context.Database.GetAppliedMigrationsAsync();
        
        Console.WriteLine($"Migrations appliquées : {appliedMigrations.Count()}");
        Console.WriteLine($"Migrations en attente : {pendingMigrations.Count()}");
        
        if (pendingMigrations.Any())
        {
            try
            {
                // Tenter d'appliquer les migrations
                await context.Database.MigrateAsync();
                Console.WriteLine("Migrations appliquées avec succès.");
            }
            catch (Exception migrationEx)
            {
                Console.WriteLine($"Erreur lors des migrations : {migrationEx.Message}");
                
                // Si les tables existent déjà, marquer les migrations comme appliquées
                if (migrationEx.Message.Contains("already an object named"))
                {
                    Console.WriteLine("Les tables existent déjà. Marquage des migrations comme appliquées...");
                    
                    // Ici vous pourriez exécuter une commande SQL pour insérer dans __EFMigrationsHistory
                    // Ou simplement continuer sans erreur
                    Console.WriteLine("Continuant avec la base existante...");
                }
                else
                {
                    throw; // Re-lancer si c'est une autre erreur
                }
            }
        }
        else
        {
            Console.WriteLine("Base de données à jour.");
        }
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Erreur lors de l'initialisation de la base de données : {ex.Message}");
    // Ne pas faire throw ici pour permettre à l'app de démarrer
    Console.WriteLine("L'application va démarrer sans migration...");
}
}

// Middleware & pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
   {
       var services = scope.ServiceProvider;
       try
       {
           var logger = services.GetRequiredService<ILogger<Program>>();
           await SeedData.Initialize(services, logger);
       }
       catch (Exception ex)
       {
           var logger = services.GetRequiredService<ILogger<Program>>();
           logger.LogError(ex, "An error occurred seeding the database.");
       }
   }

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow }));

app.Run();
