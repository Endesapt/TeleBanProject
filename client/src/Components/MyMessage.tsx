import { MessageProps } from "../Types/MessageType";

export default function MyMessage({messageText,senderName}:MessageProps){
    return(
    <div className="dark:bg-purple-500 bg-green-300 rounded-xl max-w-[22rem] my-2 p-2 break-words justify-self-end h-max ">
        {messageText}
    </div>
)
}

