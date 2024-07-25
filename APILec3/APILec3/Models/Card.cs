using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace APILec3.Models
{
    public class Card : IDatabaseItem
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "Title must be at least 2 characters"), MaxLength(256, ErrorMessage = "Title must be 256 characters at most")]
        public required string? title { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "Subtitle must be at least 2 characters"), MaxLength(256, ErrorMessage = "Subtitle must be 256 characters at most")]
        public required string? subtitle { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "Description must be at least 2 characters"), MaxLength(1024, ErrorMessage = "Description must be 1024 characters at most")]
        public required string? description { get; set; }
        [Required , Phone]
        [MinLength(9, ErrorMessage = "Phone number must be at least 2 characters"), MaxLength(11, ErrorMessage = "Phone number must be 11 characters at most")]
        public required string? phone { get; set; }
        [Required , EmailAddress]
        [MinLength(5, ErrorMessage = "Email must be at least 5 characters")]
        public required string? email { get; set; }
        [MinLength(14, ErrorMessage = "Web address must be at least 14 characters")]
        public string? web {  get; set; }
        [Required]
        public required Image image { get; set; }
        [Required]
        public required Address address { get; set; }
        [Required]
        public string user_id {  get; set; } 
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
        public List<string> Likes { get; set; } = [];

        public string bizNumber { get; set; } = Guid.NewGuid().ToString();

    }
}
