import { createContext, ReactNode, useEffect, useState } from "react";
import { IChat } from "../Models/ChatModels";
import { Chat } from "../Services/chat-service";

interface ChatValues {
  chatInfo: IChat | null;
  isOpen?: boolean;
}

export interface IChatContext {
  chatBoxValues: ChatValues | null;
  closeChat: () => void;
  contact: (id: string) => void;
  loading: boolean;
  toggleWindowSize: () => void;
  creatChat: (id: string) => Promise<string>;
  chatId: string;
}

export interface IChatService {
  chatIds: string[];
  selector: number;
  openNewChat: () => void;
}

const OChatContext = createContext<IChatService | null>(null);
const OChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
    setchatBoxValues({ chatInfo: null, isOpen: false });
    setChatId("");
  };

  const contact = (id: string) => {
    setChatId(id);
    setLoading(true);
  };

  return (
    <OChatContext.Provider
      value={{
        chatBoxValues,
        closeChat,
        contact,
        loading,
        creatChat,
        chatId,
      }}
    >
      {children}
    </OChatContext.Provider>
  );
};

export { OChatContext, OChatProvider };
