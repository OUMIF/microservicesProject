// Models/Filiere.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FormationService.Models
{
    public class Filiere
    {
        [Key]
        public int IdFiliere { get; set; }
        
        [Required]
        public string Nom { get; set; }
        
        public string Description { get; set; }
        
        public string Promotion { get; set; }
        
        // Foreign key for Formation
        public int FormationId { get; set; }
        public virtual Formation Formation { get; set; }
        
        // This represents the professors related to this Filiere
        // Will need a join table or collection, depending on your implementation approach
        public virtual ICollection<ProfessorReference> Professors { get; set; }
        
        // This represents the students related to this Filiere
        public virtual ICollection<StudentReference> Students { get; set; }
    }
}