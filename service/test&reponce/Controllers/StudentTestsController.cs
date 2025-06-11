using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using test_reponce.DTOs;
using test_reponce.Models;
using test_reponce.Services;

namespace test_reponce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentTestsController : ControllerBase
    {
        private readonly IStudentTestService _studentTestService;

        public StudentTestsController(IStudentTestService studentTestService)
        {
            _studentTestService = studentTestService;
        }

        // Helper method to extract student ID from claims
        private string GetStudentId()
        {
            // Try using 'sub' claim which is standard for user identifier
            var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                                 ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(studentIdClaim))
            {
                throw new UnauthorizedAccessException("Student ID not found in token");
            }
            return studentIdClaim;
        }

        // GET: api/studenttests/available
        [HttpGet("available")]
        public async Task<ActionResult<List<StudentTestDto>>> GetAvailableTests()
        {
            try
            {
                var studentId = GetStudentId();
                var tests = await _studentTestService.GetAvailableTestsForStudentAsync(studentId);
                return Ok(tests);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/studenttests/test/{testId}
        [HttpGet("test/{testId}")]
        public async Task<ActionResult<TestForStudentDto>> GetTestForStudent(int testId)
        {
            try
            {
                var studentId = GetStudentId();
                var test = await _studentTestService.GetTestForStudentAsync(testId, studentId);
                return Ok(test);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/studenttests/test/{testId}/start
        [HttpPost("test/{testId}/start")]
        public async Task<ActionResult<StudentTestResponse>> StartTest(int testId)
        {
            try
            {
                var studentId = GetStudentId();
                var response = await _studentTestService.StartTestAsync(testId, studentId);
                return CreatedAtAction(nameof(GetTestForStudent), new { testId }, response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/studenttests/test/{testId}/submit
        [HttpPost("test/{testId}/submit")]
        public async Task<ActionResult<TestResultDto>> SubmitTest(
            int testId,
            [FromBody] SubmitTestDto submitTestDto)
        {
            if (testId != submitTestDto.TestId)
                return BadRequest("Test ID mismatch");

            try
            {
                var studentId = GetStudentId();
                var result = await _studentTestService.SubmitTestAsync(submitTestDto, studentId);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/studenttests/history
        [HttpGet("history")]
        public async Task<ActionResult<List<TestResultDto>>> GetTestHistory()
        {
            try
            {
                var studentId = GetStudentId();
                var history = await _studentTestService.GetStudentTestHistoryAsync(studentId);
                return Ok(history);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/studenttests/test/{testId}/result
        [HttpGet("test/{testId}/result")]
        public async Task<ActionResult<TestResultDto>> GetTestResult(int testId)
        {
            try
            {
                var studentId = GetStudentId();
                var result = await _studentTestService.GetTestResultAsync(testId, studentId);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}