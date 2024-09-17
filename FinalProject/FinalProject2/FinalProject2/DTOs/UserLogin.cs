using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace FinalProject2.DTOs
{
    public class UserLogin()
    {
        [Required]
        [EmailAddress]
        public  string Email { get; set; } =string.Empty;

        [Required, PasswordPropertyText, DataType(DataType.Password)]
        public  string Password { get; set; } = string.Empty;

        public UserLogin(string email, string password) : this ()
        {
            
            Email = email;
            Password = password;
        }
    }
}
