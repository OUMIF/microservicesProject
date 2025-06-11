using System.Threading.Tasks;

namespace test_reponce.Services
{
    public interface IStudentService
    {
        Task<bool> IsStudentInTestFiliereAsync(string studentId, int testId);
    }

}