using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace HW_Lesson_6.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required, PasswordPropertyText, DataType(DataType.Password)]
        [Display(Name = "Insert Password")]
        public required string Password { get; set; }
    }
}
