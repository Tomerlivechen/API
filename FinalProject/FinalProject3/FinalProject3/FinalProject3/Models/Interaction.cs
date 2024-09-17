using System.ComponentModel.DataAnnotations;

namespace FinalProject3.Models
{
    public class Interaction
    {
        [Key]
        public required string Id { get; set; }
        public string Link { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        [Required, MinLength(2)]
        public string Text { get; set; } = string.Empty;
        [Required]
        public required User Author { get; set; }

        public List<Votes> Votes { get; set; } = [];

        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        public int TotalVotes { get; set; }
    }
}
