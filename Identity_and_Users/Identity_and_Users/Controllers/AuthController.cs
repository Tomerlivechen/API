using Identity_and_Users.Models;
using Identity_and_Users.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

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
        [HttpGet]
        public async Task<IActionResult> LogIn(string ReturnUrl = "/")
        {
            ViewBag.ReturnUrl = ReturnUrl;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> LogIn(LoginViewModel login, string ReturnUrl ="/")
        {
            if (ModelState.IsValid)
            {
                //    var user = await userManager.FindByEmailAsync(login.Email);
                //     var result = await signInManager.PasswordSignInAsync(user, login.Password, isPersistent: true, lockoutOnFailure: false);
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
        [HttpGet]
        public async Task<IActionResult> Manage()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null) 
            {
                    return Redirect("/");
            }
            var vm = new ManageViewModel() {Username = user.UserName, Property = user.Property };
                return View(vm);
        }
        [HttpPost]
        public async Task<IActionResult> Manage(ManageViewModel manageView)
        {

                var user = await userManager.GetUserAsync(User);

                if (user == null) {
                    return Redirect("/");
                }
            if (manageView.Password is not null && manageView.NewPassword is not null)
            {
                var passwordChange = await userManager.ChangePasswordAsync(user, manageView.Password, manageView.NewPassword);

                if (passwordChange.Succeeded)
                {
                    return Redirect("/");
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
            if (manageView.Property is not null)
            {
                user.Property = manageView.Property;
                await userManager.UpdateAsync(user);
                return Redirect("/");
            }

            ModelState.AddModelError("No Changes", "No changes made");
            return View(manageView);
        }
    }
}
