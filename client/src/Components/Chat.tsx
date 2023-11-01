import { useEffect, useState } from "react";
import { Routes,Route, useParams } from "react-router-dom";
import { ChatProps } from "../Types/ChatProps";
import OtherMessage from "./OtherMessage";
import MyMessage from "./MyMessage";
import rightArrow from '../right_arrow.svg'
import MessageInput from "./MessageInput";


const DUMMY_MESSAGES=[
    {
        messageText:"Hellofhgsjhsdgjskfhdflkghdsflkgjfdjkgbkbjkbgjbsdflkjbgs",
        senderName:"admin"
    },
    {
        messageText:"HelloHellofhgsjhsdgjskfhdflkghdsflkgjfdjkgbkbjkbgjbsdflkjbgs",
        senderName:"negri"
    },
    {
        messageText:"Hello",
        senderName:"negri2"
    },
]
export default function Chat({userName}:ChatProps){
    
    const params=useParams();
    const chatId=params.chatId!;
    const[messages,setMessages]=useState(DUMMY_MESSAGES);

    return(
        <>
            <div className="h-14 w-full pl-1 bg-white dark:bg-gray-900 border-s border-slate-50 dark:border-black">
                <p className="font-bold">{chatId}</p>
            </div>
            <div className=" w-full grid grid-cols-[1fr_minmax(23rem,5fr)_1fr]  ">
                <div></div>
                <div className="p-2">
                    <div className="overflow-auto grid grid-cols-1">
                        {messages.map((message)=>{
                        if(message.senderName==userName){
                            return <MyMessage  senderName={message.senderName} messageText={message.messageText}/>
                        }else{
                            return <OtherMessage senderName={message.senderName} messageText={message.messageText}/>
                        }
                        })}
                    </div>
                </div>
            </div>
            <MessageInput chatId={chatId} setMessages={setMessages} messages={messages} />

            
        </>
    )
}