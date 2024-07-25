using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace APILec3.Models
{
    public class Image
    {
        [Required, Url]
        [MinLength(14,  ErrorMessage = "House must be at least 14 characters") ]
        public required string url { get; set; }
        [Required]
        [MinLength(2 , ErrorMessage = "House must be at least 2 characters") , MaxLength(256, ErrorMessage = "House must be 256 characters at most") ]
        public required string alt { get; set; }
    }
}
