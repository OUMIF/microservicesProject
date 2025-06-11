using System.Threading.Tasks;

namespace test_reponce.Services
{
    public interface IStudentFormationLookupService
    {
        Task<StudentFormationInfoDto> GetStudentFormationInfoAsync(string studentId);
    }

    public class StudentFormationInfoDto
    {
        public int FiliereId { get; set; }
        public string FiliereName { get; set; }
        public int FormationId { get; set; }
        public string FormationName { get; set; }
        public string Error { get; set; }
    }
}