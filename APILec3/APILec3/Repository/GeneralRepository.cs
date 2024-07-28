using APILec3.Models;
using APILec3.Sevices;
using MongoDB.Driver;

namespace APILec3.Repository
{
    public abstract class GeneralRepository<T>(IMongoService mongo) : IRepository<T> where T : IDatabaseItem
    {

        private readonly IMongoCollection<T> DataDaseList = mongo.GetCollection<T>(typeof(T).Name+"List");
        virtual public async Task<T> AddAsync(T databaseItem)
        {
            await DataDaseList.InsertOneAsync(databaseItem);
            return databaseItem;
        }

        virtual public async Task<bool> DeleteByIdAsync(string id)
        {
            var Delete = await DataDaseList.DeleteOneAsync(f => f.Id == id);
            if (Delete.DeletedCount == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        virtual public async Task<IEnumerable<T>> GetAll()
        {
            var toDoList = await DataDaseList.FindAsync(_ => true);
            return await toDoList.ToListAsync();
        }

        virtual public async Task<T?> GetByIdAsync(string id)
        {
            var toDoList = await DataDaseList.Find(f => f.Id == id).FirstOrDefaultAsync();
            return toDoList;
        }

        virtual public async Task<T?> PutAsync(string id, T databaseItem)
        {
            databaseItem.Id = id;
           var newToDo =  await DataDaseList.ReplaceOneAsync((f => f.Id == id), databaseItem);
            if (newToDo.ModifiedCount == 1) {
                return databaseItem;
            }
            else {
                return default; }


        }


    }
}
