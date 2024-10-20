using FinalProject3.Data;
using FinalProject3.DTOs;
using FinalProject3.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace FinalProject3.Mapping
{
    public static class NotificationExtensionMethod
    {
        public static async Task<Notification> AddNotification(this NotificationNew newNotification, FP3Context _context)
        {
            var notification = new Notification();
            notification.Id = Guid.NewGuid().ToString();
            notification.ReferenceId = newNotification.ReferenceId;
            notification.Seen = false;
            notification.Hidden = false;
            notification.Type = newNotification.Type;
            notification.Date= DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm");
            var Notified = await _context.Users.FindAsync(newNotification.NotifiedId);
            var Notifier = await _context.Users.FindAsync(newNotification.NotifierId);
            if (Notified != null)
            {
                notification.Notifier = Notified;
            }
            if (Notifier != null)
            {
                notification.Notifier = Notifier;
            }
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
                NotifierId = notification.Notifier.Id,
            };

            return Displaynotification;

        }

    }
}
