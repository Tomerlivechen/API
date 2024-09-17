using System.ComponentModel.DataAnnotations;

namespace FinalProject1.Models
{
    public class Post : Interaction
    {
        [Required, MinLength(2), MaxLength(55)]
        public required string Title { get; set; }
        public Category? Category { get; set; }

        public string[] KeyWords { get; set; } = [];

        public List<Comment>? Comments { get; set; } = new List<Comment>();

    }
}
