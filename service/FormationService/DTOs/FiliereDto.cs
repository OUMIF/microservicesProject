// DTOs/FiliereDto.cs
using System.Collections.Generic;

namespace FormationService.DTOs
{
    public class FiliereDto
    {
        public int IdFiliere { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public string Promotion { get; set; }
        public int FormationId { get; set; }
        public List<int> ProfessorIds { get; set; }
        public List<int> StudentIds { get; set; }
    }
    
    public class CreateFiliereDto
    {
        public string Nom { get; set; }
        public string Description { get; set; }
        public string Promotion { get; set; }
        public int FormationId { get; set; }
    }
    
    public class UpdateFiliereDto
    {
        public string Nom { get; set; }
        public string Description { get; set; }
        public string Promotion { get; set; }
        public int FormationId { get; set; }
    }
}