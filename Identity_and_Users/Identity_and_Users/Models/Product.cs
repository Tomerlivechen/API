using System.ComponentModel.DataAnnotations;

namespace Identity_and_Users.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}
