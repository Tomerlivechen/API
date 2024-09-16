using FinalProject2.Models;
using System.ComponentModel.DataAnnotations;

namespace FinalProject2.DTOs
{
    public class PostDisplay
    {
        public required string Id { get; set; }
        public string Link { get; set; } = string.Empty;
        public string ImageURL { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorId { get; set; } = string.Empty;
        public int UpVotes { get; set; }

        public int DownVotes { get; set; }

        public int TotalVotes { get; set; }
    
    public required string Title { get; set; }
        public Category? Category { get; set; }

        public string[] KeyWords { get; set; } = [];

        public List<CommentDisplay>? Comments { get; set; } = new List<CommentDisplay>();
    }
}
