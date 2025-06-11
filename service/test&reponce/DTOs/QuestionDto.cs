using System.ComponentModel.DataAnnotations;

namespace test_reponce.DTOs
{
    public class QuestionDto
    {
        [Required]
        public string Text { get; set; }
    }
}
