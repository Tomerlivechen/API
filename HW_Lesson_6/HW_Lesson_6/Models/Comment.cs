using System.ComponentModel.DataAnnotations;

namespace HW_Lesson_6.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public required string CommentText { get; set; }

        public required Post Post { get; set; }
        public required User User { get; set; }
    }
}
