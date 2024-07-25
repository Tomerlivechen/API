using APILec3.Models;
using APILec3.Sevices;
using MongoDB.Driver;

namespace APILec3.Repository
{
    public class ToDoRepository(IMongoService mongo) : IRepository<IDatabaseItem>
    {

        private readonly IMongoCollection<To_Do> DataDaseList = mongo.GetCollection<To_Do>("To-Do");
        public async Task<IDatabaseItem> AddAsync(IDatabaseItem databaseItem)
        {
            await DataDaseList.InsertOneAsync((To_Do)databaseItem);
            return databaseItem;
        }

        public async Task<bool> DeleteByIdAsync(string id)
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

        public async Task<IEnumerable<IDatabaseItem>> GetAll()
        {
            var toDoList = await DataDaseList.FindAsync(_ => true);
            return await toDoList.ToListAsync();
        }

        public async Task<IDatabaseItem?> GetByIdAsync(string id)
        {
            var toDoList = await DataDaseList.Find(f => f.Id == id).FirstOrDefaultAsync();
            return toDoList;
        }

        public async Task<IDatabaseItem> PutAsync(string id, IDatabaseItem databaseItem)
        {
            databaseItem.Id = id;
           var newToDo =  await DataDaseList.ReplaceOneAsync((f => f.Id == id), (To_Do)databaseItem);
            if (newToDo.ModifiedCount == 1) {
                return databaseItem;
            }
            else { return null; }


        }
    }
}
