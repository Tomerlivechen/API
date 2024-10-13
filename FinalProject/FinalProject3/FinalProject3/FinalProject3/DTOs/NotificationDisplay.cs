using FinalProject3.Models;

namespace FinalProject3.DTOs
{
    public class NotificationDisplay
    {
        public string Id { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public string Date { get; set; } = string.Empty;

        public bool Seen { get; set; } = false;

        public bool Hidden { get; set; } = false;

        public string ReferenceId { get; set; } = string.Empty;

        public string userid { get; set; } = string.Empty;


    }
}
