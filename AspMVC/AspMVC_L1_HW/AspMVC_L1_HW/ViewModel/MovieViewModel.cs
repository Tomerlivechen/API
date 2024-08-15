namespace AspMVC_L1_HW.ViewModel
{
    public class MovieViewModel : IIdentity
    {
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
                return Description.Substring(0,index) + "...";
            }
            else
            {
                return Description;
            }
        }
    }
}
