using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using WebAPI2.Models.DTO;

namespace WebAPI2.Models
{
    public class Person
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }    
        public string Name { get; set; } = string.Empty;

        public Person(DTOPerson DTOperson)
        {
            Name = DTOperson.Name;
        }
    }
}
