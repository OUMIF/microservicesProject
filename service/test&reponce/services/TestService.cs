using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test_reponce.Data;
using test_reponce.DTOs;
using test_reponce.Models;

namespace test_reponce.Services
{
    public class TestService : ITestService
    {
        private readonly AppDbContext _context;
        private readonly IFormationLookupService _formationLookup;
        private readonly ILogger<TestService> _logger;

        public TestService(
            AppDbContext context,
            IFormationLookupService formationLookup,
            ILogger<TestService> logger)
        {
            _context = context;
            _formationLookup = formationLookup;
            _logger = logger;
        }
        public async Task<bool> IsTestCreatedByUserAsync(int testId, string userId)
        {
            return await _context.Tests
                .AnyAsync(t => t.Id == testId && t.CreatedByUserId == userId);
        }

        public async Task<Test> CreateTestAsync(Test test, List<QuestionCreateDto> questions)
        {
            try
            {
                _logger.LogInformation("Starting test creation for formation: {FormationName}", test.FormationName);

                // Validate formation exists
                var formationId = await _formationLookup.GetFormationIdByNameAsync(test.FormationName);
                if (!formationId.HasValue)
                {
                    _logger.LogWarning("Formation not found: {FormationName}", test.FormationName);
                    throw new KeyNotFoundException($"Formation '{test.FormationName}' not found");
                }

                test.FormationId = formationId.Value;
                test.CreationDate = DateTime.UtcNow;

                _logger.LogInformation("Adding test to database");
                await _context.Tests.AddAsync(test);

                foreach (var q in questions)
                {
                    _logger.LogInformation("Processing question: {QuestionText}", q.Text);

                    if (q.Options == null || q.Options.Count < 3 || q.Options.Count > 5)
                    {
                        _logger.LogWarning("Invalid options count for question: {QuestionText}", q.Text);
                        throw new ArgumentException("Each question must have 3 to 5 options");
                    }

                    if (!q.Options.Any(o => o.IsCorrect))
                    {
                        _logger.LogWarning("No correct option for question: {QuestionText}", q.Text);
                        throw new ArgumentException("At least one option must be marked correct");
                    }

                    var question = new Question
                    {
                        Text = q.Text ?? string.Empty,
                        Test = test,
                        Options = q.Options.Select(o => new Option
                        {
                            Text = o.Text ?? string.Empty,
                            IsCorrect = o.IsCorrect
                        }).ToList()
                    };

                    await _context.Questions.AddAsync(question);
                }

                _logger.LogInformation("Saving changes to database");
                await _context.SaveChangesAsync();

                _logger.LogInformation("Test created successfully with ID: {TestId}", test.Id);
                return test;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating test");
                throw;
            }
        }

        public async Task<TestDetailsDto> GetTestWithQuestionsAsync(int testId)
        {
            return await GetTestWithQuestionsAsync(testId, null, true);
        }

        private TestDetailsDto MapToTestDetailsDto(Test test)
        {
            return new TestDetailsDto
            {
                Id = test.Id,
                Title = test.Title,
                FormationId = test.FormationId,
                FormationName = test.FormationName,
                CreationDate = test.CreationDate,
                EndDate = test.EndDate,
                Questions = test.Questions.Select(q => new QuestionDetailsDto
                {
                    Id = q.Id,
                    Text = q.Text,
                    Options = q.Options.Select(o => new OptionDetailsDto
                    {
                        Id = o.Id,
                        Text = o.Text,
                        IsCorrect = o.IsCorrect
                    }).ToList()
                }).ToList()
            };
        }

        public async Task<IEnumerable<TestSummaryDto>> GetTestsByUserIdAsync(string userId)
        {
            _logger.LogInformation("Fetching tests for user ID: {UserId}", userId);

            return await _context.Tests
                .Where(t => t.CreatedByUserId == userId)
                .OrderByDescending(t => t.CreationDate)
                .Select(t => new TestSummaryDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    FormationName = t.FormationName,
                    CreationDate = t.CreationDate,
                    EndDate = t.EndDate
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<TestSummaryDto>> GetAllTestsAsync()
        {
            _logger.LogInformation("Fetching all tests");

            return await _context.Tests
                .OrderByDescending(t => t.CreationDate)
                .Select(t => new TestSummaryDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    FormationName = t.FormationName,
                    CreationDate = t.CreationDate,
                    EndDate = t.EndDate
                })
                .ToListAsync();
        }

        public async Task<TestDetailsDto> UpdateTestAsync(int id, TestUpdateDto dto)
        {
            _logger.LogInformation("Updating test with ID: {TestId}", id);

            var test = await _context.Tests
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (test == null)
            {
                _logger.LogWarning("Test not found with ID: {TestId}", id);
                throw new KeyNotFoundException("Test not found");
            }

            // Update test properties
            test.Title = dto.Title;
            test.EndDate = dto.EndDate;

            // Update existing questions and options
            foreach (var questionDto in dto.Questions)
            {
                var question = test.Questions.FirstOrDefault(q => q.Id == questionDto.Id);
                if (question != null)
                {
                    question.Text = questionDto.Text;

                    // Update options
                    foreach (var optionDto in questionDto.Options)
                    {
                        var option = question.Options.FirstOrDefault(o => o.Id == optionDto.Id);
                        if (option != null)
                        {
                            option.Text = optionDto.Text;
                            option.IsCorrect = optionDto.IsCorrect;
                        }
                    }
                }
            }

            _logger.LogInformation("Saving test updates");
            await _context.SaveChangesAsync();

            return await GetTestWithQuestionsAsync(test.Id);
        }

        public async Task<Test> GetTestByIdAsync(int id)
        {
            _logger.LogInformation("Fetching test by ID: {TestId}", id);
            return await _context.Tests.FindAsync(id);
        }

        public async Task<TestDetailsDto> GetTestWithQuestionsAsync(int testId, string userId, bool isAdmin)
        {
            _logger.LogInformation("Fetching test with questions for ID: {TestId}", testId);

            var query = _context.Tests
                .Where(t => t.Id == testId);

            if (!isAdmin)
            {
                query = query.Where(t => t.CreatedByUserId == userId);
            }

            var test = await query
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync();

            if (test == null)
            {
                _logger.LogWarning("Test not found with ID: {TestId} for user {UserId}", testId, userId);
                return null;
            }

            return MapToTestDetailsDto(test);
        }
        public async Task<bool> DeleteTestAsync(int id)
        {
            _logger.LogInformation("Deleting test with ID: {TestId}", id);

            var test = await _context.Tests
                .Include(t => t.Questions)
                    .ThenInclude(q => q.Options)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (test == null)
            {
                _logger.LogWarning("Test not found with ID: {TestId}", id);
                return false;
            }

            try
            {
                // Remove all related options first
                var options = test.Questions.SelectMany(q => q.Options);
                _context.Options.RemoveRange(options);

                // Then remove questions
                _context.Questions.RemoveRange(test.Questions);

                // Finally remove the test
                _context.Tests.Remove(test);

                await _context.SaveChangesAsync();
                _logger.LogInformation("Test deleted successfully with ID: {TestId}", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting test with ID: {TestId}", id);
                throw;
            }
        }
    }
}