using AspnAPI.Models;
using AspnAPI.Models.DTO;
using AspnAPI.StaticClasses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System.Text.Json;
using System.Xml.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MongoController : ControllerBase
    {
        // GET: api/<MongoController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var filter = Builders<BsonDocument>.Filter.Empty;
            var bsonUsers = await MongoStatics.collection.Find(filter).ToListAsync();
            var userList = bsonUsers.Select(bsonDoc => BsonSerializer.Deserialize<User>(bsonDoc)).ToList();
            return Ok(userList);
        }

        // GET api/<MongoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {

            List<User> UserList = new List<User>();
          //  FilterDefinition<BsonDocument> filter = MongoStatics.Mongofilter(id);
            var filter = Builders<BsonDocument>.Filter.Empty;
            var bsonUsers = await MongoStatics.collection.Find(filter).ToListAsync();
            Console.WriteLine(bsonUsers.ToJson());
            UserList = bsonUsers.Select(bsonDoc => BsonSerializer.Deserialize<User>(bsonDoc)).ToList();
            List<User> userFind = UserList.Where(user => user.Id.ToString().Contains(id.ToString())).ToList();
            if (userFind!=null)
            {

                return Ok(userFind);
            }
            else
            {
                return NotFound(id);
            }
            
        }


        // POST api/<MongoController>
        [HttpPost]
        public async void Post([FromBody] dUser user)
        {
            User user1 = new User(user);
            MongoStatics.collection.InsertOneAsync(MongoStatics.UserToBsonDocument(user1));
        }

        // PUT api/<MongoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MongoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
