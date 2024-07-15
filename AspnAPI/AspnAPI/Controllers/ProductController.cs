using AspnAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
       public static List<Product> products = new List<Product>
{
    new Product("Laptop", 999.99),
    new Product("Smartphone", 799.49),
    new Product("Tablet", 499.99),
    new Product("Headphones", 199.95),
    new Product("Smartwatch", 249.99),
    new Product("Camera", 599.99),
    new Product("Printer", 149.99),
    new Product("Monitor", 299.99),
    new Product("Keyboard", 49.99),
    new Product("Mouse", 39.99),
    new Product("Speaker", 89.99),
    new Product("Router", 129.99),
    new Product("External Hard Drive", 79.99),
    new Product("Flash Drive", 19.99),
    new Product("Webcam", 59.99),
    new Product("Microphone", 89.99),
    new Product("Projector", 499.99),
    new Product("Gaming Console", 399.99),
    new Product("Fitness Tracker", 149.99),
    new Product("VR Headset", 299.99)
};


        // GET: api/<ProductController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(products);
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = products.Find(x => x.Id == id);
            if (product != null)
            {
                return Ok(product);
            }
            else
            {
                return NotFound(id);
            }
        }

        // POST api/<ProductController>
        [HttpPost]
        public IActionResult Post(NoIdProduct productNID)
        {
           int idNum = products.Count()+1;

            Product product = new Product(productNID.Name, productNID.Price);
            products.Add(product);
            return Created();
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] NoIdProduct productNID)
        {
            var product = products.Find(x => x.Id == id);
            if (product != null)
            {
                product.Name = productNID.Name;
                product.Price = productNID.Price;
                return Ok(product);
            }
            else
            {
                return NotFound(id);
            }
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = products.Find(x => x.Id == id);
            if (product != null)
            {
                products.Remove(product);
                return Ok(product);
            }
            else
            {
                return NotFound(id);
            }
        }
    }
}
