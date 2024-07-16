using AspnAPI.Models;
using AspnAPI.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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


        public async static Task<List<User>> GetUserList(Guid userID)
        {
            List<User> UserList = new List<User>();
            var filter = Builders<BsonDocument>.Filter.Empty;
            var bsonUsers = await MongoStatics.collection.Find(filter).ToListAsync();
            Console.WriteLine(bsonUsers.ToJson());
            UserList = bsonUsers.Select(bsonDoc => BsonSerializer.Deserialize<User>(bsonDoc)).ToList();
            List<User> userFind = UserList.Where(user => user.Id.ToString().Contains(userID.ToString())).ToList();
            return userFind;
        }


        public static FilterDefinition<BsonDocument> Mongofilter(Guid id)
        {
            return Builders<BsonDocument>.Filter.Eq("_id", id.ToString());
        }


        public static UpdateDefinition<BsonDocument> MongoUpdateUser(dUser user)
        {
            UpdateDefinition<BsonDocument> combinedUpdate = Builders<BsonDocument>.Update.Combine(
                Builders<BsonDocument>.Update.Set("FirstName", user.FirstName),
                Builders<BsonDocument>.Update.Set("LastName", user.LastName),
                Builders<BsonDocument>.Update.Set("Age", user.Age),
                Builders<BsonDocument>.Update.Set("Email", user.Email),
                Builders<BsonDocument>.Update.Set("Password", user.Password)
                );
            return combinedUpdate;
        }

        public static BsonDocument UserToBsonDocument(User user)
        {
            return user.ToBsonDocument();
        }



        public static User BsonDocumentToUser(BsonDocument bsonElements)
        {
            User user = new User(bsonElements);
            return user;
        }


        //CRUD Functions
        public async static Task<List<User>> GetAll()
        {
            var filter = Builders<BsonDocument>.Filter.Empty;
            var bsonUsers = await MongoStatics.collection.Find(filter).ToListAsync();
            var userList = bsonUsers.Select(bsonDoc => BsonSerializer.Deserialize<User>(bsonDoc)).ToList();
            return userList;
        }

        public async static Task<User> GetUserByID(Guid id)
        {
            var filter = MongoStatics.Mongofilter(id);
            var bsonUsers = await MongoStatics.collection.Find(filter).ToListAsync();
            User? user = null;
            if (bsonUsers != null && bsonUsers.Count > 0)
            {
                user = MongoStatics.BsonDocumentToUser(bsonUsers[0]);
            }

            return user;
        }

        public static async Task<User> Post(dUser user)
        {
            User user1 = new User(user);
            var userDocument = MongoStatics.UserToBsonDocument(user1);
            await MongoStatics.collection.InsertOneAsync(userDocument);
            return MongoStatics.BsonDocumentToUser(userDocument);
        }

        public static async Task<UpdateResult> Put(Guid id, dUser user)
        {
            var filter = MongoStatics.Mongofilter(id);
            var newuser = MongoStatics.MongoUpdateUser(user);
            var updateResult = await MongoStatics.collection.UpdateOneAsync(filter, newuser);
            return updateResult;
        }
    }
}
