using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using FinalProject32.Mapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Threading.Channels;



namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialGroupController(FP3Context context, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialGroup>>> GetGroups()
        {
            return await _context.Group.Include(g => g.Members).ToListAsync();
        }
        [HttpGet("ById/{GroupId}")]
        public async Task<ActionResult<SocialGroup>> GetGroupbyId(string GroupId)
        {
            return await _context.Group.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == GroupId);
        }

        [HttpGet("GetMembers/{GroupId}")]
        public async Task<ActionResult<IEnumerable<AppUserDisplay>>> GetMembersByGroupbyId(string GroupId)
        {
            var group = await _context.Group.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == GroupId);
            if (group is null)
            {
                return NotFound("Gruop not found");
            }
                var members = group.Members.Select(u => u.UsertoDisplay()).ToList();
                return members;
            
                
        }

        [HttpPost]
        public async Task<ActionResult<SocialGroup>> PostGroup(string groupId, string groupName) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            SocialGroup group = new SocialGroup();
            group.CreateGroup(groupId, groupName, userManager);
            await _context.Group.AddAsync(group);
            return group;
        }

        [HttpPut("AddMember/{UserId}")]
        public async Task<ActionResult> AddMember(string groupId, string UserId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var group = await _context.Group.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == groupId);
            if (group is null)
            {
                return NotFound("Group Not Found");
            }
            var user = await userManager.FindByIdAsync(UserId);
            if (user is null) 
            {
                return NotFound("User Not Found");
            }
            if (group.Members.Any(m => m.Id == UserId))
            {
                return Conflict("User is already a member of this group.");
            }
            user.SocialGroups.Add(group);
            group.Members.Add(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
               return Conflict(ex);
            }

            return Ok(group);

        }

        [HttpPut("RemoveMember/{UserId}")]
        public async Task<ActionResult> RemoveMember(string groupId, string UserId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var group = await _context.Group.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == groupId);
            if (group is null)
            {
                return NotFound("Group Not Found");
            }
            var user = await userManager.FindByIdAsync(UserId);
            if (user is null)
            {
                return NotFound("User Not Found");
            }
            if (!group.Members.Any(m => m.Id == UserId))
            {
                return Conflict("User not a member of this group.");
            }
            group.Members.Remove(group.Members.First(m => m.Id == UserId));
            if (user.SocialGroups.Contains(group))
            {
                user.SocialGroups.Remove(group);
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return Conflict(ex);
            }
            return Ok(group);
        }
        [HttpPut("EditGroup")]
        public async Task<ActionResult> EditGroup(SocialGroupEdit editGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var group = await _context.Group.FindAsync(editGroup.Id);
            if (group is null)
            {
                return NotFound("Group Not Found");
            }
            group.UpdateGroup(editGroup, userManager);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return Conflict(ex);
            }
            return Ok(group);
        }

    }
}
