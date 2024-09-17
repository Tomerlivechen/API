using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Identity_and_Users.ViewModels
{
    public class RegisterViewModel
    {
        [Required , EmailAddress]
        [Display (Name ="Insert Email Address")]
        public required string Email { get; set; }

        [Required, PasswordPropertyText]
        [Display(Name = "Insert Password")]
        public required string Password { get; set; }

        [Required, PasswordPropertyText]
        [Display(Name = "Confirm Password")]
        [Compare("Password" , ErrorMessage ="Confirmation does not match password")]
        public required string ConfirmPassword { get; set; }
        

        [Required]
        [Display(Name = "Insert Property")]
        public required string Property { get; set; }
    }
}
