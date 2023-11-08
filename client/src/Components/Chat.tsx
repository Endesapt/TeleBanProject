import { useEffect, useRef, useState } from "react";
import { Routes,Route, useParams } from "react-router-dom";
import MessageBlock from "./MessageBlock";
import MessageInput from "./MessageInput";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../Queries/Queries";
import { CHAT_SUBSCRIPTIONS, DELETE_MESSAGE_SUBSCRIPTION } from "../Queries/Subscriptions";



export default function Chat({userName,userId}:{userName:string,userId:number}){
    
    const params=useParams();
    const chatId=params.chatId!;
    const{loading,error,data}=useQuery(GET_MESSAGES,{variables:{id:parseInt(chatId)}});
    const[messages,setMessages]=useState(data?.messages);
    useEffect(()=>{
        if(!loading && !error){
            setMessages(data?.messages)
        }
    },[loading,data?.messages,messages])


 

    return(
        <>
            <div className="h-14 w-full pl-1 bg-white dark:bg-gray-900 border-s border-slate-50 dark:border-black overflow-auto">
                <p className="font-bold">{chatId}</p>
            </div>
            <div id="chatScroller"className=" w-full grid grid-cols-[1fr_minmax(23rem,5fr)_1fr] h-full overflow-scroll  ">
                <div></div>
                <div className="p-2  max-h-full">
                    <div className="grid grid-cols-1 relative">
                        {messages?.map((message)=>{
                        if(message.sender.userName==userName){
                            return <MessageBlock key={message.id} chatId={chatId} isMine={true} {...message}/>
                        }else{
                            return <MessageBlock key={message.id} chatId={chatId} isMine={false} {...message}/>
                        }
                        })}
                    </div>
                </div>
            </div>
            <MessageInput userName={userName} chatId={chatId}   />

            
        </>
    )
}