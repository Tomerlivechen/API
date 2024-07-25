using MongoDB.Bson.Serialization.Attributes;

namespace APILec3.Models
{
    public class To_Do : IDatabaseItem
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Title { get; set; }
        public string? Description { get; set; }

        public bool? InProgress { get; set; }

        public bool? IsCompleted { get; set; }
    }
}
