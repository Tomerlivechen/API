using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FinalProject32.Mapping
{
    public static class UserExtensionMethodcs
    {
        public static AppUser RegisterToUser(this AppUserRegister register)
        {
            var user = new AppUser()
            {
                Email = register.Email,
                UserName = register.UserName,
                Prefix = register.Prefix,
                First_Name = register.First_Name,
                Last_Name = register.Last_Name,
                Pronouns = register.Pronouns,
                ImageURL = register.ImageURL,
                PermissionLevel = register.PermissionLevel,
            };
            return user;

        }

        public static async Task<AppUserDisplay> UsertoDisplay(this AppUser user, UserManager<AppUser> userManager, FP3Context _context, AppUser currentUser)
        {
            var display = new AppUserDisplay()
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                UserName = user.UserName ?? string.Empty,
                Bio = user.Bio ?? string.Empty,
                Prefix = user.Prefix,
                First_Name = user.First_Name,
                Last_Name = user.Last_Name,
                ImageURL = user.ImageURL,
                Pronouns = user.Pronouns,
                BanerImageURL = user.BanerImageURL,
                HideBlocked = user.HideBlocked,
                HideEmail = user.HideEmail,
                HideName = user.HideName,
                LastActive = user.LastActive,
            };

            // Check if the current user is following this user
            if (currentUser.FollowingId.Contains(user.Id))
            {
                display.Following = true;
            }

            // Check if the current user has blocked this user
            if (currentUser.BlockedId.Contains(user.Id))
            {
                display.Blocked = true;
            }

            // Load users with chat and blocked lists (asynchronously)
            var userFull = await _context.Users.Include(u => u.Chats)
                .Include(u => u.Blocked)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            // Check if this user has blocked the current user
            if (userFull is not null && userFull.Blocked.Any(u => u.Id == currentUser.Id))
            {
                display.BlockedYou = true;
            }

            // Check if there is an existing chat with the user
            var chatWithUser = currentUser.Chats
                .FirstOrDefault(c => c.Users.Contains(user));

            if (chatWithUser != null)
            {
                display.ChatId = chatWithUser.Id;
            }
            return display;
        }
    }

    
}
