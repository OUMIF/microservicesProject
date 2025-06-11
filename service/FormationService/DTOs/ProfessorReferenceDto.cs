// DTOs/ProfessorReferenceDto.cs
namespace FormationService.DTOs
{
    public class ProfessorReferenceDto
    {
        public int Id { get; set; }
        public int ProfessorId { get; set; }
        public int FiliereId { get; set; }
    }
    
    public class CreateProfessorReferenceDto
    {
        public int ProfessorId { get; set; }
        public int FiliereId { get; set; }
    }
}