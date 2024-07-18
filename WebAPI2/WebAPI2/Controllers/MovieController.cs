using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using WebAPI2.Models;
using WebAPI2.Models.DTO;
using WebAPI2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        public IMongoCollection<Movie> Movies { get; set; }
        // GET: api/<MovieController>

        public MovieController(MongoService service)
        {
            Movies = service.GetCollection<Movie>("Movies");
        }
        [HttpGet]

        public IActionResult GetMovies()
        {
            return Ok(Movies.Find(_ => true).ToList());
        }

        // GET api/<MovieController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(string id)
        {
            Movie userFind = Movies.Find(m => m.Id == id).FirstOrDefault();

            if (userFind is not null)
            {

                return Ok(userFind);
            }
            else
            {
                return NotFound(id);
            }

        }

        // POST api/<MovieController>
        [HttpPost]

        public IActionResult PostPerson(DTOMovie movie)
        {
            Movie movie1 = new Movie(movie);
            Movies.InsertOne(movie1);
            return Ok(movie1);
        }

        // PUT api/<MovieController>/5

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] DTOMovie movie)
        {
            Movie movie1 = new Movie(movie);
            movie1.Id = id;
            var updateResult = Movies.ReplaceOne(p => p.Id == id, movie1);
            if (updateResult != null && updateResult.ModifiedCount > 0)
            {
                return Ok(movie1);
            }
            else
            {
                return NotFound(id);
            }
        }

        // DELETE api/<MovieController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteByID(string id)
        {
            var results = Movies.DeleteOne(m => m.Id == id);

            if (results.DeletedCount > 0)
            {
                return Ok();
            }
            else
            {
                return NotFound(id);
            }

        }
    }
}
