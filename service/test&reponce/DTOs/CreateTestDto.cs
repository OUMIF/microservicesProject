using System.ComponentModel.DataAnnotations;

namespace test_reponce.DTOs
{
    public class CreateTestDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public int FormationId { get; set; } // ID envoyé par le client

        [Required]
        public DateTime EndDate { get; set; }

        public List<QuestionDto> Questions { get; set; } = new();
    }
}
