using System.ComponentModel.DataAnnotations;

namespace Lesson5_HW.Models
{
    public class OscarAward
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Type { get; set; }
        [Required]
        public int Year { get; set; }

        public Movie? Movie { get; set; }


    }
}
