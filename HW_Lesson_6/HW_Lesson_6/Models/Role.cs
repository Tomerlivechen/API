using System.ComponentModel.DataAnnotations;

namespace HW_Lesson_6.Models
{
    public class Role
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }
    }
}
