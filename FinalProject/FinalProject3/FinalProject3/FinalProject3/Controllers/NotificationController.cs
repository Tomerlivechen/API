using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController(FP3Context context, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;
        [HttpPost]
        public async Task<ActionResult> PostNotification(string type, string ActionId)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(ActionId))
            {
                return BadRequest(ModelState);
            }
            Notification notification = new Notification();
            AppUser? notified = null;
            Interaction? interaction = null;
            interaction = await _context.Comment.FindAsync(ActionId);
            if (interaction is null)
            {
                interaction = await _context.Post.FindAsync(ActionId);
            }
            if (interaction is null)
            {
                return NotFound("Comment not found");
            }
                switch (type)
            {
                case "Comment":
                    notified = await userManager.FindByIdAsync(interaction.Author.Id);
                    break;
                case "Message":
                    Chat? chat = await _context.Chat.FindAsync(ActionId);
                    if (chat == null) return NotFound("Chat not found");
                    notified = await userManager.FindByIdAsync(chat.NotificatioToWho());
                    break;
                default:
                    return BadRequest("Invalid notification type.");
            }
            if (notified is null)
            {
                return NotFound("User Not found");
            }
            notification.AddNotification(type, ActionId, notified);
            await _context.Notification.AddAsync(notification);
            notified.Notifications.Add(notification);
            await userManager.UpdateAsync(notified);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return Problem(ex.Message);
            }

            return Ok(new { notified.Id, ActionId });
        }

        [HttpPut]
        public async Task<ActionResult> EditNotification(string NotificationId, bool seen = true, bool hide = false)
        {
            var notification = await _context.Notification.FindAsync(NotificationId);
            if (notification == null)
            {
                return NotFound();
            }
            if (seen)
            {
                notification.Viewed();
            }
            if (hide)
            {
                notification.Hide();
            }

            _context.Entry(notification).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Conflict(new { error ="A concurrency conflict occurred. The record was modified by another user." ,ex});
            }
            catch (DbUpdateException ex)
            {
                return Problem(ex.Message);
            }

            return Ok(notification);

        }
        private bool NotificationExists(string id)
        {
            return _context.Notification.Any(e => e.Id == id);
        }
    }
}
