using FinalProject3.Auth;
using FinalProject3.DTOs;
using FinalProject3.Models;
using FinalProject32.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject3.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(SignInManager<User> signInManager, UserManager<User> userManager, IJwtTokenService jwtTokenService) : Controller
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegister register)
    {

        if (ModelState.IsValid)
        {
            User user = register.RegisterToUser();
            var result = await userManager.CreateAsync(user, register.Password);
            if (result.Succeeded)
            {
                await signInManager.SignInAsync(user, isPersistent: true);
                UserLogin userLogin = new UserLogin(register.Email, register.Password);
                await LogIn(userLogin);
                return Ok(result);
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("Register Failed", error.Description);
            }
        }

        return BadRequest(register);
    }

    [HttpPost("login")]
    public async Task<IActionResult> LogIn([FromBody] UserLogin login, string ReturnUrl = "/")
    {
        if (ModelState.IsValid)
        {
            var user = await userManager.FindByEmailAsync(login.Email);
            if (user != null && user.UserName != null)
            {
                var result = await signInManager.PasswordSignInAsync(user.UserName, login.Password, isPersistent: true, lockoutOnFailure: false);

                if (result.Succeeded)
                {

                    if (user != null)
                    {
                        var token = await jwtTokenService.CreateToken(user);
                        return Ok(new { token });
                    }
                }
                return Unauthorized();
            }
        }
        return Unauthorized();
    }

    [HttpGet("Logout")]
    public async Task<IActionResult> LogOut()
    {
        await signInManager.SignOutAsync();
        return Redirect("/");
    }

    [HttpPut("manage")]
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
        if (manageView.UserName is not null)
        {
            user.UserName = manageView.UserName;
            changed = true;
        }
        if (manageView.Prefix is not null)
        {
            user.Prefix = manageView.Prefix;
            changed = true;
        }
        if (manageView.First_Name is not null)
        {
            user.First_Name = manageView.First_Name;
            changed = true;
        }
        if (manageView.Last_Name is not null)
        {
            user.Last_Name = manageView.Last_Name;
            changed = true;
        }
        if (manageView.Pronouns is not null)
        {
            user.Pronouns = manageView.Pronouns;
            changed = true;
        }
        if (manageView.ImageURL is not null)
        {
            user.ImageURL = manageView.ImageURL;
            changed = true;
        }
        if (manageView.PremissionLevel is not null)
        {
            user.PremissionLevel = manageView.PremissionLevel;
            changed = true;
        }
        if (changed)
        {
            await userManager.UpdateAsync(user);
            return Ok();
        }
        ModelState.AddModelError("No Changes", "No changes made");
        return Ok();
    }

    [HttpPut("follow")]
    public async Task<IActionResult> Follow(string userId, string followId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await userManager.FindByIdAsync(userId);
        var follow = await userManager.FindByIdAsync(followId);

        if (user is null || follow is null)
        {
            return BadRequest("User not found");
        }
        user.Following.Add(follow);
        return Ok(user.Following);
    }
}

