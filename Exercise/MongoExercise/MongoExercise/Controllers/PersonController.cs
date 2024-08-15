using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoExercise.Models;
using MongoExercise.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MongoExercise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController(MongoService mongo, IConfiguration config) : ControllerBase
    {
        private readonly MongoService mongoService;
        private readonly IMongoCollection<Person> people = mongo.GetCollection<Person>(config["DataBaseName"]);


        // GET: api/<PersonController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(people.Find(p=>true).ToList());
        }

        // GET api/<PersonController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PersonController>
        [HttpPost]
        public void Post([FromBody] Person value)
        {
        }

        // PUT api/<PersonController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PersonController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
