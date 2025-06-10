using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet("public")]
        public IActionResult PublicEndpoint()
        {
            return Ok(new { Message = "This is a public endpoint - no authentication required" });
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult AuthenticatedEndpoint()
        {
            // Access user information
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var email = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue("email");
            var username = User.FindFirstValue(ClaimTypes.Name);

            var roles = User.Claims
                .Where(c => c.Type == ClaimTypes.Role || c.Type == "role")
                .Select(c => c.Value)
                .Distinct();

            return Ok(new
            {
                Message = "Authentication successful - you have a valid token",
                UserId = userId,
                Email = email,
                Username = username,
                Roles = roles
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult AdminEndpoint()
        {
            return Ok(new { Message = "Admin authorization successful - you have Admin privileges" });
        }

        [Authorize(Roles = "Professeur")]
        [HttpGet("professeur")]
        public IActionResult ProfesseurEndpoint()
        {
            return Ok(new { Message = "Professeur authorization successful - you have Professeur privileges" });
        }

        [Authorize(Roles = "Etudiant")]
        [HttpGet("etudiant")]
        public IActionResult EtudiantEndpoint()
        {
            return Ok(new { Message = "Etudiant authorization successful - you have Etudiant privileges" });
        }
    }
}
