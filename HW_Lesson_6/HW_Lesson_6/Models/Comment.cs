using System.ComponentModel.DataAnnotations;

namespace HW_Lesson_6.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public required string CommentText { get; set; }

        [Required]
        public required Post Post { get; set; }
        [Required]
        public required User User { get; set; }
    }
}
