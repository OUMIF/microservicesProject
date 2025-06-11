using System.Collections.Generic;
using System.Threading.Tasks;
using test_reponce.DTOs;
using test_reponce.Models;

namespace test_reponce.Services
{
    public interface IStudentTestService
    {
        Task<List<StudentTestDto>> GetAvailableTestsForStudentAsync(string studentId);
        Task<TestForStudentDto> GetTestForStudentAsync(int testId, string studentId);
        Task<StudentTestResponse> StartTestAsync(int testId, string studentId);
        Task<TestResultDto> SubmitTestAsync(SubmitTestDto submitTestDto, string studentId);
        Task<List<TestResultDto>> GetStudentTestHistoryAsync(string studentId);
        Task<TestResultDto> GetTestResultAsync(int testId, string studentId);
    }
}