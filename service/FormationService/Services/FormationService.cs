// Services/FormationService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FormationService.Data;
using FormationService.DTOs;
using FormationService.Interface;
using FormationService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace FormationService.Services
{
    public class FormationService : IFormationService
    {
        private readonly FormationDbContext _context;
        private readonly ILogger<FormationService> _logger;
        public FormationService(FormationDbContext context)
        {
            _context = context;


        }

        public async Task<IEnumerable<FormationDto>> GetAllFormationsAsync()
        {
            var formations = await _context.Formations
                .Include(f => f.Filieres)
                .ToListAsync();

            return formations.Select(f => new FormationDto
            {
                IdFormation = f.IdFormation,
                Nom = f.Nom,
                Description = f.Description,
                Filieres = f.Filieres?.Select(fil => new FiliereDto
                {
                    IdFiliere = fil.IdFiliere,
                    Nom = fil.Nom,
                    Description = fil.Description,
                    Promotion = fil.Promotion,
                    FormationId = fil.FormationId
                }).ToList() ?? new List<FiliereDto>()
            });
        }

        public async Task<FormationDto> GetFormationByIdAsync(int id)
        {
            var formation = await _context.Formations
                .Include(f => f.Filieres)
                .FirstOrDefaultAsync(f => f.IdFormation == id);

            if (formation == null)
                return null;

            return new FormationDto
            {
                IdFormation = formation.IdFormation,
                Nom = formation.Nom,
                Description = formation.Description,
                Filieres = formation.Filieres?.Select(fil => new FiliereDto
                {
                    IdFiliere = fil.IdFiliere,
                    Nom = fil.Nom,
                    Description = fil.Description,
                    Promotion = fil.Promotion,
                    FormationId = fil.FormationId
                }).ToList() ?? new List<FiliereDto>()
            };
        }

        public async Task<FormationDto> CreateFormationAsync(CreateFormationDto formationDto)
        {
            var formation = new Formation
            {
                Nom = formationDto.Nom,
                Description = formationDto.Description
            };

            _context.Formations.Add(formation);
            await _context.SaveChangesAsync();

            return new FormationDto
            {
                IdFormation = formation.IdFormation,
                Nom = formation.Nom,
                Description = formation.Description,
                Filieres = new List<FiliereDto>()
            };
        }

        public async Task<FormationDto> UpdateFormationAsync(int id, UpdateFormationDto formationDto)
        {
            var formation = await _context.Formations.FindAsync(id);

            if (formation == null)
                return null;

            formation.Nom = formationDto.Nom;
            formation.Description = formationDto.Description;

            await _context.SaveChangesAsync();

            return new FormationDto
            {
                IdFormation = formation.IdFormation,
                Nom = formation.Nom,
                Description = formation.Description
            };
        }

        public async Task<bool> DeleteFormationAsync(int id)
        {
            var formation = await _context.Formations.FindAsync(id);

            if (formation == null)
                return false;

            _context.Formations.Remove(formation);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<int?> GetFormationIdByNameAsync(string name)
        {
            var formation = await _context.Formations
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.Nom == name);

            return formation?.IdFormation;
        }
    }
}