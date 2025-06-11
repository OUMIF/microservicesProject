using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace test_reponce.Models
{
    public class StudentTestResponse
    {
        public int Id { get; set; }

        [Required]
        public string StudentId { get; set; }

        [Required]
        public int TestId { get; set; }

        public DateTime SubmissionDate { get; set; }

        public int Score { get; set; }

        public int TotalQuestions { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? StartTime { get; set; }

        // Navigation properties
        public Test Test { get; set; }

        public List<StudentAnswer> Answers { get; set; } = new();
    }
}