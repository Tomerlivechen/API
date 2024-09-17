using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FinalProject1.Models
{
    public class Role : IdentityRole
    {
        public string PremissionLevel { get; set; } = string.Empty;
    }
}
