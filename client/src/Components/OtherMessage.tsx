import { MessageProps } from "../Types/MessageType";

export default function OtherMessage({messageText,senderName}:MessageProps){
    return(
        <div className="dark:bg-slate-800 bg-white rounded-xl max-w-[22rem] my-2 p-2 break-words h-max">
            {senderName?<p className="text-orange-400">{senderName}</p>:null}
            {messageText}
        </div>
    )
}