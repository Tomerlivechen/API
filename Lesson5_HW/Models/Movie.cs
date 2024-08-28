using System.ComponentModel.DataAnnotations;

namespace Lesson5_HW.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Title { get; set; }

        public Director? Director { get; set; }

        public int? DirectorId { get; set; }

        public List<int>? ActorId { get; set; } = new List<int>();

        public  List<Actor>? Actors { get; set; } = new List<Actor>();

        public List<int>? AwardId { get; set; } = new List<int>();

        public List<OscarAward>? Awards { get; set; } = new List<OscarAward>();
    }
}
