using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using UserService.Models;

namespace UserService.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, ILogger logger)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();

            // Seed roles
            string[] roleNames = { "Admin", "Professeur", "Etudiant" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                    logger.LogInformation($"Created role {roleName}.");
                }
            }

            // Seed Admin User
            var adminUser = new AppUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                Nom = "Admin",
                Prenom = "System",
                Photo = "AS",
                EmailConfirmed = true
            };
            await CreateUser(userManager, adminUser, "Admin@1234souhail!!!!!", "Admin", logger);

            // Seed Professeur User
            var profUser = new AppUser
            {
                UserName = "prof@example.com",
                Email = "prof@example.com",
                Nom = "Smith",
                Prenom = "John",
                Photo = "SJ",
                Departement = "Informatique",
                Specialite = "Software Engineering",
                Matricule = "PROF12345",
                YearsOfExperience = 10,
                ModulesEnseignes = "Algorithmique,Base de données",
                ProfessorFilieres = "GINF,GSTR",
                EmailConfirmed = true
            };
            await CreateUser(userManager, profUser, "Professeur?@1234!!", "Professeur", logger);

            // Seed Etudiant User
            var etudiantUser = new AppUser
            {
                UserName = "etudiant@example.com",
                Email = "etudiant@example.com",
                Nom = "Doe",
                Prenom = "Jane",
                Photo = "DJ",
                CNE = "E123456789",
                DateOfBirth = new DateTime(2000, 5, 15),
                LieuDeNaissance = "Casablanca",
                Filiere = "Génie Informatique",
                AnneeDEtude = "2023/2024",
                EmailConfirmed = true
            };
            await CreateUser(userManager, etudiantUser, "Etudiant@1234", "Etudiant", logger);
        }

        private static async Task CreateUser(
            UserManager<AppUser> userManager,
            AppUser user,
            string password,
            string role,
            ILogger logger)
        {
            if (await userManager.FindByEmailAsync(user.Email) == null)
            {
                var result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, role);
                    logger.LogInformation($"Created {role} user {user.Email} with name {user.Nom} {user.Prenom}.");

                    // Log additional info based on role
                    if (role == "Professeur")
                    {
                        logger.LogInformation($"Professor details - Matricule: {user.Matricule}, Department: {user.Departement}");
                    }
                    else if (role == "Etudiant")
                    {
                        logger.LogInformation($"Student details - CNE: {user.CNE}, Filiere: {user.Filiere}");
                    }
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        logger.LogError($"Error creating user {user.Email}: {error.Description}");
                    }
                }
            }
            else
            {
                logger.LogWarning($"User {user.Email} already exists.");
            }
        }
    }
}