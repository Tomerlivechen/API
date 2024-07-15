namespace AspnAPI.Models
{
    public class Product()
    {

        public static int _id = 0;
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }

        public Product(string name, double price):this()
        {
            Id = ++_id;
            Name = name;
            Price = price;
        }
    }
}
