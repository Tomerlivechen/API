using MongoDB.Driver;

namespace APILec3.Sevices
{
    public class ToDoService : IMongoService
    {
        private readonly IMongoDatabase _database;
        public ToDoService(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("MongoDBConnectionStrings");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(config["ToDoDataBase"]);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }
}
