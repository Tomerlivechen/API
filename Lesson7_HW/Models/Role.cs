using System.ComponentModel.DataAnnotations;

namespace Lesson7_HW.Models
{
    public class Role
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }
    }
}
