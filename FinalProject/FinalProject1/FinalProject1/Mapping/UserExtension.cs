using FinalProject1.DTOs;
using FinalProject1.Models;

namespace FinalProject1.Mapping
{
    public static class UserExtension
    {
        public static User RegisterUser(this UserRegister userRegister)
        {
            return new User()
            {
                Email = userRegister.Email,
                Prefix = userRegister.Prefix,
                First_Name = userRegister.First_Name,
                Last_Name = userRegister.Last_Name,
                Pronouns = userRegister.Pronouns,
                ImageURL = userRegister.ImageURL,
                Role = userRegister.Role,
                ImageAlt = $"Image of {userRegister.First_Name} {userRegister.Last_Name}",
            };
        }
    }
}
