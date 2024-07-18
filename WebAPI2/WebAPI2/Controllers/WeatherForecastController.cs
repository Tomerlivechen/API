using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using WebAPI2.Models;
using WebAPI2.Models.DTO;
using WebAPI2.Services;

namespace WebAPI2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DemoController : ControllerBase
    {
        public IMongoCollection<Person> people { get; set; }

        public DemoController(MongoService service)
        {
            people = service.GetCollection<Person>("People");
        }
        [HttpPost]

        public IActionResult PostPerson(DTOPerson person)
        {
            Person person1 = new Person(person);
            people.InsertOne(person1);
            return Ok(person1);
        }

        [HttpGet]

        public IActionResult GetPerson() {
        return Ok(people.Find(_ => true).ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            Person userFind = people.Find(p => p.Id == id).FirstOrDefault();

            if (userFind is not null)
            {

                return Ok(userFind);
            }
            else
            {
                return NotFound(id);
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteByID(string id)
        {
            var results = people.DeleteOne(p => p.Id == id);

            if (results.DeletedCount >0)
            {
                return Ok();
            }
            else
            {
                return NotFound(id);
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] DTOPerson person)
        {
            Person person1 = new Person(person);
            person1.Id = id;
            var updateResult = people.ReplaceOne(p => p.Id == id, person1);
            if (updateResult != null && updateResult.ModifiedCount > 0)
            {
                return Ok(person1);
            }
            else
            {
                return NotFound(id);
            }
        }

    }
}
