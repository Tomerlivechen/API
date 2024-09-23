using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject3.Mapping
{
    public static class SocialGroupExtensionMethod
    {
        public async static Task<SocialGroup> CreateGroup(this SocialGroup group, string userId, string groupName, UserManager<AppUser> userManager)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user is not null)
            {
                group.GroupCreator = user;
                group.groupAdmin = user;
                group.GroupCreatorId = userId;
                group.AdminId = userId;
                group.Members.Add(user);
            }
            group.Name = groupName;
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
            if (editGroup.AdminEmail is not null)
            {
                var adminUser = await userManager.FindByEmailAsync(editGroup.AdminEmail);
                if (adminUser is not null)
                {
                    group.groupAdmin = adminUser;
                    group.AdminId = adminUser.Id;
                }
            }
            return group;
        }
    }
}
