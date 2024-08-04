using MongoDB.Driver;

namespace APIExcitsize.Services
{
    public class MongoService : IMongoService
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
