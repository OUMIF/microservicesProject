using Microsoft.EntityFrameworkCore;
using test_reponce.Models;

namespace test_reponce.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Test> Tests { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<StudentTestResponse> StudentTestResponses { get; set; }
        public DbSet<StudentAnswer> StudentAnswers { get; set; } // ✅ Added this line

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentTestResponse>(entity =>
            {
                entity.HasKey(r => new { r.StudentId, r.TestId });
                entity.HasOne(r => r.Test)
                      .WithMany()
                      .HasForeignKey(r => r.TestId);
            });

            // Test-Question relationship (1 to many)
            modelBuilder.Entity<Test>()
                .HasMany(t => t.Questions)
                .WithOne(q => q.Test)
                .HasForeignKey(q => q.TestId)
                .OnDelete(DeleteBehavior.Cascade);

            // Question-Option relationship (1 to many)
            modelBuilder.Entity<Question>()
                .HasMany(q => q.Options)
                .WithOne(o => o.Question)
                .HasForeignKey(o => o.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // With this:
            modelBuilder.Entity<StudentTestResponse>(entity =>
            {
                entity.HasKey(r => r.Id); // Use Id as primary key

                // Add unique constraint to prevent duplicate responses
                entity.HasIndex(r => new { r.StudentId, r.TestId })
                      .IsUnique();

                entity.HasOne(r => r.Test)
                      .WithMany()
                      .HasForeignKey(r => r.TestId);
            });

            // StudentTestResponse-StudentAnswer relationship
            modelBuilder.Entity<StudentAnswer>()
                .HasOne(sa => sa.StudentTestResponse)
                .WithMany(r => r.Answers)
                .HasForeignKey(sa => sa.StudentTestResponseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Indexes for better performance
            modelBuilder.Entity<Test>()
                .HasIndex(t => t.FormationId);

            modelBuilder.Entity<Question>()
                .HasIndex(q => q.TestId);
        }
    }
}
