using MongoDB.Driver;

namespace MongoExercise.Services
{
    public class MongoService
    {
        private readonly IMongoDatabase Database;

        public MongoService(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("MongoDBConnectionStrings");
            var client = new MongoClient(connectionString);
            Database = client.GetDatabase(config["DataBaseName"]);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return Database.GetCollection<T>(name);
        }
    }
}
