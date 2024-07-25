using System.ComponentModel.DataAnnotations;

namespace APILec3.Models
{
    public class Address
    { 
        public string? State { get; set; } = string.Empty;
        [Required (ErrorMessage = "Country is required")]
        public required string Country { get; set; }
        [Required(ErrorMessage = "City is required")]
        public required string City { get; set; }
        [Required(ErrorMessage = "Street is required")]
        public required string Street { get; set; }
        [Required(ErrorMessage = "HouseNumber is required")]
        [Range(1, int.MaxValue, ErrorMessage ="House must be larger then 1")]
        public required int HouseNumber { get; set; }
        public int? Zip { get; set; }
        
    }
}
