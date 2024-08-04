using MongoDB.Driver;

namespace APIExcitsize.Services
{
    public interface IMongoService
    {

            IMongoCollection<T> GetCollection<T>(string name);

    }
}
