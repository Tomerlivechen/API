import React, { useEffect, useState } from "react";
import { useUser } from "../../CustomHooks/useUser";
import { INotificationDisplay } from "../../Modals/NotificationMedels";
import { Notification } from "../../Services/notification-service";
import { NotificationObject } from "./NotificationObject";

const NotificationList = () => {
const UserContext = useUser()
const [notifications, setNotifications] = useState<INotificationDisplay[]|null>(null);
const [loading, setLoading] = useState(true);
const getNotificatins = async () => { 
    const noteList = await Notification.GetNotification()
    setNotifications(noteList)
}



useEffect(()=>{
    getNotificatins()
    },[]);


useEffect(()=>{
if (notifications){
    setLoading(false)
}

},[notifications]);

return (
    <>
{(!loading && notifications) && (
  <div>
    {notifications.map((notification) => (
      <div key={notification.id}>
        <NotificationObject NotificationData={notification} />
      </div>
    ))}
  </div>
)}
    </>
)

  }

export {NotificationList}