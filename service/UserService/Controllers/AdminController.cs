using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using UserService.Dtos;
using UserService.Models;
using UserService.Services;

namespace UserService.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<AdminController> _logger;
        private readonly MailService _mailService;

        public AdminController(UserManager<AppUser> userManager, ILogger<AdminController> logger, MailService mailService)
        {
            _userManager = userManager;
            _logger = logger;
            _mailService = mailService;
        }

        [HttpPost("create-professeur")]
        public async Task<IActionResult> CreateProfesseur([FromBody] CreateProfesseurDto request)
        {
            _logger.LogInformation($"Admin attempting to create professor with email: {request.Email}");

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null) return BadRequest("User already exists.");

            var passwordOptions = _userManager.Options.Password;
            string generatedPassword = GenerateSecurePassword(passwordOptions);

            var professeur = new AppUser
            {
                UserName = request.Email,
                Email = request.Email,
                Nom = request.Nom,
                Prenom = request.Prenom,
                Photo = request.Photo,
                Departement = request.Departement,
                ModulesEnseignes = request.ModulesEnseignes,
                Matricule = request.Matricule,
                YearsOfExperience = request.AnneesDExperience,
                ProfessorFilieres = request.Filieres,
                Specialite = request.Specialite,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(professeur, generatedPassword);
            if (!result.Succeeded)
            {
                _logger.LogError($"Failed to create professor: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(professeur, "Professeur");
            _logger.LogInformation($"Successfully created professor {request.Nom} {request.Prenom}");
            await _mailService.SendEmailAsync(
               professeur.Email,
                  "Your Account Has Been Created",
                $"Hello {professeur.Prenom},\n\nYour account has been created.\nLogin: {professeur.Email}\nPassword: {generatedPassword}"
             );


            return Ok(new
            {
                Message = "Professeur created successfully.",
                Email = professeur.Email,
                Password = generatedPassword,
                Matricule = professeur.Matricule
            });
        }

        [HttpPost("create-etudiant")]
        public async Task<IActionResult> CreateEtudiant([FromBody] CreateEtudiantDto request)
        {
            _logger.LogInformation($"Admin attempting to create student with CNE: {request.CNE}");

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null) return BadRequest("User already exists.");

            var passwordOptions = _userManager.Options.Password;
            string generatedPassword = GenerateSecurePassword(passwordOptions);

            var etudiant = new AppUser
            {
                UserName = request.Email,
                Email = request.Email,
                CNE = request.CNE,
                Nom = request.Nom,
                Prenom = request.Prenom,
                Photo = request.Photo,
                DateOfBirth = request.DateDeNaissance,
                LieuDeNaissance = request.LieuDeNaissance,
                Filiere = request.Filiere,
                AnneeDEtude = request.AnneeDEtude,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(etudiant, generatedPassword);
            if (!result.Succeeded)
            {
                _logger.LogError($"Failed to create student: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(etudiant, "Etudiant");
            _logger.LogInformation($"Successfully created student {request.Nom} {request.Prenom}");
            await _mailService.SendEmailAsync(
                      etudiant.Email,
                     "Your Account Has Been Created",
                      $"Hello {etudiant.Prenom},\n\nYour account has been created.\nLogin: {etudiant.Email}\nPassword: {generatedPassword}"
                      );


            return Ok(new
            {
                Message = "Etudiant created successfully.",
                Email = etudiant.Email,
                CNE = etudiant.CNE,
                Password = generatedPassword
            });
        }
        [HttpGet("All-Professeur")]
        public async Task<IActionResult> GetProfesseurs()
        {
            var professeurs = await _userManager.GetUsersInRoleAsync("Professeur");
            if (professeurs == null || !professeurs.Any())
            {
                return NotFound("No professors found.");
            }
            var result = professeurs.Select(p => new
            {
                p.Id,
                p.Email,
                p.Nom,
                p.Prenom,
                p.Photo,
                p.Departement,
                p.ModulesEnseignes,
                p.Matricule,
                p.YearsOfExperience,
                p.ProfessorFilieres,
                p.Specialite
            });
            return Ok(result);
        }
        [HttpGet("All-Etudiant")]
        public async Task<IActionResult> GetEtudiants()
        {
            var etudiants = await _userManager.GetUsersInRoleAsync("Etudiant");
            if (etudiants == null || !etudiants.Any())
            {
                return NotFound("No students found.");
            }
            var result = etudiants.Select(e => new
            {
                e.Id,
                e.Email,
                e.CNE,
                e.Nom,
                e.Prenom,
                e.Photo,
                e.DateOfBirth,
                e.LieuDeNaissance,
                e.Filiere,
                e.AnneeDEtude
            });
            return Ok(result);
        }
        [HttpPut("update-professeur/{id}")]
        public async Task<IActionResult> UpdateProfesseur(string id, [FromBody] UpdateProfesseurDto request)
        {
            _logger.LogInformation($"Updating professor with ID: {id}");

            var professeur = await _userManager.FindByIdAsync(id);
            if (professeur == null) return NotFound("Professor not found.");

            
            if (!string.IsNullOrEmpty(request.Email) && request.Email != professeur.Email)
            {
                
                var existingUser = await _userManager.FindByEmailAsync(request.Email);
                if (existingUser != null && existingUser.Id != id)
                {
                    return BadRequest("Email is already in use by another user.");
                }

                professeur.Email = request.Email;
                professeur.UserName = request.Email;
            }

            professeur.Nom = request.Nom ?? professeur.Nom;
            professeur.Prenom = request.Prenom ?? professeur.Prenom;
            professeur.Photo = request.Photo ?? professeur.Photo;
            professeur.Departement = request.Departement ?? professeur.Departement;
            professeur.ModulesEnseignes = request.ModulesEnseignes ?? professeur.ModulesEnseignes;
            professeur.Matricule = request.Matricule ?? professeur.Matricule;
            professeur.YearsOfExperience = request.AnneesDExperience ?? professeur.YearsOfExperience;
            professeur.ProfessorFilieres = request.Filieres ?? professeur.ProfessorFilieres;
            professeur.Specialite = request.Specialite ?? professeur.Specialite;

            var result = await _userManager.UpdateAsync(professeur);
            if (!result.Succeeded)
            {
                _logger.LogError($"Failed to update professor: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "Professor updated successfully." });
        }

        [HttpPut("update-etudiant/{id}")]
        public async Task<IActionResult> UpdateEtudiant(string id, [FromBody] UpdateEtudiantDto request)
        {
            _logger.LogInformation($"Updating student with ID: {id}");

            var etudiant = await _userManager.FindByIdAsync(id);
            if (etudiant == null) return NotFound("Student not found.");

       
            if (!string.IsNullOrEmpty(request.Email) && request.Email != etudiant.Email)
            {
                
                var existingUser = await _userManager.FindByEmailAsync(request.Email);
                if (existingUser != null && existingUser.Id != id)
                {
                    return BadRequest("Email is already in use by another user.");
                }

                etudiant.Email = request.Email;
                etudiant.UserName = request.Email; 
            }

            etudiant.Nom = request.Nom ?? etudiant.Nom;
            etudiant.Prenom = request.Prenom ?? etudiant.Prenom;
            etudiant.Photo = request.Photo ?? etudiant.Photo;
            etudiant.CNE = request.CNE ?? etudiant.CNE;
            etudiant.DateOfBirth = request.DateDeNaissance ?? etudiant.DateOfBirth;
            etudiant.LieuDeNaissance = request.LieuDeNaissance ?? etudiant.LieuDeNaissance;
            etudiant.Filiere = request.Filiere ?? etudiant.Filiere;
            etudiant.AnneeDEtude = request.AnneeDEtude ?? etudiant.AnneeDEtude;

            var result = await _userManager.UpdateAsync(etudiant);
            if (!result.Succeeded)
            {
                _logger.LogError($"Failed to update student: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "Student updated successfully." });
        }

        [HttpDelete("delete-professeur/{id}")]
        public async Task<IActionResult> DeleteProfesseur(string id)
        {
            _logger.LogInformation($"Deleting professor with ID: {id}");

            var professeur = await _userManager.FindByIdAsync(id);
            if (professeur == null) return NotFound("Professor not found.");

            var result = await _userManager.DeleteAsync(professeur);
            if (!result.Succeeded)
            {
                _logger.LogError($"Failed to delete professor: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "Professor deleted successfully." });
        }

        [HttpDelete("delete-etudiant/{id}")]
        public async Task<IActionResult> DeleteEtudiant(string id)
        {
            _logger.LogInformation($"Deleting student with ID: {id}");

            var etudiant = await _userManager.FindByIdAsync(id);
            if (etudiant == null) return NotFound("Student not found.");

            var result = await _userManager.DeleteAsync(etudiant);
            if (!result.Succeeded)
            {
                _logger.LogError($"Failed to delete student: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors);
            }

            return Ok(new { Message = "Student deleted successfully." });
        }


        private string GenerateSecurePassword(PasswordOptions options)
        {
            const string validLower = "abcdefghijklmnopqrstuvwxyz";
            const string validUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string validDigits = "1234567890";
            const string validNonAlphanumeric = "!@#$%^&*()_+-=[]{}|;:,.<>?";

            var random = new Random();
            var chars = new List<char>();

            // Ensure at least one lowercase
            chars.Add(validLower[random.Next(validLower.Length)]);

            // Ensure at least one uppercase
            chars.Add(validUpper[random.Next(validUpper.Length)]);

            // Ensure at least one digit
            chars.Add(validDigits[random.Next(validDigits.Length)]);

            // Ensure non-alphanumeric if required
            if (options.RequireNonAlphanumeric)
            {
                chars.Add(validNonAlphanumeric[random.Next(validNonAlphanumeric.Length)]);
            }

            // Fill remaining length with random characters
            for (int i = chars.Count; i < options.RequiredLength; i++)
            {
                string allValidChars = validLower + validUpper + validDigits;
                if (options.RequireNonAlphanumeric) allValidChars += validNonAlphanumeric;

                chars.Add(allValidChars[random.Next(allValidChars.Length)]);
            }

            // Shuffle the characters to avoid predictable patterns
            var shuffled = chars.OrderBy(c => random.Next()).ToArray();
            return new string(shuffled);
        }
    }
}