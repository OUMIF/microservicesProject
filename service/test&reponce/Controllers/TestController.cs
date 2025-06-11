using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using test_reponce.DTOs;
using test_reponce.Models;
using test_reponce.Services;

namespace test_reponce.Controllers
{
    [ApiController]
    [Route("api/tests")]
    [Authorize]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Professeur")]
        public async Task<IActionResult> CreateTest([FromBody] TestCreateDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                var test = new Test
                {
                    Title = dto.Title,
                    FormationName = dto.FormationName,
                    EndDate = dto.EndDate,
                    CreatedByUserId = userId
                };

                var createdTest = await _testService.CreateTestAsync(test, dto.Questions);
                var testDetails = await _testService.GetTestWithQuestionsAsync(createdTest.Id);

                return CreatedAtAction(nameof(GetTest), new { id = createdTest.Id }, testDetails);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTest(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                var isAdmin = User.IsInRole("Admin");
                var testDetails = await _testService.GetTestWithQuestionsAsync(id, userId, isAdmin);

                if (testDetails == null)
                {
                    return NotFound();
                }

                return Ok(testDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("my-tests")]
        public async Task<IActionResult> GetUserTests()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                var tests = await _testService.GetTestsByUserIdAsync(userId);
                return Ok(tests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllTests()
        {
            try
            {
                var tests = await _testService.GetAllTestsAsync();
                return Ok(tests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Professeur")]
        public async Task<IActionResult> UpdateTest(int id, [FromBody] TestUpdateDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                var existingTest = await _testService.GetTestByIdAsync(id);
                if (existingTest == null)
                {
                    return NotFound();
                }

                if (existingTest.CreatedByUserId != userId && !User.IsInRole("Admin"))
                {
                    return Forbid();
                }

                var updatedTest = await _testService.UpdateTestAsync(id, dto);
                return Ok(updatedTest);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Professeur")]
        public async Task<IActionResult> DeleteTest(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token");
                }

                // Check if test exists and belongs to user (or user is admin)
                var existingTest = await _testService.GetTestByIdAsync(id);
                if (existingTest == null)
                {
                    return NotFound();
                }

                if (existingTest.CreatedByUserId != userId && !User.IsInRole("Admin"))
                {
                    return Forbid();
                }

                var result = await _testService.DeleteTestAsync(id);
                return result ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}