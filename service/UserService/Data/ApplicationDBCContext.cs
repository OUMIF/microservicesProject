using Microsoft.EntityFrameworkCore;
using UserService.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace UserService.Data
{
    public class ApplicationDBCContext: IdentityDbContext<AppUser>
    {
        public DbSet<AppUser> AppUser { get; set; }
        public ApplicationDBCContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "1",  // Static, hardcoded values
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "2",  // Static, hardcoded values
                    Name = "Professeur",
                    NormalizedName = "PROFESSEUR"
                },
                new IdentityRole
                {
                    Id = "3",  // Static, hardcoded values
                    Name = "Etudiant",
                    NormalizedName = "ETUDIANT"
                }
            );
        }
    }
}
