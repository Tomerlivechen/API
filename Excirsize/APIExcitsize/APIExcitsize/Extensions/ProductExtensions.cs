using APIExcitsize.DTOs.Product;
using APIExcitsize.Models;

namespace APIExcitsize.Extensions
{
    public static class ProductExtensions
    {
        public static Product toModel(this InputProduct inputProduct, string ID)
        {
            return new Product
            {
                Id = ID,
                Name = inputProduct.Name,
                Price = inputProduct.Price,
            };
        }
    }
}
