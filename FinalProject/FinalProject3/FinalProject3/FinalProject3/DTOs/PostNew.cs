using FinalProject3.Models;
using System.ComponentModel.DataAnnotations;

namespace FinalProject3.DTOs
{
    public class PostNew
    {
        [Key]
        public required string Id { get; set; }
        [Required, MinLength(2), MaxLength(55)]
        public required string Title { get; set; }
        public string? Link { get; set; } = string.Empty;
        public string? ImageURL { get; set; } = string.Empty;
        [Required, MinLength(2)]
        public string Text { get; set; } = string.Empty;
        [Required]
        public required string AuthorId { get; set; }

        public Category? Category { get; set; }

        public string[] KeyWords { get; set; } = [];

    }
}
