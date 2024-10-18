import { createContext, ReactNode, useEffect, useState } from "react";
import { IChat } from "../Models/ChatModels";
import { Chat } from "../Services/chat-service";

interface ChatValues {
  chatInfo: IChat | null;
  isOpen?: boolean;
  windowSize?: "min" | "mid" | "closed";
}

export interface IChatContext {
  chatBoxValues: ChatValues | null;
  closeChat: () => void;
  contact: (id: string) => void;
  loading: boolean;
  toggleWindowSize: () => void;
  creatChat: (id: string) => Promise<string>;
}

const ChatContext = createContext<IChatContext | null>(null);
const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatId, setChatId] = useState<string>("");
  const [chatValues, setChatValues] = useState<IChat | null>(null);
  const [chatBoxValues, setchatBoxValues] = useState<ChatValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getChatValues = async () => {
    if (chatId) {
      await Chat.getChat(chatId).then((respons) => setChatValues(respons.data));
    }
  };

  const creatChat = async (id: string) => {
    const respons = await Chat.CreatChat(id);
    setChatId(respons.data);
    return respons.data;
  };

  useEffect(() => {
    if (chatValues) {
      setchatBoxValues({
        chatInfo: chatValues,
        isOpen: true,
        windowSize: "mid",
      });
    }
  }, [chatValues]);

  useEffect(() => {
    if (chatId) {
      getChatValues();
    }
  }, [chatId]);

  useEffect(() => {
    if (chatBoxValues?.isOpen) {
      setLoading(false);
    }
  }, [chatBoxValues?.isOpen]);

  const closeChat = () => {
    setchatBoxValues({ chatInfo: null, isOpen: false, windowSize: "closed" });
    setChatId("");
  };

  const contact = (id: string) => {
    setChatId(id);
    setLoading(true);
  };

  const toggleWindowSize = () => {
    if (chatBoxValues?.windowSize == "mid")
      setchatBoxValues((prev) => ({
        ...prev,
        windowSize: "min",
        chatInfo: prev?.chatInfo ?? null,
      }));
    if (chatBoxValues?.windowSize == "min")
      setchatBoxValues((prev) => ({
        ...prev,
        windowSize: "mid",
        chatInfo: prev?.chatInfo ?? null,
      }));
  };

  return (
    <ChatContext.Provider
      value={{
        chatBoxValues,
        closeChat,
        contact,
        loading,
        toggleWindowSize,
        creatChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
