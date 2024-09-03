using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;


namespace Identity_and_Users.Models
{
    public class AppUser : IdentityUser
    {
        [Required,MinLength(2),MaxLength(55)]
        public required string Property { get; set; }
    }
}
