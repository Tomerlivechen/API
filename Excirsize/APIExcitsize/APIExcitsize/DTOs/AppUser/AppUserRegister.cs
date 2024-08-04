using APIExcitsize.Models;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace APIExcitsize.DTOs.AppUser
{
    public class AppUserRegister

    {

        [Required]
        public required string First_Name { get; set; }
        [Required]
        public required string Last_Name { get; set; }


        [Required, EmailAddress, MaxLength(256)]
        public required string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{7,20}$", ErrorMessage = "Passward must be between 7 and 20 characters, must includ one lower case, one uppercase, one digit and one symbol !@#$%^&*- ")]
        public required string Password { get; set; }


    }
}
