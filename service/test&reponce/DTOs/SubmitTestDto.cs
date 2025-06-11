using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace test_reponce.DTOs
{
    public class SubmitTestDto
    {
        [Required]
        public int TestId { get; set; }

        [Required]
        public List<StudentAnswerDto> Answers { get; set; } = new();
    }

    public class StudentAnswerDto
    {
        [Required]
        public int QuestionId { get; set; }

        [Required]
        public string SelectedAnswer { get; set; }
    }
}