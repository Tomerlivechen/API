using System.ComponentModel.DataAnnotations;

namespace Lesson5_HW.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }

        [Required]
        public int DirectorId { get; set; }
        [Required]
        public Director Director { get; set; }

        public  List<int>?  ActorId { get; set; }
        public  List<Actor>? Actors { get; set; }

        public List<OscarAward>? Awards { get; set; }

        public List<int>? AwardId { get; set; }
    }
}
