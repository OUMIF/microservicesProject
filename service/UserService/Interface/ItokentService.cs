using UserService.Models;

namespace UserService.Interface
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}