using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Models;
using FinalProject32.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace FinalProject3.Mapping
{
    public static class SocialGroupExtensionMethod
    {
        public async static Task<SocialGroup> CreateGroup(this SocialGroupNew NewGroup, string userId, UserManager<AppUser> userManager)
        {
            var user = await userManager.FindByIdAsync(userId);
            var group = new SocialGroup();
            if (user is not null)
            {
                group.GroupCreator = user;
                group.groupAdmin = user;
                group.GroupCreatorId = userId;
                group.AdminId = userId;
                group.Members.Add(user);
                group.Name = NewGroup.Name;
                group.Description = NewGroup.Description;
                group.Id = Guid.NewGuid().ToString();
            }
            return group;
        }
        

        public async static Task<SocialGroup> UpdateGroup(this SocialGroup group, SocialGroupEdit editGroup, UserManager<AppUser> userManager)
        {
            if (editGroup.Name is not null)
            {
                group.Name = editGroup.Name;
            }
            if (editGroup.Description is not null)
            {
                group.Description = editGroup.Description;
            }
            if (editGroup.AdminId is not null)
            {
                var adminUser = await userManager.FindByIdAsync(editGroup.AdminId);
                if (adminUser is not null)
                {
                    group.groupAdmin = adminUser;
                    group.AdminId = adminUser.Id;
                }
            }
            if (editGroup.BanerImageURL is not null)
            {
                group.BanerImageURL = editGroup.BanerImageURL;
            }
            if (editGroup.ImageURL is not null)
            {
                group.ImageURL = editGroup.ImageURL;
            }
            return group;
        }

        public async static Task<SocialGroupCard?> ToCard(this SocialGroup socialGroup, string userId, FP3Context _context)
        {
            var currentUser = await _context.Users.Include(u => u.Blocked).FirstOrDefaultAsync(u => u.Id == userId);
            if (currentUser is null || socialGroup.GroupCreator is null || socialGroup.groupAdmin is null)
            {
                return default;
            }
            var isMember =  socialGroup.Members.Where(m => m.Id == userId).First();
            bool member = false;
            if (isMember is not null) {
                member = true;
            }

            var card = new SocialGroupCard()
            {
                Id = socialGroup.Id,
                Name = socialGroup.Name,
                Description = socialGroup.Description,
                Admin = await socialGroup.groupAdmin.UsertoDisplay(_context, currentUser),
                IsMemember = member,
                BanerImageURL = socialGroup.BanerImageURL,
            };
            return card;

        }


        public async static Task<SocialGroupDisplay?> ToDisplay(this SocialGroup socialGroup, string userId ,FP3Context _context)
        {
            var currentUser = await _context.Users.Include(u => u.Blocked).Include(u => u.Following).FirstOrDefaultAsync(u => u.Id == userId);

            if (currentUser is null || socialGroup.GroupCreator is null || socialGroup.groupAdmin is null)
            {
                return default;
            }
            var display = new SocialGroupDisplay()
            {
                Id = socialGroup.Id,
                Name = socialGroup.Name,
                Description = socialGroup.Description,
                GroupCreatorId = socialGroup.GroupCreatorId,
                AdminId = socialGroup.AdminId,
                AdminName = socialGroup.groupAdmin.UserName,
            };

            var isMember = socialGroup.Members.Where(m => m.Id == userId).First();
            bool aMember = false;
            if (isMember is not null)
            {
                aMember = true;
            }
            display.IsMemember = aMember;

            return display;

        }
    }
}


