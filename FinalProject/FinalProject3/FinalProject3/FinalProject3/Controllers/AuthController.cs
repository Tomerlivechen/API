﻿using FinalProject3.Auth;
using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Models;
using FinalProject32.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinalProject3.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(FP3Context context, ILogger<AuthController> logger, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IJwtTokenService jwtTokenService, IOptions<JWTSettings> options) : Controller
{
    private readonly FP3Context _context = context;
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AppUserRegister register)
    {

        if (ModelState.IsValid)
        {
            AppUser user = register.RegisterToUser();
            var result = await userManager.CreateAsync(user, register.Password);
            if (result.Succeeded)
            {
                await signInManager.SignInAsync(user, isPersistent: true);
                AppUserLogin userLogin = new AppUserLogin(register.Email, register.Password);
                await LogIn(userLogin);
                return Ok(result);
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("Register Failed", error.Description);
            }
        }

        return BadRequest(ModelState);
    }

    [HttpGet("GetUsers")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<AppUserDisplay>>> GetUsers()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var users = await userManager.Users.Select(u => u.UsertoDisplay()).ToListAsync();
        var usersFull = await _context.Users.Include(u => u.Blocked).ToListAsync();
        foreach (AppUserDisplay userDisplay in users)
        {
            var isFollowed = user.FollowingId.Find(u => u == userDisplay.Id);
            if (isFollowed is not null)
            {
                userDisplay.Following = true;
            }
            var Blocked = user.BlockedId.Find(u => u == userDisplay.Id);
            if (Blocked is not null)
            {
                userDisplay.Blocked = true;
            }
            var setUser = usersFull.FirstOrDefault(u => u.Id == userDisplay.Id);
            if (setUser is not null) 
            {
                var isBlocked = setUser.Blocked.Find(u => u.Id == user.Id);
                if (isBlocked is not null)
                {
                    userDisplay.BlockedYou = true;
                }
            }
        }
        user.LastActive = DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm");
        await userManager.UpdateAsync(user);
        return Ok(users);
    }


    [HttpGet("ById/{userId}")]
    [Authorize]
    public async Task<ActionResult<AppUserDisplay>> GetUser(string userId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
            var user = await userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user is not null)
        {
            return Ok(user.UsertoDisplay());
        }

            return NotFound("User Not Found");
        
    }

    [HttpPost("GetFullUser")]
    [Authorize]
    public async Task<ActionResult<AppUser>> GetFullUser([FromBody] string id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var user = await userManager.Users.Include(u => u.Following).Include(u => u.Posts).FirstOrDefaultAsync(u => u.Id == id);
        if (user is not null)
        {
            return Ok(user);
        }

        return NotFound("User Not Found");

    }


    [HttpPost("login")]
    public async Task<IActionResult> LogIn([FromBody] AppUserLogin login, string ReturnUrl = "/")
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

    [HttpGet("validateToken")]
    [Authorize]
    public IActionResult ValidateToken()
    {
            return Ok();
    }




        [HttpGet("Logout")]
    public async Task<IActionResult> LogOut()
    {
        await signInManager.SignOutAsync();
        return Redirect("/");
    }

    [HttpPut("manage")]
    [Authorize]
    public async Task<ActionResult<AppUserDisplay>> Manage([FromBody] AppUserEdit manageView)
    {

        var user = await userManager.GetUserAsync(User);
        bool changed = false;
        if (user == null)
        {
            return Redirect("/");
        }
        if (!string.IsNullOrEmpty(manageView.oldPassword)  && !string.IsNullOrEmpty(manageView.newPassword) )
        {
            var passwordChange = await userManager.ChangePasswordAsync(user, manageView.oldPassword, manageView.newPassword);
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
        if (!string.IsNullOrEmpty(manageView.userName))
        {
            user.UserName = manageView.userName;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.prefix))
        {
            user.Prefix = manageView.prefix;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.first_Name))
        {
            user.First_Name = manageView.first_Name;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.last_Name))
        {
            user.Last_Name = manageView.last_Name;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.pronouns))
        {
            user.Pronouns = manageView.pronouns;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.imageURL))
        {
            user.ImageURL = manageView.imageURL;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.permissionLevel))
        {
            user.PermissionLevel = manageView.permissionLevel;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.bio))
        {
            user.Bio = manageView.bio;
            changed = true;
        }
        if (!string.IsNullOrEmpty(manageView.banerImageURL) )
        {
            user.BanerImageURL = manageView.banerImageURL;
            changed = true;
        }
        if (manageView.hideEmail != user.HideEmail)
        {
            user.HideEmail = manageView.hideEmail;
            changed = true;
        }
        if (manageView.hideName != user.HideName)
        {
            user.HideName = manageView.hideName;
            changed = true;
        }
        if (manageView.hideBlocked != user.HideBlocked)
        {
            user.HideBlocked = manageView.hideBlocked;
            changed = true;
        }
        if (changed)
        {
            await userManager.UpdateAsync(user);
            return Ok(user.UsertoDisplay());
        }
        ModelState.AddModelError("No Changes", "No changes made");
        return Ok(user.UsertoDisplay());
    }

    [HttpPut("follow")]
    [Authorize]
    public async Task<IActionResult> Follow([FromBody] AppUserIdRequest followId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Console.WriteLine(ClaimTypes.NameIdentifier, userId);
        if (!ModelState.IsValid)
        {
            return BadRequest(new { ModelState, userId });
        }

        var user = await userManager.FindByIdAsync(userId);
        var follow = await userManager.FindByIdAsync(followId.Id);

        if (user is null || follow is null)
        {
            return BadRequest("User not found");
        }
        user.Following.Add(follow);
        if (user.FollowingId is null)
        {
            user.FollowingId = new List<string>();
        }
        user.FollowingId.Add(follow.Id.ToString());

        var result = await userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest("Failed to update user following list.");
        }
        return Ok(user.FollowingId);
    }

    [HttpPut("unfollow")]
    [Authorize]
    public async Task<IActionResult> unFollow([FromBody] AppUserIdRequest unfollowId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _context.Users.Include(u => u.Following).FirstOrDefaultAsync(u => u.Id == userId);
        var unfollow = await userManager.FindByIdAsync(unfollowId.Id);

        if (user is null || unfollow is null)
        {
            return BadRequest("User not found");
        }
        user.FollowingId.Remove(unfollow.Id);
        user.Following.Remove(unfollow);
        var result = await userManager.UpdateAsync(user);
        await _context.SaveChangesAsync();
        if (!result.Succeeded)
        {
            return BadRequest("Failed to update user following list.");
        }
        return Ok(user.FollowingId);
    }


    [HttpPut("block")]
    [Authorize]
    public async Task<IActionResult> Block([FromBody] AppUserIdRequest toBlock)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _context.Users.Include(u => u.Blocked).FirstOrDefaultAsync(u => u.Id == userId);
        var BlockUser = await userManager.FindByIdAsync(toBlock.Id);

        if (user is null || BlockUser is null)
        {
            return BadRequest("User not found");
        }
        user.BlockedId.Add(toBlock.Id);
        user.Blocked.Add(BlockUser);
        var result = await userManager.UpdateAsync(user);
        await _context.SaveChangesAsync();
        if (!result.Succeeded)
        {
            return BadRequest("Failed to update user block list.");
        }
        return Ok(user.BlockedId);
    }
    [HttpPut("unblock")]
    [Authorize]
    public async Task<IActionResult> UnBlock([FromBody] AppUserIdRequest unBlock)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _context.Users.Include(u => u.Blocked).FirstOrDefaultAsync(u => u.Id == userId);
        var BlockedUser = await userManager.FindByIdAsync(unBlock.Id);

        if (user is null || BlockedUser is null)
        {
            return BadRequest("User not found");
        }
        var deleteBlockedId = user.BlockedId.Remove(unBlock.Id);
        var deleteBlocked = user.Blocked.Remove(BlockedUser);
        var result = await userManager.UpdateAsync(user);
        await _context.SaveChangesAsync();
        if (!result.Succeeded && deleteBlockedId && deleteBlocked)
        {
            return BadRequest("Failed to update user block list.");
        }
        return Ok(user.BlockedId);
    }


}

