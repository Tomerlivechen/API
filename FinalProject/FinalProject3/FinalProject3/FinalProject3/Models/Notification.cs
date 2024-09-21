namespace FinalProject3.Models
{
    public class Notification
    {
        
        public string Id { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public string Date { get; set; } = string.Empty;

        public bool Seen { get; set; } = false;

        public bool Hidden { get; set; } = false;

        public string ReferenceId {  get; set; } = string.Empty;

        public User user { get; set; } = null;

        public void Viewed()
        {
            Seen = true;
        }
        public void Hide()
        {
            Hidden = true;
        }
    }
}
