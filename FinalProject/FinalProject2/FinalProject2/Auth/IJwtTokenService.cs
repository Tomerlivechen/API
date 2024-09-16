using FinalProject2.Models;

namespace FinalProject2.Auth
{
    public interface IJwtTokenService
    {
        Task<string> CreateToken(User user);
    }
}
