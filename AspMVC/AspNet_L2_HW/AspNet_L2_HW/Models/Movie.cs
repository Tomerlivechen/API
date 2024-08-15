using System.ComponentModel.DataAnnotations;

namespace AspNet_L2_HW.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public string Overview { get; set; } = string.Empty;

        public Uri? imageURL { get; set; }

        public string GetBigImage()
        {
            string Url = $"{imageURL}{Statc_Models.bigImage}";
            return Url;
        }
        public string GetSmallImage()
        {
            string Url = $"{imageURL}{Statc_Models.smallImage}";
            return Url;
        }

        public string GetSubstring(int index)
        {
            if (Description.Length > index)
            {
                return Description.Substring(0, index) + "...";
            }
            else
            {
                return Description;
            }
        }
    }
}
