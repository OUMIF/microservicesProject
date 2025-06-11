using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using test_reponce.Data;
using test_reponce.DTOs;
using test_reponce.Models;

namespace test_reponce.Services
{
    public class StudentTestService : IStudentTestService
    {
        private readonly AppDbContext _context;
        private readonly IStudentFormationLookupService _studentFormationLookup;
        private readonly ILogger<StudentTestService> _logger;

        public StudentTestService(
            AppDbContext context,
            IStudentFormationLookupService studentFormationLookup,
            ILogger<StudentTestService> logger)
        {
            _context = context;
            _studentFormationLookup = studentFormationLookup;
            _logger = logger;
        }

        public async Task<List<StudentTestDto>> GetAvailableTestsForStudentAsync(string studentId)
        {
            try
            {
                var studentInfo = await _studentFormationLookup.GetStudentFormationInfoAsync(studentId);

                if (!string.IsNullOrEmpty(studentInfo.Error))
                {
                    _logger.LogWarning("Could not find formation info for student {StudentId}: {Error}",
                        studentId, studentInfo.Error);
                    return new List<StudentTestDto>();
                }

                var tests = await _context.Tests
                    .Where(t => t.FormationName == studentInfo.FormationName)
                    .ToListAsync();

                var studentResponses = await _context.StudentTestResponses
                    .Where(str => str.StudentId == studentId)
                    .ToListAsync();

                return tests.Select(test =>
                {
                    var response = studentResponses.FirstOrDefault(r => r.TestId == test.Id);
                    return new StudentTestDto
                    {
                        Id = test.Id,
                        Title = test.Title,
                        FormationName = test.FormationName,
                        EndDate = test.EndDate,
                        CreationDate = test.CreationDate,
                        HasTaken = response?.IsCompleted ?? false,
                        Score = response?.Score,
                        SubmissionDate = response?.SubmissionDate
                    };
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting available tests for student {StudentId}", studentId);
                throw;
            }
        }

        public async Task<TestForStudentDto> GetTestForStudentAsync(int testId, string studentId)
        {
            try
            {
                var test = await _context.Tests
                    .Include(t => t.Questions)
                    .ThenInclude(q => q.Options)
                    .FirstOrDefaultAsync(t => t.Id == testId);

                if (test == null)
                    throw new KeyNotFoundException($"Test with ID {testId} not found");

                var studentInfo = await _studentFormationLookup.GetStudentFormationInfoAsync(studentId);
                if (!string.IsNullOrEmpty(studentInfo.Error) || studentInfo.FormationName != test.FormationName)
                    throw new UnauthorizedAccessException("Student is not authorized to take this test");

                if (test.EndDate <= DateTime.UtcNow)
                    throw new InvalidOperationException("Test has expired");

                var existingResponse = await _context.StudentTestResponses
                    .FirstOrDefaultAsync(str => str.StudentId == studentId && str.TestId == testId && str.IsCompleted);

                if (existingResponse != null)
                    throw new InvalidOperationException("Test has already been completed");

                var studentResponse = await GetOrCreateStudentTestResponse(testId, studentId);
                var timeRemaining = (int)(test.EndDate - DateTime.UtcNow).TotalMinutes;

                return new TestForStudentDto
                {
                    Id = test.Id,
                    Title = test.Title,
                    FormationName = test.FormationName,
                    EndDate = test.EndDate,
                    TimeRemainingMinutes = Math.Max(0, timeRemaining),
                    Questions = test.Questions.Select(q => new QuestionForStudentDto
                    {
                        Id = q.Id,
                        QuestionText = q.Text,
                        Options = q.Options.Select(o => o.Text).ToList(),
                        SelectedAnswer = _context.StudentAnswers
                            .FirstOrDefault(a => a.StudentTestResponseId == studentResponse.Id &&
                                                 a.QuestionId == q.Id)?.SelectedAnswer
                    }).ToList()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting test {TestId} for student {StudentId}", testId, studentId);
                throw;
            }
        }

        public async Task<StudentTestResponse> StartTestAsync(int testId, string studentId)
        {
            try
            {
                var existingResponse = await _context.StudentTestResponses
                    .FirstOrDefaultAsync(str => str.StudentId == studentId && str.TestId == testId);

                if (existingResponse != null && !existingResponse.IsCompleted)
                    return existingResponse;

                if (existingResponse != null && existingResponse.IsCompleted)
                    throw new InvalidOperationException("Test has already been completed");

                var test = await _context.Tests.FirstOrDefaultAsync(t => t.Id == testId);
                if (test == null)
                    throw new KeyNotFoundException($"Test with ID {testId} not found");

                var studentInfo = await _studentFormationLookup.GetStudentFormationInfoAsync(studentId);
                if (!string.IsNullOrEmpty(studentInfo.Error) || studentInfo.FormationName != test.FormationName)
                    throw new UnauthorizedAccessException("Student is not authorized to take this test");

                var studentResponse = new StudentTestResponse
                {
                    StudentId = studentId,
                    TestId = testId,
                    StartTime = DateTime.UtcNow,
                    IsCompleted = false,
                    Score = 0,
                    TotalQuestions = await _context.Questions.CountAsync(q => q.TestId == testId)
                };

                _context.StudentTestResponses.Add(studentResponse);
                await _context.SaveChangesAsync();

                return studentResponse;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error starting test {TestId} for student {StudentId}", testId, studentId);
                throw;
            }
        }

        public async Task<TestResultDto> SubmitTestAsync(SubmitTestDto submitTestDto, string studentId)
        {
            try
            {
                var studentResponse = await _context.StudentTestResponses
                    .Include(str => str.Test)
                    .ThenInclude(t => t.Questions)
                    .ThenInclude(q => q.Options)
                    .FirstOrDefaultAsync(str => str.StudentId == studentId && str.TestId == submitTestDto.TestId);

                if (studentResponse == null)
                    throw new KeyNotFoundException("Test session not found");

                if (studentResponse.IsCompleted)
                    throw new InvalidOperationException("Test has already been submitted");

                if (studentResponse.Test.EndDate <= DateTime.UtcNow)
                    throw new InvalidOperationException("Test has expired");

                int correctAnswers = 0;
                var answerResults = new List<AnswerResultDto>();

                foreach (var answer in submitTestDto.Answers)
                {
                    var question = studentResponse.Test.Questions.FirstOrDefault(q => q.Id == answer.QuestionId);
                    if (question != null)
                    {
                        var correctOption = question.Options.FirstOrDefault(o => o.IsCorrect);
                        bool isCorrect = correctOption != null &&
                                       correctOption.Text.Equals(answer.SelectedAnswer, StringComparison.OrdinalIgnoreCase);

                        if (isCorrect) correctAnswers++;

                        var studentAnswer = new StudentAnswer
                        {
                            StudentTestResponseId = studentResponse.Id,
                            QuestionId = answer.QuestionId,
                            SelectedAnswer = answer.SelectedAnswer,
                            IsCorrect = isCorrect
                        };

                        _context.StudentAnswers.Add(studentAnswer);

                        answerResults.Add(new AnswerResultDto
                        {
                            QuestionId = question.Id,
                            QuestionText = question.Text,
                            SelectedAnswer = answer.SelectedAnswer,
                            CorrectAnswer = correctOption?.Text ?? "N/A",
                            IsCorrect = isCorrect
                        });
                    }
                }

                studentResponse.IsCompleted = true;
                studentResponse.SubmissionDate = DateTime.UtcNow;
                studentResponse.Score = correctAnswers;

                await _context.SaveChangesAsync();

                return new TestResultDto
                {
                    TestId = studentResponse.TestId,
                    TestTitle = studentResponse.Test.Title,
                    Score = correctAnswers,
                    TotalQuestions = studentResponse.TotalQuestions,
                    Percentage = Math.Round((double)correctAnswers / studentResponse.TotalQuestions * 100, 2),
                    SubmissionDate = studentResponse.SubmissionDate,
                    AnswerResults = answerResults
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error submitting test {TestId} for student {StudentId}", submitTestDto.TestId, studentId);
                throw;
            }
        }

        public async Task<List<TestResultDto>> GetStudentTestHistoryAsync(string studentId)
        {
            try
            {
                var responses = await _context.StudentTestResponses
                    .Include(str => str.Test)
                    .Include(str => str.Answers)
                    .ThenInclude(a => a.Question)
                    .ThenInclude(q => q.Options)
                    .Where(str => str.StudentId == studentId && str.IsCompleted)
                    .OrderByDescending(str => str.SubmissionDate)
                    .ToListAsync();

                return responses.Select(response => new TestResultDto
                {
                    TestId = response.TestId,
                    TestTitle = response.Test.Title,
                    Score = response.Score,
                    TotalQuestions = response.TotalQuestions,
                    Percentage = Math.Round((double)response.Score / response.TotalQuestions * 100, 2),
                    SubmissionDate = response.SubmissionDate,
                    AnswerResults = response.Answers.Select(a => new AnswerResultDto
                    {
                        QuestionId = a.QuestionId,
                        QuestionText = a.Question.Text,
                        SelectedAnswer = a.SelectedAnswer,
                        CorrectAnswer = a.Question.Options.FirstOrDefault(o => o.IsCorrect)?.Text ?? "N/A",
                        IsCorrect = a.IsCorrect
                    }).ToList()
                }).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting test history for student {StudentId}", studentId);
                throw;
            }
        }

        public async Task<TestResultDto> GetTestResultAsync(int testId, string studentId)
        {
            try
            {
                var response = await _context.StudentTestResponses
                    .Include(str => str.Test)
                    .Include(str => str.Answers)
                    .ThenInclude(a => a.Question)
                    .ThenInclude(q => q.Options)
                    .FirstOrDefaultAsync(str => str.StudentId == studentId && str.TestId == testId && str.IsCompleted);

                if (response == null)
                    throw new KeyNotFoundException("Test result not found");

                return new TestResultDto
                {
                    TestId = response.TestId,
                    TestTitle = response.Test.Title,
                    Score = response.Score,
                    TotalQuestions = response.TotalQuestions,
                    Percentage = Math.Round((double)response.Score / response.TotalQuestions * 100, 2),
                    SubmissionDate = response.SubmissionDate,
                    AnswerResults = response.Answers.Select(a => new AnswerResultDto
                    {
                        QuestionId = a.QuestionId,
                        QuestionText = a.Question.Text,
                        SelectedAnswer = a.SelectedAnswer,
                        CorrectAnswer = a.Question.Options.FirstOrDefault(o => o.IsCorrect)?.Text ?? "N/A",
                        IsCorrect = a.IsCorrect
                    }).ToList()
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting test result {TestId} for student {StudentId}", testId, studentId);
                throw;
            }
        }

        private async Task<StudentTestResponse> GetOrCreateStudentTestResponse(int testId, string studentId)
        {
            var existingResponse = await _context.StudentTestResponses
                .FirstOrDefaultAsync(str => str.StudentId == studentId && str.TestId == testId);

            if (existingResponse != null)
                return existingResponse;

            var totalQuestions = await _context.Questions.CountAsync(q => q.TestId == testId);

            var newResponse = new StudentTestResponse
            {
                StudentId = studentId,
                TestId = testId,
                StartTime = DateTime.UtcNow,
                IsCompleted = false,
                Score = 0,
                TotalQuestions = totalQuestions
            };

            _context.StudentTestResponses.Add(newResponse);
            await _context.SaveChangesAsync();

            return newResponse;
        }
    }
}