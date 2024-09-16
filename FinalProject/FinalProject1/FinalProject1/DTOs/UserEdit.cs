using FinalProject1.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace FinalProject1.DTOs
{
    public class UserEdit
    {
        public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
        public string Prefix { get; set; } = string.Empty;
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;
        public string Pronouns { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        public string ImageAlt { get; set; } = string.Empty;
        public required Role Role { get; set; }
    }
}
