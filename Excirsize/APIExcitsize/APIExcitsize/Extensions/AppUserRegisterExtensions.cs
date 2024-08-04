using APIExcitsize.DTOs.AppUser;
using APIExcitsize.Models;

namespace APIExcitsize.Extensions
{
    public static class AppUserRegisterExtensions
    {

        public static AppUser toModel(this AppUserRegister appUserRegister)
        {
            return new AppUser
            {

                //logging in uses Email
                UserName = appUserRegister.Email,
                Email = appUserRegister.Email,
                //passwor will be added by framwork
                First_Name = appUserRegister.First_Name,
                Last_Name = appUserRegister.Last_Name,


            };
        }
    }
            
}
