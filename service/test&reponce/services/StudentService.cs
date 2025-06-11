// Services/StudentService.cs
using test_reponce.services;
using test_reponce.Services;

public class StudentService : IStudentService
{
    private readonly IFormationApiService _formationApi;
    private readonly ILogger<StudentService> _logger;

    public StudentService(
        IFormationApiService formationApi,
        ILogger<StudentService> logger)
    {
        _formationApi = formationApi;
        _logger = logger;
    }

    public async Task<bool> IsStudentInTestFiliereAsync(string studentId, int testId)
    {
        try
        {
            var formationId = await _formationApi.GetFormationIdByTestIdAsync(testId);
            if (formationId <= 0)
            {
                _logger.LogWarning("Formation not found for test: {TestId}", testId);
                return false;
            }

            return await _formationApi.IsStudentEnrolledInFormationAsync(studentId, formationId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating student enrollment");
            return false;
        }
    }
}