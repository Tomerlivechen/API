using AspMVC_L1_HW.Data;
using AspMVC_L1_HW.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspMVC_L1_HW.Controllers
{
    public class DogsController(Lect2DBContext dBContext) : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var dogs = await dBContext.Dogs.ToListAsync();
            return View(dogs);
        }

        public  IActionResult add()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(Dog dog)
        {
            if (ModelState.IsValid)
            {
                var result = await dBContext.Dogs.AddAsync(dog);
                await dBContext.SaveChangesAsync();
                return Redirect("index");
            }
            
            return Redirect("add");
        }

        public async Task<IActionResult> Details(int id)
        {
            return View(await dBContext.Dogs.FirstOrDefaultAsync(b => b.Id == id));
        }
    }
}
