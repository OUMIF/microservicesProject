using System.ComponentModel.DataAnnotations;

public class CreateEtudiantDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(50)]
    public string CNE { get; set; }

    [Required]
    [StringLength(100)]
    public string Nom { get; set; }

    [Required]
    [StringLength(100)]
    public string Prenom { get; set; }

    [StringLength(200)]
    public string? Photo { get; set; } = "IN"; // Default to initials

    [Required]
    [DataType(DataType.Date)]
    public DateTime DateDeNaissance { get; set; }

    [Required]
    [StringLength(100)]
    public string LieuDeNaissance { get; set; }

    [Required]
    [StringLength(50)]
    public string Filiere { get; set; }

    [Required]
    [StringLength(20)]
    public string AnneeDEtude { get; set; }
}
