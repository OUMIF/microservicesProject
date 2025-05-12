// Interface/IFiliereService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using FormationService.DTOs;

namespace FormationService.Interface
{
    public interface IFiliereService
    {
        Task<IEnumerable<FiliereDto>> GetAllFilieresAsync();
        Task<FiliereDto> GetFiliereByIdAsync(int id);
        Task<IEnumerable<FiliereDto>> GetFilieresByFormationIdAsync(int formationId);
        Task<FiliereDto> CreateFiliereAsync(CreateFiliereDto filiereDto);
        Task<FiliereDto> UpdateFiliereAsync(int id, UpdateFiliereDto filiereDto);
        Task<bool> DeleteFiliereAsync(int id);
        
        // Methods for managing professors in a filiere
        Task<bool> AddProfessorToFiliereAsync(CreateProfessorReferenceDto professorReferenceDto);
        Task<bool> RemoveProfessorFromFiliereAsync(int filiereId, int professorId);
        Task<IEnumerable<ProfessorReferenceDto>> GetProfessorsByFiliereIdAsync(int filiereId);
        
        // Methods for managing students in a filiere
        Task<bool> AddStudentToFiliereAsync(CreateStudentReferenceDto studentReferenceDto);
        Task<bool> RemoveStudentFromFiliereAsync(int filiereId, int studentId);
        Task<IEnumerable<StudentReferenceDto>> GetStudentsByFiliereIdAsync(int filiereId);
    }
}