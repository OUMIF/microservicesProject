using System;
using System.Collections.Generic;

namespace test_reponce.DTOs
{
    public class StudentTestDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FormationName { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsExpired => DateTime.UtcNow > EndDate;
        public bool HasTaken { get; set; }
        public int? Score { get; set; }
        public DateTime? SubmissionDate { get; set; }
    }
}