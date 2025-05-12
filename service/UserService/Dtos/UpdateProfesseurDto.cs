namespace UserService.Dtos
{
    public class UpdateProfesseurDto
    {
        public string? Email { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Photo { get; set; }
        public string? Departement { get; set; }
        public string? ModulesEnseignes { get; set; }
        public string? Matricule { get; set; }
        public int? AnneesDExperience { get; set; }
        public string? Filieres { get; set; }
        public string? Specialite { get; set; }
    }
}
