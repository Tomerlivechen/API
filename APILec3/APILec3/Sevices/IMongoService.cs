using MongoDB.Driver;

namespace APILec3.Sevices
{
    public interface IMongoService
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}