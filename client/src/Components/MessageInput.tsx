import {useEffect, useState} from 'react'
import { MessageInputProps } from '../Types/MessageInputProps';

export default function MessageInput({chatId,setMessages,messages}:MessageInputProps){
    const [message,setMessage]=useState("");
    useEffect(()=>{
        document.addEventListener("keydown", handleKeyDown)
    },[])
    function handleKeyDown(event:KeyboardEvent){
        if(event.code=="Enter" && event.shiftKey){
            setMessages((messages)=>{
                return [...messages,{
                    messageText:"AHAHAHAHAH",
                    senderName:"Name"
                }]
            })
        }
    }
    function textAreaAdjust(el:HTMLElement){
        el.style.height = "1px";
        el.style.height = (25+el.scrollHeight)+"px";
    }
    return(
        <textarea value={message}  onChange={(e)=>{setMessage(e.currentTarget.value);textAreaAdjust(e.currentTarget)}}  placeholder="Enter your message" 
            className="w-full overflow-hidden text-slate-400 dark:bg-slate-600 bg-white  rounded-xl focus:outline-none p-2 text-lg resize-none max-w-[22rem] min-w-[400px] m-auto" > 
        </textarea>
    )
}