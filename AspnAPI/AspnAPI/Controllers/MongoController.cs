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
            List<User> userList = await MongoStatics.GetAll();
            return Ok(userList);
        }

        [HttpGet("Other/{id}",Name ="OtherGet")]

         public async Task<IActionResult> OtherGet(Guid id)
        {
            User? user = await MongoStatics.GetUserByID(id);
            if (user != null)
            {
                return Ok(user);
            }
            else { 
            return NotFound(id);
            }

        }

        // GET api/<MongoController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            List<User> userFind = await MongoStatics.GetUserList(id);

            if (userFind.Any())
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
        public async Task<IActionResult> Post([FromBody] dUser user)
        {
            return Ok(await MongoStatics.Post(user));
        }

        // PUT api/<MongoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] dUser user)
        {

            var updateResult = await MongoStatics.Put(id, user);
            if (updateResult != null && updateResult.ModifiedCount>0) {

                return Ok(user);
            }
            else
            {
                return NotFound(id);
            }
        }

        // DELETE api/<MongoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            User? user = await MongoStatics.GetUserByID(id);
            var deleteResult = MongoStatics.collection.DeleteOne(MongoStatics.Mongofilter(id));
            if (deleteResult != null && deleteResult.DeletedCount > 0)
            {
                return Ok(user);
            }
            else
            {
                return NotFound(id);
            }

        }
    }
}
