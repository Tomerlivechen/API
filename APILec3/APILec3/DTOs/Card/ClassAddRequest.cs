using APILec3.Models;
using System.ComponentModel.DataAnnotations;

namespace APILec3.DTOs.Card
{
    public class ClassAddRequest 
    {
        [Required]
        [MinLength(2, ErrorMessage = "Title must be at least 2 characters"), MaxLength(256, ErrorMessage = "Title must be 256 characters at most")]
        public required string? title { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "Subtitle must be at least 2 characters"), MaxLength(256, ErrorMessage = "Subtitle must be 256 characters at most")]
        public required string? subtitle { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "Description must be at least 2 characters"), MaxLength(1024, ErrorMessage = "Description must be 1024 characters at most")]
        public required string? description { get; set; }
        [Required, Phone]
        [MinLength(9, ErrorMessage = "Phone number must be at least 2 characters"), MaxLength(11, ErrorMessage = "Phone number must be 11 characters at most")]
        public required string? phone { get; set; }
        [Required, EmailAddress]
        [MinLength(5, ErrorMessage = "Email must be at least 5 characters")]
        public required string? email { get; set; }
        [MinLength(14, ErrorMessage = "Web address must be at least 14 characters")]
        public string? web { get; set; }
        [Required]
        public required Image image { get; set; }
        [Required]
        public required Address address { get; set; }
        public string user_id { get; set; }
    }
}
