using System.Collections.Generic;
using System.Threading.Tasks;
using test_reponce.DTOs;
using test_reponce.Models;

namespace test_reponce.Services
{
    public interface ITestService
    {
        Task<bool> DeleteTestAsync(int id);
        Task<Test> CreateTestAsync(Test test, List<QuestionCreateDto> questions);
        Task<TestDetailsDto> GetTestWithQuestionsAsync(int testId); // Keep original for backward compatibility
        Task<TestDetailsDto> GetTestWithQuestionsAsync(int testId, string userId, bool isAdmin); // Add new version
        Task<IEnumerable<TestSummaryDto>> GetTestsByUserIdAsync(string userId);
        Task<IEnumerable<TestSummaryDto>> GetAllTestsAsync();
        Task<TestDetailsDto> UpdateTestAsync(int id, TestUpdateDto dto);
        Task<Test> GetTestByIdAsync(int id);
        Task<bool> IsTestCreatedByUserAsync(int testId, string userId);
    }
}