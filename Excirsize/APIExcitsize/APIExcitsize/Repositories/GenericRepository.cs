using APIExcitsize.Models;
using APIExcitsize.Services;
using MongoDB.Driver;

namespace APIExcitsize.Repositories
{
    public class GenericRepository<T>(IMongoService mongo) : IRepository<T> where T : IDataBaseItem
    {
        protected readonly IMongoCollection<T> DataBaseList = mongo.GetCollection<T>(typeof(T).Name + "List");
        virtual public async Task<T> AddAsync(T DatabaseItem)
        {
            await DataBaseList.InsertOneAsync(DatabaseItem);
            return DatabaseItem;
        }

        virtual public async Task<bool> DeleteByIdAsync(string id)
        {
           var deletedItem = await DataBaseList.DeleteOneAsync(p => p.Id == id);
            if (deletedItem.DeletedCount == 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        virtual public async Task<IEnumerable<T>> GetAllAsync()
        {
            var Collection = await DataBaseList.FindAsync(P => true);
            return await Collection.ToListAsync();

        }

        virtual public async Task<T?> GetByIdAsync(string id)
        {
            var item = await DataBaseList.Find(p => p.Id == id).FirstOrDefaultAsync();
            if (item is not null)
            {
                return (T?)item;
            }
            else
            {
                return default(T?);
            }
        }

        virtual public async Task<T?> PutAsync(string id, T DatabaseItem)
        {
            DatabaseItem.Id = id;
            var replace = await DataBaseList.ReplaceOneAsync((f => f.Id == id), DatabaseItem);
            if (replace.ModifiedCount == 1)
            {
                return (T?)DatabaseItem;
            }
            else {
                return default(T?);
            }
        }
    }
}
