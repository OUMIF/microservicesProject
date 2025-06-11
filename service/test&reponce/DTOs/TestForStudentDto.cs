using System;
using System.Collections.Generic;

namespace test_reponce.DTOs
{
    public class TestForStudentDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FormationName { get; set; }
        public DateTime EndDate { get; set; }
        public List<QuestionForStudentDto> Questions { get; set; } = new();
        public int TimeRemainingMinutes { get; set; }
    }

    public class QuestionForStudentDto
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public List<string> Options { get; set; } = new();
        public string SelectedAnswer { get; set; } // For pre-filled answers if resuming
    }
}