using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject3.Mapping
{
    public static class NotificationExtensionMethod
    {
        public static Notification AddNotification(this Notification notification,string type, string ActionId, AppUser user)
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

        public static NotificationDisplay toDisplay(this Notification notification)
        {
            NotificationDisplay Displaynotification = new NotificationDisplay()
            {
                Id = notification.Id,
                ReferenceId = notification.ReferenceId,
                Seen = notification.Seen,
                Hidden = notification.Hidden,
                Type = notification.Type,
                Date = notification.Date,
                userid = notification.user.Id,
            };

            return Displaynotification;

        }

    }
}
