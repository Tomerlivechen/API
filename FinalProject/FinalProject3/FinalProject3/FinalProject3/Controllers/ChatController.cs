using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Mapping;
using FinalProject3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace FinalProject3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController(FP3Context context, UserManager<User> userManager) : ControllerBase
    {
        private readonly FP3Context _context = context;

        [HttpGet("ByChatId/{ChatID}")]
        public async Task<ActionResult<Chat>> GetChatID(string ChatId)
        {
            var chat = await _context.Chat.FindAsync(ChatId);

            if (chat == null)
            {
                return NotFound();
            }

            return Ok(chat);
        }

        [HttpPost("Message")]
        public async Task<ActionResult> SendMessage(string sendingUserID, string recevengUserID ,  string message , string ChatId)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(sendingUserID) || string.IsNullOrEmpty(recevengUserID) || string.IsNullOrEmpty(message))
            {
                return BadRequest(ModelState);
            }
            Chat? chat = await _context.Chat.FindAsync(ChatId);
            var sendingUser = await userManager.FindByIdAsync(sendingUserID);
            if (sendingUser is null) {
                return NotFound(sendingUserID);
            }
            var recevengUser = await userManager.FindByIdAsync(recevengUserID);
            if (recevengUser is null)
            {
                return NotFound(recevengUserID);
            }
            if (chat == null)
            {
                chat = new Chat();
                chat.MakeNewChat(sendingUser, recevengUser);
                await _context.Chat.AddAsync(chat);
                await _context.SaveChangesAsync();

            }
            Message newMessage = new Message();
            newMessage.MakeMessage(chat.Id, sendingUser, message);
            await _context.Message.AddAsync(newMessage);
            chat.messages.Add(newMessage);
            await _context.SaveChangesAsync();
            return Ok(newMessage);
        }
    }
}
