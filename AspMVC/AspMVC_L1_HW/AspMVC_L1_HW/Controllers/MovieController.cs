using AspMVC_L1_HW.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace AspMVC_L1_HW.Controllers
{
    public class MovieController : Controller
    {
        private static List<MovieViewModel>  movies = Statc_Models.movies;
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
