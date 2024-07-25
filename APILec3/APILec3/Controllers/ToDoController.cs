using APILec3.Models;
using APILec3.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APILec3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController(IRepository<IDatabaseItem> toDoRep) : ControllerBase
    {
        // GET: api/<ToDoController>
        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var toDoList = await toDoRep.GetAll();
            return Ok(toDoList);
        }

        // GET api/<ToDoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            var retern = await toDoRep.GetByIdAsync(id);
            if (retern == null)
            {
                return NotFound();
            }
            return Ok(retern);
        }

        // POST api/<ToDoController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] To_Do value)
        {
            var result = await toDoRep.AddAsync(value);

            return Ok(result);
        }

        // PUT api/<ToDoController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] To_Do value)
        {
            
            var retern = await toDoRep.PutAsync(id, value);
            if (retern == null)
            {
                return NotFound();
            }
            return Ok(retern);
        }

        // DELETE api/<ToDoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemByID([FromRoute] string id)
        {
            var response = await toDoRep.DeleteByIdAsync(id);
            if (response)
            {
                return Ok(response);
            }
            return NotFound();
        }
    }
}
