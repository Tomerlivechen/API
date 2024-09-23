using FinalProject3.Models;

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

        public static Message MakeMessage(this Message message, string ChatId, AppUser user, string script) 
        {
            message.ChatId = ChatId;
            message.message = script;
            message.UserId = user.Id;
            message.UserName = user.UserName;
            message.Id = Guid.NewGuid().ToString();
            return message;

        }

        public static Chat MakeNewChat(this Chat chat, AppUser user1, AppUser user2)
        {
            chat.User2Id = user2.Id;
            chat.User1Id = user1.Id;
            chat.User2Name = user2.UserName;
            chat.User1Name = user1.UserName;
            chat.Id = Guid.NewGuid().ToString();

            return chat;
        }

    }
}
