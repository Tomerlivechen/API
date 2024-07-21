using MongoDB.Driver;

namespace APILec3.Sevices
{
    public class MongoService : IMongoService
    {
        private readonly IMongoDatabase _database;
        public MongoService(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("MongoDBConnectionStrings");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(config["DataBaseName"]);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }
}
