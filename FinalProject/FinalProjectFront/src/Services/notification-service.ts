
import { request } from "../Utils/Axios-Interceptor";

const notificationURL = "/Notification";



  const UpdateNotification = (id: string, hide: boolean) =>
    request({
      url: `${notificationURL}/Update/${id}`,
      method: "Put",
      data: {input:hide},
    });

  export const Notification = {UpdateNotification}