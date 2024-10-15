using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController(FP3Context context, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;


        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreatNewChat (string user2id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
            {
                return Unauthorized();
            }
            ChatNew chat = new ChatNew()
            {
                User1Id = userId,
                User2Id = user2id,
            };
            var upChat = await chat.MakeNewChat(userManager);
            if (upChat is null)
            {
                return BadRequest();
            }
            await _context.Chat.AddAsync(upChat);
            var user1 = await _context.Users.FindAsync(userId);
            var user2 = await _context.Users.FindAsync (user2id);
            if (user1 is null || user2 is null)
            {
                return BadRequest();
            }
            user1.Chats.Add(upChat);
            user2.Chats.Add(upChat);
            await _context.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("ByChatId/{ChatID}")]
        [Authorize]
        public async Task<ActionResult<Chat>> GetChatID(string ChatId)
        {
            var chat = await _context.Chat.Include(c => c.messages).FirstOrDefaultAsync(c => c.Id == ChatId);
            if (chat == null)
            {
                return NotFound();
            }
            return Ok(chat.ToDisplay());
        }

        [HttpPost("Message")]
        [Authorize]
        public async Task<ActionResult> SendMessage([FromBody] MessageNew newmesage)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
            {
                return Unauthorized();
            }
            var userName = User.FindFirstValue(ClaimTypes.Name);
            if (userName is null)
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _context.Users.Include(u => u.Chats).FirstOrDefaultAsync(u => u.Id == userId);
            Message newMessage = newmesage.MakeMessage(userId, userName);
            var chat = await _context.Chat.FindAsync(newmesage.ChatId);
            if (chat is null)
            {
                return BadRequest();
            }
            await _context.Message.AddAsync(newMessage);
            chat.messages.Add(newMessage);
            await _context.SaveChangesAsync();
            return Ok(newMessage);
        }
    }
}
