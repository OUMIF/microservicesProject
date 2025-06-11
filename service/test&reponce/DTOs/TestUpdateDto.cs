namespace test_reponce.DTOs
{
    public class TestUpdateDto
    {
        public string Title { get; set; }
        public DateTime EndDate { get; set; }
        public List<QuestionUpdateDto> Questions { get; set; }
    }

    public class QuestionUpdateDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<OptionUpdateDto> Options { get; set; }
    }

    public class OptionUpdateDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }

    public class TestSummaryDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string FormationName { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}