using APIExcitsize.Authenitcation;
using APIExcitsize.DTOs.AppUser;
using APIExcitsize.Extensions;
using APIExcitsize.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CardAPIHomwWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJWTTokenService jWTTokenService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AppUserRegister user)
        {
            AppUser appUser = user.toModel();
            var result = await userManager.CreateAsync(appUser, user.Password);
            if (result.Succeeded)
            {

                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AppUserLogin login)
        {
            var user = await userManager.FindByEmailAsync(login.Email);
            if (user is null)
            {
                return Unauthorized();
            }
            var LoggedIn = await userManager.CheckPasswordAsync(user, login.Password);
            // makes cookies
         //   var result = await signInManager.PasswordSignInAsync(login.Email,login.Password, false, false);
            
            if (LoggedIn)
            {
                var token = await jWTTokenService.CreateToken(user);
                return Ok(token);
            }else
            {
                return Unauthorized();
            }
        }
    }
}
