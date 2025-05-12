// Data/FormationDbContext.cs
using FormationService.Models;
using Microsoft.EntityFrameworkCore;

namespace FormationService.Data
{
    public class FormationDbContext : DbContext
    {
        public FormationDbContext(DbContextOptions<FormationDbContext> options) : base(options) { }
        
        public DbSet<Formation> Formations { get; set; }
        public DbSet<Filiere> Filieres { get; set; }
        public DbSet<ProfessorReference> ProfessorReferences { get; set; }
        public DbSet<StudentReference> StudentReferences { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Configure relationships
            modelBuilder.Entity<Filiere>()
                .HasOne(f => f.Formation)
                .WithMany(form => form.Filieres)
                .HasForeignKey(f => f.FormationId)
                .OnDelete(DeleteBehavior.Cascade);
                
            modelBuilder.Entity<ProfessorReference>()
                .HasOne(p => p.Filiere)
                .WithMany(f => f.Professors)
                .HasForeignKey(p => p.FiliereId)
                .OnDelete(DeleteBehavior.Cascade);
                
            modelBuilder.Entity<StudentReference>()
                .HasOne(s => s.Filiere)
                .WithMany(f => f.Students)
                .HasForeignKey(s => s.FiliereId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}