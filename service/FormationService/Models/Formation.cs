// Models/Formation.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FormationService.Models
{
    public class Formation
    {
        [Key]
        public int IdFormation { get; set; }
        
        [Required]
        public string Nom { get; set; }
        
        public string Description { get; set; }
        
        // Navigation properties
        public virtual ICollection<Filiere> Filieres { get; set; }
    }
}