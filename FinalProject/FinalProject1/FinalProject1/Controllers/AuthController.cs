using FinalProject1.DTOs;
using FinalProject1.Mapping;
using FinalProject1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProject1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(SignInManager<User> signInManager, UserManager<User> userManager) : Controller
    {


        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegister register)
        {
            if ((ModelState.IsValid))
            {
                var user = register.RegisterUser();
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
        // GET: api/<AuthController>

        [HttpPost("Login")]
        public async Task<IActionResult> LogIn(UserLogin login, string ReturnUrl = "/")
        {
            if (ModelState.IsValid)
            {

                var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, isPersistent: true, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return Redirect(ReturnUrl);
                }
                ModelState.AddModelError("Failed Login", "Invaild Login Attempt");

            }
            return View(login);
        }

        public async Task<IActionResult> LogOut()
        {
            await signInManager.SignOutAsync();
            return Redirect("/");
        }

        [HttpPost("Manage")]
        public async Task<IActionResult> Manage(UserEdit manageView)
        {
            var user = await userManager.GetUserAsync(User);
            bool changed = false;
            if (user == null)
            {
                return Redirect("/");
            }
            if (manageView.OldPassword is not null && manageView.NewPassword is not null)
            {
                var passwordChange = await userManager.ChangePasswordAsync(user, manageView.OldPassword, manageView.NewPassword);
                if (passwordChange.Succeeded)
                {
                    changed = true;
                }
                else
                {
                    foreach (var error in passwordChange.Errors)
                    {
                        ModelState.AddModelError("Password error", error.Description);
                        return View(manageView);
                    }
                }
            }
            if (manageView.Prefix is not null)
            {
                user.Prefix = manageView.Prefix;
                await userManager.UpdateAsync(user);
                changed = true;
            }
            if (manageView.First_Name is not null)
            {
                user.First_Name = manageView.First_Name;
                await userManager.UpdateAsync(user);
                changed = true;
            }
            if (manageView.Last_Name is not null)
            {
                user.Last_Name = manageView.Last_Name;
                await userManager.UpdateAsync(user);
                changed = true;
            }
            if (manageView.Pronouns is not null)
            {
                user.Pronouns = manageView.Pronouns;
                await userManager.UpdateAsync(user);
                changed = true;
            }
            if (manageView.ImageURL is not null)
            {
                user.ImageURL = manageView.ImageURL;
                await userManager.UpdateAsync(user);
                changed = true;
            }
            if (manageView.Role is not null)
            {
                user.Role = manageView.Role;
                await userManager.UpdateAsync(user);
                changed = true;
            }
            if (changed)
            {
                return Redirect("/");
            }
            ModelState.AddModelError("No Changes", "No changes made");
            return View(manageView);
        }

    }
}
