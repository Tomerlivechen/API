using FinalProject1.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace FinalProject1.DTOs
{
    public class UserRegister
    {


        [Required, EmailAddress]
        public required string Email { get; set; }

        [Required, PasswordPropertyText]
        public required string Password { get; set; }

        [Required, PasswordPropertyText]
        [Compare("Password", ErrorMessage = "Confirmation does not match password")]
        public required string ConfirmPassword { get; set; }
        public string Prefix { get; set; } = string.Empty;
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;
        public string Pronouns { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        public string ImageAlt { get; set; } = string.Empty;
        [Required]
        public required Role Role { get; set; }
    }
}
