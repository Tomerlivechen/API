using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HW_Lesson_6.Data;
using HW_Lesson_6.Models;
using Microsoft.AspNetCore.Identity;
using HW_Lesson_6.ViewModels;

namespace HW_Lesson_6.Controllers
{
    public class UsersController(SignInManager<User> signInManager, UserManager<User> userManager) : Controller
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
                var user = new User() { Email = register.Email, UserName = register.Email };
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
            await signInManager.SignOutAsync();
            return Redirect("/");
        }

        public async Task<IActionResult> Manage()
        {
            return View();
        }
    }
}
