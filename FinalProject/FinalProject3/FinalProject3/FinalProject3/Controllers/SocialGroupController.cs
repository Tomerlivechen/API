using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using FinalProject32.Mapping;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Channels;



namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialGroupController(FP3Context context, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<SocialGroupCard>>> GetGroups()

        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId is null)
            {
                return Unauthorized();
            }
            var SG = await _context.Group.Include(g => g.Members).ToListAsync();
            var SGCards = await Task.WhenAll(SG.Select(sg => sg.ToCard(currentUserId,_context ,userManager)).ToList());
            return Ok(SGCards);
        }
        [HttpGet("ById/{GroupId}")]
        public async Task<ActionResult<SocialGroup>> GetGroupbyId(string GroupId)
        {
            var fullGroup = await _context.Group.Include(g => g.Members).Include(g => g.Posts).FirstOrDefaultAsync(g => g.Id == GroupId);
            return Ok(fullGroup);
        }

        [HttpGet("GetMembers/{GroupId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AppUserDisplay>>> GetMembersByGroupbyId(string GroupId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId is null)
            {
                return Unauthorized();
            }
            var currentUser = await userManager.FindByIdAsync(currentUserId);
            if (currentUser is null)
            {
                return NotFound();    
            }
            var group = await _context.Group.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == GroupId);
            if (group is null)
            {
                return NotFound("Gruop not found");
            }
                var members = group.Members.ToList();
            var memberUsersDisplay = await Task.WhenAll(members.Select(u => u.UsertoDisplay(userManager, _context, currentUser)));


            return Ok(memberUsersDisplay);
            
                
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<SocialGroup>> PostGroup(SocialGroupNew groupNew) 
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId is null)
            {
                return Unauthorized();
            }
            var currentUser = await userManager.FindByIdAsync(currentUserId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var group= await groupNew.CreateGroup(currentUserId, userManager);
            await _context.Group.AddAsync(group);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return Conflict(ex);
            }

            return Ok(await group.ToDisplay(currentUserId, _context, userManager));
        }

        [HttpPut("AddMember/{groupId}")]
        [Authorize]
        public async Task<ActionResult> AddMember(string groupId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId is null)
            {
                return Unauthorized();
            }
            var currentUser = await userManager.FindByIdAsync(currentUserId);
            if (currentUser is null)
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var group = await _context.Group.Include(g => g.Members).FirstOrDefaultAsync(g => g.Id == groupId);
            if (group is null)
            {
                return NotFound("Group Not Found");
            }
            var user = await userManager.FindByIdAsync(currentUserId);
            if (user is null) 
            {
                return NotFound("User Not Found");
            }
            if (group.Members.Any(m => m.Id == currentUserId))
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
            await group.UpdateGroup(editGroup, userManager);

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
