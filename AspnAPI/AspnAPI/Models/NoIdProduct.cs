namespace AspnAPI.Models
{
    public class NoIdProduct()
    {

        public string Name { get; set; }
        public double Price { get; set; }

        public NoIdProduct(string name, double price) : this()
        {
            Name = name;
            Price = price;
        }
    }
}
