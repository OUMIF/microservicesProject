// Models/ProfessorReference.cs - Reference to professors from UserService
using System.ComponentModel.DataAnnotations;

namespace FormationService.Models
{
    public class ProfessorReference
    {
        [Key]
        public int Id { get; set; }
        
        // This is the ID referencing the professor in UserService
        public int ProfessorId { get; set; }
        
        // Foreign key for Filiere
        public int FiliereId { get; set; }
        public virtual Filiere Filiere { get; set; }
    }
}