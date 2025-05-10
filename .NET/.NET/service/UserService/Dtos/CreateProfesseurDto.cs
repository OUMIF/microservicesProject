using System.ComponentModel.DataAnnotations;

public class CreateProfesseurDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100)]
    public string Nom { get; set; }

    [Required]
    [StringLength(100)]
    public string Prenom { get; set; }

    [StringLength(200)]
    public string? Photo { get; set; } = "PR"; 

    [Required]
    [StringLength(50)]
    public string Departement { get; set; }

    [Required]
    [StringLength(100)]
    public string ModulesEnseignes { get; set; } 

    [Required]
    [StringLength(50)]
    public string Matricule { get; set; }

    [Required]
    public int AnneesDExperience { get; set; }

    [Required]
    [StringLength(100)]
    public string Filieres { get; set; } 

    [StringLength(100)]
    public string? Specialite { get; set; }
}