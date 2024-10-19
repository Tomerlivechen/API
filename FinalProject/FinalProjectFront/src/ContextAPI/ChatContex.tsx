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
  addChat: (chatId: string) => boolean;
  chatIds: string[];
  closeChat: (chatId: string) => void;
  creatChat: (id: string) => Promise<string>;
}

const ChatContext = createContext<IChatService | null>(null);
const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatIds, setChatIds] = useState<string[]>([]);

  const addChat = (chatId: string) => {
    if (chatIds.includes(chatId)) {
      return false;
    }
    if (chatIds.length < 5) {
      setChatIds((prev) => [...prev, chatId]);
      return true;
    }
    return false;
  };

  const closeChat = (chatId: string) => {
    setChatIds((prev) => prev.filter((id) => id !== chatId));
  };

  const creatChat = async (id: string) => {
    const respons = await Chat.CreatChat(id);
    return respons.data;
  };

  return (
    <ChatContext.Provider
      value={{
        creatChat,
        addChat,
        chatIds,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
