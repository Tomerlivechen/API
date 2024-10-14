using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;
using System.Runtime.Intrinsics.X86;

namespace FinalProject3.Mapping
{
    public static class ChatExtensionMethod
    {
        public static string NotificatioToWho(this Chat chat)
        {
            var message = chat.messages.Last();
            var user1 = message.UserId;
            string ToNotify = chat.User1Id == user1? user1 : chat.User2Id;
            return ToNotify;
        }

        public static Message MakeMessage(this MessageNew newMessage, string userId, string userName) 
        {
            var setMessage = new Message()
            {
                ChatId = newMessage.ChatId,
                UserId = userId,
                UserName = userName,
                message = newMessage.message,
                Datetime = newMessage.Datetime,
                Id = Guid.NewGuid().ToString(),

            };
            return setMessage;

        }

        public static async Task<Chat> MakeNewChat(this ChatNew chat, UserManager<AppUser> userManager)
        {
            var user1 = await userManager.FindByIdAsync(chat.User1Id);
            var user2 = await userManager.FindByIdAsync(chat.User2Id);
            if (user1 is not null && user2 is not null)
            {
                var newChat = new Chat()
                {
                    User1Id = user1.Id,
                    User2Id = user2.Id,
                    User1Name = user1.UserName,
                    User2Name = user2.UserName,
                    messages = new List<Message>(),
                    Id = Guid.NewGuid().ToString()
                };
                newChat.Users.Add(user1);
                newChat.Users.Add(user2);
                return newChat;
            }
            return null;
        }

     

    }
}
