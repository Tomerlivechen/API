

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FinalProject3.Models
{
    public class AppUser : IdentityUser
    {

        public string Prefix { get; set; } = string.Empty;
        public string First_Name { get; set; } = string.Empty;
        public string Last_Name { get; set; } = string.Empty;

        public string Pronouns { get; set; } = string.Empty;

        public string ImageURL { get; set; } = string.Empty;

        public string ImageAlt { get; set; } = string.Empty;

        [Required]
        public required string PermissionLevel { get; set; }

        public List<AppUser> Following { get; set; } = [];
        public List<AppUser> Blocked { get; set; } = [];

        public List<string> FollowingId { get; set; } = [];
        public List<string> BlockedId { get; set; } = [];

        public List<Post> Posts { get; set; } = [];

        public List<SocialGroup> SocialGroups { get; set; } = [];

        public int VoteScore { get; set; } = 0;

        public List<Chat> Chats { get; set; } = new List<Chat>();

        public List<Notification> Notifications { get; set; } = new List<Notification>();

    }
}
