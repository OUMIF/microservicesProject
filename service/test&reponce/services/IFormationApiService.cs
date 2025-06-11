namespace test_reponce.services
{
    public interface IFormationApiService
    {
        Task<int> GetFormationIdByTestIdAsync(int testId);
        Task<bool> IsStudentEnrolledInFormationAsync(string studentId, int formationId);
    }
}
