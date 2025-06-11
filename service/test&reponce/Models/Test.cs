using System;
using System.Collections.Generic;

namespace test_reponce.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int FormationId { get; set; }
        public string FormationName { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CreatedByUserId { get; set; }
        public List<Question> Questions { get; set; } = new();
    }
}