using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Identity_and_Users.ViewModels
{
    public class ManageViewModel
    {

        public string? Username { get; set; } = null;

        [PasswordPropertyText]
        [Display(Name = "Insert old Password")]
        public string? Password { get; set; } = null;


        [PasswordPropertyText]
        [Display(Name = "Insert new Password")]
        public string? NewPassword { get; set; } = null;


        [Display(Name = "Insert Property")]
        public string? Property { get; set; } = null;
    }
}
