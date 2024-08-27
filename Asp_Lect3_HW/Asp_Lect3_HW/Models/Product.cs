using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Asp_Lect3_HW.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required , MinLength(2),MaxLength(25)]
        public string Name { get; set; } = string.Empty;
        [Required , MinLength(10), MaxLength(100)]
        public string Description { get; set; } = string.Empty ;
        [Required, Range(0.1,double.MaxValue) ]
        public decimal Price { get; set; }
        [Required, Url]
        [DisplayName("Image")]
        public string ImageURL { get; set; } = string.Empty;
    }
}
