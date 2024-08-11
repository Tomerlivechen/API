using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspMVC.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult index()
        {

        return View();
        
        }

        public IActionResult Social()
        {

            return View();

        }
    }
}
