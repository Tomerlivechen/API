using MongoExercise.Models;

namespace MongoExercise.Repository
{
    public interface IRepository<T> where T : IDataBaseItem
    {
        Task<T?> GetByIdAsync(string id);

        Task<IEnumerable<T>> GetAllAsync();

        Task<T> AddAsync(T DatabaseItem);

        Task<bool> DeleteByIdAsync(string id);

        Task<T?> PutAsync(string id, T DatabaseItem);
    }
}
