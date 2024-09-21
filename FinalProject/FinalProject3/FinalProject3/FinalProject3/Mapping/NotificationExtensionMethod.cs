using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject3.Mapping
{
    public static class NotificationExtensionMethod
    {
        public static Notification AddNotification(this Notification notification,string type, string ActionId, User user)
        {
            notification.Id = Guid.NewGuid().ToString();
            notification.ReferenceId = ActionId;
            notification.Seen = false;
            notification.Hidden = false;
            notification.Type = type;
            notification.Date= DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm");
            notification.user = user;

            return notification;
        }

    }
}
