using AspNet_L2_HW.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNet_L2_HW.Controllers
{
    public class MovieController(MovieDBContext movies) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var people = await movies.Movies.ToListAsync();
            return View(people);
        }

        public async Task<IActionResult> Details(int id)
        {

            return View(await movies.Movies.FirstOrDefaultAsync(b => b.Id == id));
        }
    }
}
