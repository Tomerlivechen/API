import { IMessage } from "../../Models/ChatModels";

const MessageComponent: React.FC<IMessage> = (MessageDisplay) => {
    return(<>
    <div>

        {MessageDisplay.userName}
    </div>
    <div>

{MessageDisplay.message}
</div>
    </>)
}
export {MessageComponent}