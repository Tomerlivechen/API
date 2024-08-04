namespace APIExcitsize.Models
{
    public class Product : IDataBaseItem
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public float Price {  get; set; }
    }
}
