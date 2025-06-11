using System.Threading.Tasks;

namespace test_reponce.Services
{
    public interface IFormationLookupService
    {
        Task<int?> GetFormationIdByNameAsync(string formationName);
    }
}