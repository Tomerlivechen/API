using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace HW_Lesson_6.ViewModels
{
    public class RegisterViewModel
    {
        [Required, EmailAddress]
        [Display(Name = "Insert Email Address")]
        public required string Email { get; set; }

        [Required, PasswordPropertyText]
        [Display(Name = "Insert Password")]
        public required string Password { get; set; }

        [Required, PasswordPropertyText]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "Confirmation does not match password")]
        public required string ConfirmPassword { get; set; }

    }
}
