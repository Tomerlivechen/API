using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace FinalProject1.DTOs
{
    public class UserLogin
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required, PasswordPropertyText, DataType(DataType.Password)]
        public required string Password { get; set; }
    }
}
