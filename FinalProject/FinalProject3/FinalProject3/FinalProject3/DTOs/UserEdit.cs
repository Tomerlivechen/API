
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace FinalProject3.DTOs
{
    public class UserEdit
    {

        [Required, EmailAddress]
        public required string UserName { get; set; }
        [Required, PasswordPropertyText]
        public required string OldPassword { get; set; }
        [Required, PasswordPropertyText]
        public required string NewPassword { get; set; }
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
