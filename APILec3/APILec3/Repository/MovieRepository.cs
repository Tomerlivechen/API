using APILec3.Models;
using APILec3.Sevices;
using MongoDB.Driver;

namespace APILec3.Repository
{
    public class MovieRepository(IMongoService mongo) : IMovieRepository
    {
        private readonly IMongoCollection<Movie> _Movies_repository = mongo.GetCollection<Movie>("Movies");

        public async Task<Movie> AddMovieAsync(Movie movie)
        {
            await _Movies_repository.InsertOneAsync(movie);
            return movie;
        }

        public async Task<bool> DeleteMovieByIdAsync(string id)
        {
            var Delete = await _Movies_repository.DeleteOneAsync(f => f.Id == id);
            if (Delete.DeletedCount == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<Movie>> GetAllMovies()
        {
            var cursor =  _Movies_repository.Find(_ => true);
            var Movies = await cursor.ToListAsync();
            return Movies;

        }

        public async Task<Movie?> GetMovieByIdAsync(string id)
        {
            Movie? Found = await _Movies_repository.Find(f => f.Id == id).FirstOrDefaultAsync();
            if (Found is not null)
            {
                return Found;
            }
            else
            {
                return null;
            }
        }
    }
}
