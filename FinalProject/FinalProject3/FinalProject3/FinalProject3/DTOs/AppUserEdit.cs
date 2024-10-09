
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
        public required string Bio { get; set; }

        public required string Prefix { get; set; }
        public bool HideEmail { get; set; } = false;
        public bool HideName { get; set; } = false;
        public bool HideBlocked { get; set; } = false;
        public string BanerImageURL { get; set; } = string.Empty;
        public required string First_Name { get; set; }

        public required string Last_Name { get; set; }

        public required string Pronouns { get; set; }

        public required string ImageURL { get; set; }

        public required string PermissionLevel { get; set; }
    }
}
