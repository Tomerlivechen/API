﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using APIClassLibraryDAL.Models;

namespace FinalProject2.DTOs
{
    public class UserRegister
    {
        [Required, EmailAddress]
        public required string Email { get; set; }

        [Required, EmailAddress]
        public required string UserName { get; set; }

        [Required, PasswordPropertyText]
        public required string Password { get; set; }

        [Required, PasswordPropertyText]
        [Compare("Password", ErrorMessage = "Confirmation does not match password")]
        public required string ConfirmPassword { get; set; }
        [Required]
        public required string Prefix { get; set; } 
        [Required]
        public required string First_Name { get; set; } 
        [Required]
        public required string Last_Name { get; set; } 
        [Required]
        public required string Pronouns { get; set; } 
        [Required]
        public required string ImageURL { get; set; }
        [Required]
        public required string PremissionLevel { get; set; }
    }
}
