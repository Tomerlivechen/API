using APIExcitsize.DTOs.Product;
using APIExcitsize.Extensions;
using APIExcitsize.Models;
using APIExcitsize.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APIExcitsize.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(IRepository<Product> ProductRep) : ControllerBase
    {
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var productList = await ProductRep.GetAllAsync();

            return Ok(productList);
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            Product? product = await ProductRep.GetByIdAsync(id);
            if (product == null) {
                return BadRequest();
                    }
            else
            {
                return Ok(product);
            }
        }

        // POST api/<ProductController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] InputProduct value)
        {
            Product product = value.toModel(Guid.NewGuid().ToString());
            var inputResult = await ProductRep.AddAsync(product);
            return Ok(inputResult);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, [FromBody] InputProduct value)
        {
            Product product = value.toModel(id);
            var putResult = await ProductRep.PutAsync(id, product);
            if (putResult == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(product);
            }
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var putResult = await ProductRep.DeleteByIdAsync(id);
            if (!putResult)
            {
                return BadRequest();
            }
            else
            {
                return Ok();
            }
        }
    }
}
