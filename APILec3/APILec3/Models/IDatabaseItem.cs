using MongoDB.Bson.Serialization.Attributes;

namespace APILec3.Models
{
    public interface IDatabaseItem
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
    }
}
