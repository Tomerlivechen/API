using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MongoExercise.Models
{
    public class Person : IDataBaseItem
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
