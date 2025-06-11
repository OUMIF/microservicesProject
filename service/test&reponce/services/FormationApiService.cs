namespace test_reponce.services
{
    // Services/FormationApiService.cs
    public class FormationApiService : IFormationApiService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FormationApiService> _logger;

        public FormationApiService(
            HttpClient httpClient,
            ILogger<FormationApiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<int> GetFormationIdByTestIdAsync(int testId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/tests/{testId}/formation-id");
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Formation lookup failed for test {TestId}: {StatusCode}", testId, response.StatusCode);
                    return 0;
                }

                var content = await response.Content.ReadFromJsonAsync<FormationIdResponse>();
                return content?.FormationId ?? 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching formation ID for test: {TestId}", testId);
                return 0;
            }
        }

        public async Task<bool> IsStudentEnrolledInFormationAsync(string studentId, int formationId)
        {
            try
            {
                var response = await _httpClient.GetAsync(
                    $"/api/students/{studentId}/enrolled-in/{formationId}");

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Enrollment check failed: {StatusCode}", response.StatusCode);
                    return false;
                }

                var content = await response.Content.ReadFromJsonAsync<EnrollmentResponse>();
                return content?.IsEnrolled ?? false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking student enrollment");
                return false;
            }
        }

        private class FormationIdResponse { public int FormationId { get; set; } }
        private class EnrollmentResponse { public bool IsEnrolled { get; set; } }
    }
}
