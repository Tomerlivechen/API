import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { colors, getFlowingPosts, stringToPostDisplay } from "../Patterns";
import {
  IPostOrderProps,
  IPostSortingProps,
  PostListValues,
} from "../RoutrProtection/@types";
import { FaCircleUp } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { MdCloudSync } from "react-icons/md";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import SendPostComponent from "../../Components/SendPostComponent";
import { useSearch } from "../../CustomHooks/useSearch";
import { PostList } from "../../Components/PostList";
import { Posts } from "../../Services/post-service";
import { useLogin } from "../../CustomHooks/useLogin";
import { useUser } from "../../CustomHooks/useUser";
import { IPostDisplay } from "../../Models/Interaction";
import { IMessage } from "../../Models/ChatModels";
import {
  ISendMessageComponent,
  SendMessageComponent,
} from "../../Components/SendMessageComponent";
import { MdOpenInNew } from "react-icons/md";
import { MessageComponent } from "./MessageComponent";
import { GrClose } from "react-icons/gr";
import { HiMiniMinus } from "react-icons/hi2";

export interface IChatFrameParams {
  chatId: string;
  user1Id: string;
  user1name: string;
  user2Id: string;
  user2name: string;
  messages: IMessage[];
}

interface IChatFrameButtonProps {
  icon: React.ComponentType<{ size: number }>;
  activeHook: boolean;
  size: "min" | "mid" | "closed";
}

const ChatFrame: React.FC<IChatFrameParams | null> = (ChatFrameParams) => {
  const [size, setSize] = useState({
    min: false,
    mid: true,
    closed: false,
  });
  const [frameHeight, setFrameHeight] = useState<"hidden" | "h-96">("h-96");

  const [sendMessage, setSendMessage] = useState<ISendMessageComponent>({
    chatId: "",
  });
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  useEffect(() => {
    if (ChatFrameParams?.chatId) {
      setSendMessage({ chatId: ChatFrameParams.chatId });
      setMessages(ChatFrameParams.messages);
    }
  }, [ChatFrameParams]);

  useEffect(() => {
    if (size.min || size.closed) {
      setFrameHeight("hidden");
    }
    if (size.mid) {
      setFrameHeight("h-96");
    }
  }, [size]);

  const toggleBoolean = (size: "min" | "mid" | "closed") => {
    setSize({
      min: false,
      mid: false,
      closed: false,
      [size]: true,
    });
  };

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {!size.closed ? (
        <>
          <div
            className={`${colors.ElementFrame} h-14 p-4 pb-4 gap-4 rounded-b-xl flex justify-between items-center `}
          >
            <div className="flex justify-center items-center pl-8">
              {` ${ChatFrameParams?.user1name} , ${ChatFrameParams?.user2name}`}
            </div>
            <div className="ml-auto flex gap-4">
              <button onClick={() => toggleBoolean("min")} disabled={size.min}>
                <HiMiniMinus
                  size={24}
                  className={` ${size.min && colors.ActiveText}`}
                />
              </button>
              <button onClick={() => toggleBoolean("mid")} disabled={size.mid}>
                <MdOpenInNew
                  size={24}
                  className={` ${size.mid && colors.ActiveText}`}
                />
              </button>
              <button onClick={() => toggleBoolean("closed")}>
                <GrClose size={24} />
              </button>
            </div>
          </div>
          <div
            ref={scrollableDivRef}
            className={`${colors.ElementFrame} ${frameHeight}   pb-4 gap-4 rounded-b-xl overflow-y-auto`}
          >
            {messages &&
              messages.map((message) => (
                <MessageComponent key={message.id} {...message} />
              ))}
          </div>
          {size.mid && <SendMessageComponent {...sendMessage} />}
        </>
      ) : null}
    </>
  );
};

export { ChatFrame };
