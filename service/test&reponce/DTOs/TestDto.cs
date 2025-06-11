using System;
using System.Collections.Generic;

namespace test_reponce.DTOs
{
    public class TestCreateDto
    {
        public required string Title { get; set; }
        public required string FormationName { get; set; }
        public required DateTime EndDate { get; set; }
        public required List<QuestionCreateDto> Questions { get; set; }
    }

    public class QuestionCreateDto
    {
        public required string Text { get; set; }
        public required List<OptionCreateDto> Options { get; set; }
    }

    public class OptionCreateDto
    {
        public required string Text { get; set; }
        public required bool IsCorrect { get; set; }
    }

    public class TestDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int FormationId { get; set; }
        public string FormationName { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<QuestionDetailsDto> Questions { get; set; }
    }

    public class QuestionDetailsDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<OptionDetailsDto> Options { get; set; }
    }

    public class OptionDetailsDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}