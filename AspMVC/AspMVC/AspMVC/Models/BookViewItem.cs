namespace AspMVC.Models
{
    public class BookViewItem : IDatabaseItem
    {
        public int? id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public DateTime Published { get; set; }
    }
}
