using System.ComponentModel.DataAnnotations;

namespace Lesson7_HW.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string Description { get; set; }
    }
}
