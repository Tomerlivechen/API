using System.ComponentModel.DataAnnotations;

namespace AspMVC_L1_HW.Models
{
    public class Dog
    {
        [Key]
        public int Id { get; set; }

        public required string Name { get; set; }

        [Required , MinLength(2), MaxLength(25)]
        public required string Breed { get; set; }


    }
}
