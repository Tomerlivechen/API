using APILec3.Models;


namespace APILec3.Repository
{
    public interface IRepository<T> where T : IDatabaseItem;
    {
        Task<IEnumerable<T>> GetAll();

        Task<T?> GetByIdAsync(string id);

        Task<T> AddAsync(T databaseItem);

        Task<bool> DeleteByIdAsync(string id);

        Task<T> PutAsync(string id, T databaseItem);
    }
}
