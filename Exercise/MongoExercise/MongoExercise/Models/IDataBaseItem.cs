using MongoDB.Bson.Serialization.Attributes;

namespace MongoExercise.Models
{
    public interface IDataBaseItem
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
    }
}
