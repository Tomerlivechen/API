

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FinalProject3.Models
{
    public class User : IdentityUser
    {

        public string Prefix { get; set; } = string.Empty;
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;

        public string Pronouns { get; set; } = string.Empty;

        public string ImageURL { get; set; } = string.Empty;

        public string ImageAlt { get; set; } = string.Empty;

        [Required]
        public required string PremissionLevel { get; set; }

        public List<User> Following { get; set; } = [];

        public List<Post> Posts { get; set; } = [];

        public int VoteScore { get; set; } = 0;



    }
}
