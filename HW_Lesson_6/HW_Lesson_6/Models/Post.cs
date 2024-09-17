using System.ComponentModel.DataAnnotations;

namespace HW_Lesson_6.Models
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
