using Identity_and_Users.Models;
using Identity_and_Users.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Identity_and_Users.Controllers
{
    public class AuthController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager) : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel register)
        {
            if ((ModelState.IsValid))
            {
                var user = new AppUser() {Email = register.Email , Property = register.Property , UserName= register.Email };
                var result = await userManager.CreateAsync(user, register.Password);
                if (result.Succeeded)
                {
                    await signInManager.SignInAsync(user, isPersistent: true);
                    return RedirectToAction("Index", "Home");
                }
                foreach (var error in result.Errors)
                {
                        ModelState.AddModelError("Register Failed", error.Description);
                }
            }

            return View(register);
        }
        public async Task<IActionResult> LogIn()
        {
            return View();
        }

        public async Task<IActionResult> LogOut()
        {
            return View();
        }

        public async Task<IActionResult> Manage()
        {
            return View();
        }
    }
}
