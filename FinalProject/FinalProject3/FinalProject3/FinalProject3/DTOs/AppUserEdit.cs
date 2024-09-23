
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace FinalProject3.DTOs
{
    public class AppUserEdit
    {


        public required string UserName { get; set; }
        [Required, PasswordPropertyText]
        public required string OldPassword { get; set; }
        [Required, PasswordPropertyText]
        public required string NewPassword { get; set; }

        public required string Prefix { get; set; }

        public required string First_Name { get; set; }

        public required string Last_Name { get; set; }

        public required string Pronouns { get; set; }

        public required string ImageURL { get; set; }

        public required string PremissionLevel { get; set; }
    }
}
