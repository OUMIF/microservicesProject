// Interface/IFormationService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using FormationService.DTOs;

namespace FormationService.Interface
{
    public interface IFormationService
    {
        Task<IEnumerable<FormationDto>> GetAllFormationsAsync();
        Task<FormationDto> GetFormationByIdAsync(int id);
        Task<FormationDto> CreateFormationAsync(CreateFormationDto formationDto);
        Task<FormationDto> UpdateFormationAsync(int id, UpdateFormationDto formationDto);
        Task<bool> DeleteFormationAsync(int id);
    }
}
