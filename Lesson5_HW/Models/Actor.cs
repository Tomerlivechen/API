using System.ComponentModel.DataAnnotations;

namespace Lesson5_HW.Models
{
    public class Actor
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public List<int>? MovieId { get; set; }

        public List<Movie>? Movies { get; set; }
    }
}
