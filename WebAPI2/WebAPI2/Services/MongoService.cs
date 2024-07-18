using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace WebAPI2.Services
{
    public class MongoService
    {
        //data base object
        private readonly IMongoDatabase _database;
        //connection string
        public MongoService(IConfiguration config)
        {
            var connectionString = config.GetConnectionString("MongoDBConnectionStrings");
            var client = new MongoClient(connectionString);
            //database name
            _database = client.GetDatabase(config["DataBaseName"]);
        }
        //collection
        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }


    }
    
}
