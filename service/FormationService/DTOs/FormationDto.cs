// DTOs/FormationDto.cs
using System.Collections.Generic;

namespace FormationService.DTOs
{
    public class FormationDto
    {
        public int IdFormation { get; set; }
        public string Nom { get; set; }
        public string Description { get; set; }
        public List<FiliereDto> Filieres { get; set; }
    }
    
    public class CreateFormationDto
    {
        public string Nom { get; set; }
        public string Description { get; set; }
    }
    
    public class UpdateFormationDto
    {
        public string Nom { get; set; }
        public string Description { get; set; }
    }
}