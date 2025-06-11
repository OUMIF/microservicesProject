// Models/StudentReference.cs - Reference to students from UserService
using System.ComponentModel.DataAnnotations;

namespace FormationService.Models
{
    public class StudentReference
    {
        [Key]
        public int Id { get; set; }
        
        // This is the ID referencing the student in UserService
        public int StudentId { get; set; }
        
        // Foreign key for Filiere
        public int FiliereId { get; set; }
        public virtual Filiere Filiere { get; set; }
    }
}