using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using WebAPI2.Models.DTO;

namespace WebAPI2.Models
{
    public class Movie
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public Movie(DTOMovie dTOMovie)
        {
            Title = dTOMovie.Title;
            Description = dTOMovie.Description;
        }
    }
}
