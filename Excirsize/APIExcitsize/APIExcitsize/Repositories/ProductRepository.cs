using APIExcitsize.Models;
using APIExcitsize.Services;

namespace APIExcitsize.Repositories
{
    public class ProductRepository(IMongoService mongoService) : GenericRepository<Product>(mongoService)
    {
    }
}
