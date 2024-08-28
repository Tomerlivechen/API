using System.ComponentModel.DataAnnotations;

namespace Lesson5_HW.Models
{
    public class Director
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Name { get; set; }

        public List<Movie>? Movies { get; set; } = new List<Movie>();
    }
}
