using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace UserService.Models
{
    public class AppUser : IdentityUser
    {
        // Common fields
        [StringLength(100)]
        public string? Nom { get; set; }

        [StringLength(100)]
        public string? Prenom { get; set; }
        [StringLength(200)]
        public string? Photo { get; set; }  // URL or initials

        // Student-specific fields
        [StringLength(50)]
        public string? CNE { get; set; }  // Student ID

        [StringLength(100)]
        public string? LieuDeNaissance { get; set; }  // Birth place

        [StringLength(20)]
        public string? AnneeDEtude { get; set; }  // Academic year (e.g., "2023/2024")

        [StringLength(50)]
        public string? Filiere { get; set; }  // Student's program

        public DateTime? DateOfBirth { get; set; }

        // Professor-specific fields
        [StringLength(50)]
        public string? Matricule { get; set; }  // Professor ID

        public int? YearsOfExperience { get; set; }

        [StringLength(100)]
        public string? ModulesEnseignes { get; set; }  // Comma-separated list (e.g., "Algorithmique,Base de données")

        [StringLength(100)]
        public string? ProfessorFilieres { get; set; }  // Comma-separated list (e.g., "GINF,GSTR")

        [StringLength(50)]
        public string? Departement { get; set; }

        [StringLength(100)]
        public string? Specialite { get; set; }
    }
}
