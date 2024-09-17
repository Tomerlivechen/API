using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibraryForProject.Models
{
    internal class User
    {
        [Key]
        public string Id { get; set; }
        public string Prefix { get; set; } = string.Empty;
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Pronouns { get; set; } = string.Empty;

        public string ImageURL { get; set; } = string.Empty;

        public string ImageAlt { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public string[] FriendsId { get; set; } = [];

        public string[] PostsId { get; set; } = [];

        public int VoteScore { get; set; } = 0;

        public User()
        {
            
        }
    }
}
