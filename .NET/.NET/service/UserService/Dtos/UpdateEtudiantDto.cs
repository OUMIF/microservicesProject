namespace UserService.Dtos
{
    public class UpdateEtudiantDto
    {
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Photo { get; set; }
        public string? CNE { get; set; }
        public DateTime? DateDeNaissance { get; set; }
        public string? LieuDeNaissance { get; set; }
        public string? Filiere { get; set; }
        public string? AnneeDEtude { get; set; }
    }
}
