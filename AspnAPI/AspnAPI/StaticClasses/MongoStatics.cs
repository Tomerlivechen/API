using AspnAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Xml.Linq;

namespace AspnAPI.StaticClasses
{
    public class MongoStatics
    {
        public static string connectionString = "mongodb+srv://1tomerlivechen:vwZ4nMAMySAmNZu9@cluster10.kudnej3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10";

        public static MongoClient client = new MongoClient(connectionString);

        public static IMongoDatabase database = client.GetDatabase("UsersDetaBase");

        public static IMongoCollection<BsonDocument> collection = database.GetCollection<BsonDocument>("Users");




        public static FilterDefinition<BsonDocument> Mongofilter(Guid id)
        {
            return Builders<BsonDocument>.Filter.Eq("Id", id.ToString());
        }

        public static FilterDefinition<BsonDocument> MongofilterName(string Name)
        {
            return Builders<BsonDocument>.Filter.Regex("firstName", new BsonRegularExpression(Name, "i"));
        }

        public static UpdateDefinition<BsonDocument> Mongoupdatee(User user)
        {
            return Builders<BsonDocument>.Update.Set("sirname", user);
        }

        public static BsonDocument UserToBsonDocument(User user)
        {
            return user.ToBsonDocument();
        }



    }
}
