using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace APIExcitsize.Models
{
    public class AppUser() : MongoUser<ObjectId>()
    {
        [BsonRequired]
        public required string First_Name { get; set; }
        [BsonRequired]
        public required string Last_Name { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedDate {  get; set; } = DateTime.UtcNow;
    }
}
