using FinalProject3.Models;
using System.ComponentModel.DataAnnotations;

namespace FinalProject3.DTOs
{
    public class SocialGroupDisplay
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public string ImageURL { get; set; } = string.Empty;
        public string BanerImageURL { get; set; } = string.Empty;


        public AppUserDisplay GroupCreator { get; set; } = new AppUserDisplay();

        public AppUserDisplay Admin { get; set; } = new AppUserDisplay();


        public List<AppUserDisplay> Members { get; set; } = new List<AppUserDisplay>();

        public List<PostDisplay> Posts { get; set; } = new List<PostDisplay>();
    }
}
