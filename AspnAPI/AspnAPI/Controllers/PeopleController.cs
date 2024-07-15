using AspnAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AspnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        static string[] FNames = new[] {
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "Lucas",
  "Mia",
  "Logan",
  "Amelia",
  "James",
  "Charlotte",
  "Benjamin",
  "Harper",
  "Elijah",
  "Evelyn",
  "Aiden"
        };


        static List<Person> people = [
            new Person("Alice", 24),
        new Person("Bob", 30),
        new Person("Charlie", 27),
        new Person("Diana", 22),
        new Person("Ethan", 35),
        new Person("Fiona", 29),
        new Person("George", 31),
        new Person("Hannah", 26),
        new Person("Ian", 28),
        new Person("Julia", 33),
        new Person("Kevin", 25),
        new Person("Laura", 32),
        new Person("Michael", 21),
        new Person("Nina", 34),
        new Person("Oscar", 23),
        new Person("Paul", 29),
        new Person("Quinn", 30),
        new Person("Rachel", 27),
        new Person("Sam", 28),
        new Person("Tina", 24)
        ];

        [HttpDelete("{id}", Name = "DeletByID")]
        public IActionResult Delete(Guid id)
        {
            var person = people.Find(x => x.Id == id);
            if (person != null)
            {
                people.Remove(person);
                return Ok(person);
            }
            else
            {
                return NotFound(id);
            }
        }

        [HttpPut("{id}", Name = "EditByID")]

        public IActionResult Put(Guid id, Person p)
        {
            var person = people.Find(x => x.Id == id);
            if (person != null)
            {
                person.Name = p.Name;
                person.Age = p.Age;
                return Ok(person);
            }
            else
            {
                return NotFound(id);
            }
        }


        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return people;

        }
        [HttpGet("{id}",Name = "GetByID")]
        public IActionResult Get(Guid id)
        {
            var person= people.Find(x => x.Id == id);
            if (person != null)
            {
                return Ok(person);
            }
            else
            {
                return NotFound(id);
            }

        }
        [HttpGet("byName/{name}", Name = "GetByName")]
        public IEnumerable<Person>? Get(string name)
        {
            return people.Where( x => x.Name.Contains(name));
        }

        [HttpPost]
        public Person Post(Person p)
        {
            people.Add(p);
            p.Id = Guid.NewGuid();
            return p;
        }



    }
}
