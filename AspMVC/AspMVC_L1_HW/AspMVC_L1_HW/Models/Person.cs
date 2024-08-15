using System.ComponentModel.DataAnnotations;

namespace AspMVC_L1_HW.Models
{
    public class Person
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(20)]
        public string Name { get; set; }

    }
}
