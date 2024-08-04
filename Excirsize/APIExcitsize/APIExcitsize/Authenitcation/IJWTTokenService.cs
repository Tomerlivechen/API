using APIExcitsize.Models;

namespace APIExcitsize.Authenitcation
{
    public interface IJWTTokenService
    {
        Task<string> CreateToken(AppUser User);


    }
}
