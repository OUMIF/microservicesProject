using System.ComponentModel.DataAnnotations;

namespace test_reponce.Models
{
    public class StudentAnswer
    {
        public int Id { get; set; }

        [Required]
        public int StudentTestResponseId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        [Required]
        public string SelectedAnswer { get; set; }

        public bool IsCorrect { get; set; }

        // Navigation properties
        public StudentTestResponse StudentTestResponse { get; set; }
        public Question Question { get; set; }
    }
}