using APILec3.Models;
using APILec3.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace APILec3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController(IMovieRepository movieRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetAllMovies()
        {
            var movies = await movieRepository.GetAllMovies();
            return Ok(movies);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Movie movie)
        {
            var result = await movieRepository.AddMovieAsync(movie);

            return CreatedAtAction(nameof(GetMovieById), new { id = result.Id! },result);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById([FromRoute] string id)
        {
            Movie? reternMovie = await movieRepository.GetMovieByIdAsync(id);
            if (reternMovie == null)
            {
                return NotFound();
            }
            return Ok(reternMovie);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemByID([FromRoute] string id)
        {
            var response = await movieRepository.DeleteMovieByIdAsync(id);
            if (response)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
    

}
