// DTOs/StudentReferenceDto.cs
namespace FormationService.DTOs
{
    public class StudentReferenceDto
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int FiliereId { get; set; }
    }
    
    public class CreateStudentReferenceDto
    {
        public int StudentId { get; set; }
        public int FiliereId { get; set; }
    }
}