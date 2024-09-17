﻿using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject32.Mapping
{
    public static class UserExtensionMethodcs
    {
        public static User RegisterToUser(this UserRegister register)
        {
            var user = new User()
            {
                Email = register.Email,
                UserName = register.UserName,
                Prefix = register.Prefix,
                First_Name = register.First_Name,
                Last_Name = register.Last_Name,
                Pronouns = register.Pronouns,
                ImageURL = register.ImageURL,
                PremissionLevel = register.PremissionLevel,
            };
            return user;

        }
    }
}
