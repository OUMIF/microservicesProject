// Services/FiliereService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormationService.Data;
using FormationService.DTOs;
using FormationService.Interface;
using FormationService.Models;
using Microsoft.EntityFrameworkCore;

namespace FormationService.Services
{
    public class FiliereService : IFiliereService
    {
        private readonly FormationDbContext _context;
        
        public FiliereService(FormationDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<FiliereDto>> GetAllFilieresAsync()
        {
            var filieres = await _context.Filieres
                .Include(f => f.Professors)
                .Include(f => f.Students)
                .ToListAsync();
                
            return filieres.Select(f => MapFiliereToDto(f));
        }
        
        public async Task<FiliereDto> GetFiliereByIdAsync(int id)
        {
            var filiere = await _context.Filieres
                .Include(f => f.Professors)
                .Include(f => f.Students)
                .FirstOrDefaultAsync(f => f.IdFiliere == id);
                
            if (filiere == null)
                return null;
                
            return MapFiliereToDto(filiere);
        }
        
        public async Task<IEnumerable<FiliereDto>> GetFilieresByFormationIdAsync(int formationId)
        {
            var filieres = await _context.Filieres
                .Include(f => f.Professors)
                .Include(f => f.Students)
                .Where(f => f.FormationId == formationId)
                .ToListAsync();
                
            return filieres.Select(f => MapFiliereToDto(f));
        }
        
        public async Task<FiliereDto> CreateFiliereAsync(CreateFiliereDto filiereDto)
        {
            // Check if the formation exists
            var formation = await _context.Formations.FindAsync(filiereDto.FormationId);
            if (formation == null)
                throw new Exception($"Formation with ID {filiereDto.FormationId} not found");
                
            var filiere = new Filiere
            {
                Nom = filiereDto.Nom,
                Description = filiereDto.Description,
                Promotion = filiereDto.Promotion,
                FormationId = filiereDto.FormationId
            };
            
            _context.Filieres.Add(filiere);
            await _context.SaveChangesAsync();
            
            return new FiliereDto
            {
                IdFiliere = filiere.IdFiliere,
                Nom = filiere.Nom,
                Description = filiere.Description,
                Promotion = filiere.Promotion,
                FormationId = filiere.FormationId,
                ProfessorIds = new List<int>(),
                StudentIds = new List<int>()
            };
        }
        
        public async Task<FiliereDto> UpdateFiliereAsync(int id, UpdateFiliereDto filiereDto)
        {
            var filiere = await _context.Filieres.FindAsync(id);
            
            if (filiere == null)
                return null;
                
            // Check if the new formation exists if it's different
            if (filiere.FormationId != filiereDto.FormationId)
            {
                var formation = await _context.Formations.FindAsync(filiereDto.FormationId);
                if (formation == null)
                    throw new Exception($"Formation with ID {filiereDto.FormationId} not found");
            }
            
            filiere.Nom = filiereDto.Nom;
            filiere.Description = filiereDto.Description;
            filiere.Promotion = filiereDto.Promotion;
            filiere.FormationId = filiereDto.FormationId;
            
            await _context.SaveChangesAsync();
            
            return await GetFiliereByIdAsync(id);
        }
        
        public async Task<bool> DeleteFiliereAsync(int id)
        {
            var filiere = await _context.Filieres.FindAsync(id);
            
            if (filiere == null)
                return false;
                
            _context.Filieres.Remove(filiere);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        // Professor reference methods
        public async Task<bool> AddProfessorToFiliereAsync(CreateProfessorReferenceDto professorReferenceDto)
        {
            // Check if the filiere exists
            var filiere = await _context.Filieres.FindAsync(professorReferenceDto.FiliereId);
            if (filiere == null)
                return false;
                
            // Check if the professor reference already exists
            var existingReference = await _context.ProfessorReferences
                .FirstOrDefaultAsync(p => p.ProfessorId == professorReferenceDto.ProfessorId && 
                                          p.FiliereId == professorReferenceDto.FiliereId);
                                          
            if (existingReference != null)
                return true; // Already exists, no need to add again
                
            var professorReference = new ProfessorReference
            {
                ProfessorId = professorReferenceDto.ProfessorId,
                FiliereId = professorReferenceDto.FiliereId
            };
            
            _context.ProfessorReferences.Add(professorReference);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<bool> RemoveProfessorFromFiliereAsync(int filiereId, int professorId)
        {
            var professorReference = await _context.ProfessorReferences
                .FirstOrDefaultAsync(p => p.ProfessorId == professorId && p.FiliereId == filiereId);
                
            if (professorReference == null)
                return false;
                
            _context.ProfessorReferences.Remove(professorReference);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<IEnumerable<ProfessorReferenceDto>> GetProfessorsByFiliereIdAsync(int filiereId)
        {
            var professorReferences = await _context.ProfessorReferences
                .Where(p => p.FiliereId == filiereId)
                .ToListAsync();
                
            return professorReferences.Select(p => new ProfessorReferenceDto
            {
                Id = p.Id,
                ProfessorId = p.ProfessorId,
                FiliereId = p.FiliereId
            });
        }
        
        // Student reference methods
        public async Task<bool> AddStudentToFiliereAsync(CreateStudentReferenceDto studentReferenceDto)
        {
            // Check if the filiere exists
            var filiere = await _context.Filieres.FindAsync(studentReferenceDto.FiliereId);
            if (filiere == null)
                return false;
                
            // Check if the student reference already exists
            var existingReference = await _context.StudentReferences
                .FirstOrDefaultAsync(s => s.StudentId == studentReferenceDto.StudentId && 
                                          s.FiliereId == studentReferenceDto.FiliereId);
                                          
            if (existingReference != null)
                return true; // Already exists, no need to add again
                
            var studentReference = new StudentReference
            {
                StudentId = studentReferenceDto.StudentId,
                FiliereId = studentReferenceDto.FiliereId
            };
            
            _context.StudentReferences.Add(studentReference);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<bool> RemoveStudentFromFiliereAsync(int filiereId, int studentId)
        {
            var studentReference = await _context.StudentReferences
                .FirstOrDefaultAsync(s => s.StudentId == studentId && s.FiliereId == filiereId);
                
            if (studentReference == null)
                return false;
                
            _context.StudentReferences.Remove(studentReference);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<IEnumerable<StudentReferenceDto>> GetStudentsByFiliereIdAsync(int filiereId)
        {
            var studentReferences = await _context.StudentReferences
                .Where(s => s.FiliereId == filiereId)
                .ToListAsync();
                
            return studentReferences.Select(s => new StudentReferenceDto
            {
                Id = s.Id,
                StudentId = s.StudentId,
                FiliereId = s.FiliereId
            });
        }
        
        // Helper methods
        private FiliereDto MapFiliereToDto(Filiere filiere)
        {
            return new FiliereDto
            {
                IdFiliere = filiere.IdFiliere,
                Nom = filiere.Nom,
                Description = filiere.Description,
                Promotion = filiere.Promotion,
                FormationId = filiere.FormationId,
                ProfessorIds = filiere.Professors?.Select(p => p.ProfessorId).ToList() ?? new List<int>(),
                StudentIds = filiere.Students?.Select(s => s.StudentId).ToList() ?? new List<int>()
            };
        }
    }
}