import { request } from "../Utils/Axios-Interceptor";


export interface INewMessage {
    ChatId: string;
    message: string;
}

const ChatURL = "/Chat";


const sendMessage = (newMessage: INewMessage) =>
    request({
      url: `${ChatURL}/Message/`,
      method: "POST",
      data: newMessage,
  });


  export const Chat = {sendMessage}