using APILec3.Models;
using MongoDB.Driver;

namespace APILec3.Repository
{
    public interface IMovieRepository
    {
        Task<IEnumerable<Movie>> GetAllMovies();

        Task<Movie?> GetMovieByIdAsync(string id);

        Task<Movie> AddMovieAsync(Movie movie);

        Task<bool> DeleteMovieByIdAsync(string id);


    }
}
