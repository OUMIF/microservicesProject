using System.ComponentModel.DataAnnotations;

namespace UserService.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Phone]
        public string? PhoneNumber { get; set; }

    }
}
