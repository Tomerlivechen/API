using AspMVC_L1_HW.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspMVC_L1_HW.Controllers
{
    public class PeopleController(Lect2DBContext lect2DB) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var people = await lect2DB.People.ToListAsync();
            return View(people);
        }

        public async Task<IActionResult> Details(int id)
        {

            return View(await lect2DB.People.FirstOrDefaultAsync(b => b.Id == id));
        }
    }
}
