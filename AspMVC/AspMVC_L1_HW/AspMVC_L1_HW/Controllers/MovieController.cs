using AspMVC_L1_HW.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspMVC_L1_HW.Controllers
{
    public class MovieController : Controller
    {
        private static string big = Statc_Models.bigImage;
        private static string small = Statc_Models.smallImage;
        private static List<Movie>  movies = Statc_Models.movies;
        public IActionResult Index()
        {
            return View(movies);
        }

        public IActionResult Details(int id)
        {
            return View(movies.FirstOrDefault(b => b.Id == id));
        }
    }
}
