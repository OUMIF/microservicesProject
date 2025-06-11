using System;
using System.Collections.Generic;

namespace test_reponce.DTOs
{
    public class TestResultDto
    {
        public int TestId { get; set; }
        public string TestTitle { get; set; }
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public double Percentage { get; set; }
        public DateTime SubmissionDate { get; set; }
        public List<AnswerResultDto> AnswerResults { get; set; } = new();
    }

    public class AnswerResultDto
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string SelectedAnswer { get; set; }
        public string CorrectAnswer { get; set; }
        public bool IsCorrect { get; set; }
    }
}