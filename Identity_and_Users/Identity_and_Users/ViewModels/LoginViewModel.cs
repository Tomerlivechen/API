using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Identity_and_Users.ViewModels
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
