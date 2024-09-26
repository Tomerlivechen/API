using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject32.Mapping
{
    public static class UserExtensionMethodcs
    {
        public static AppUser RegisterToUser(this AppUserRegister register)
        {
            var user = new AppUser()
            {
                Email = register.Email,
                UserName = register.UserName,
                Prefix = register.Prefix,
                First_Name = register.First_Name,
                Last_Name = register.Last_Name,
                Pronouns = register.Pronouns,
                ImageURL = register.ImageURL,
                PermissionLevel = register.PermissionLevel,
            };
            return user;

        }

        public static AppUserDisplay UsertoDisplay(this AppUser user)
        {
            var display = new AppUserDisplay()
            {
                Email = user.Email?? string.Empty,
                UserName = user.UserName ?? string.Empty,
                Prefix = user.Prefix,
                First_Name = user.First_Name,
                Last_Name = user.Last_Name,
                ImageURL= user.ImageURL,
            };
            return display;
        }
    }

    
}
