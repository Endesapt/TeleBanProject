import { useRef, useState } from "react";
import { Message } from "../Types/MessageType";
import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE } from "../Queries/Mutations";
import client from '../Configuration/ApolloClient';
import { GET_MESSAGES } from "../Queries/Queries";

export default function MessageBlock({messageText,id,isMine,sender,chatId}:Message&{isMine:boolean}){
    const styleString=isMine?"dark:bg-purple-500 bg-green-300 justify-self-end":"dark:bg-slate-800 bg-white";
    const menu= useRef<HTMLInputElement>(null);
    const [deleteMessage,{}]=useMutation(DELETE_MESSAGE);
    function handleRightClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
        e.preventDefault();
        var rect = e.currentTarget.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top; 
        menu.current!.style.top=y-7+"px";
        menu.current!.style.left=x-7+"px";
        menu.current!.classList.remove("hidden");
        menu.current!.classList.add("absolute");
   
    }
    function handleLeave(){
        menu.current!.classList.remove("absolute");
        menu.current!.classList.add("hidden");
    }
    function handleMessageDelete(){
        deleteMessage({variables:{messageId:id,conversationId:parseInt(chatId)}});
    }
    return(
    <div onContextMenu={(e)=>handleRightClick(e)}   className={styleString+" relative rounded-xl max-w-[22rem] my-2 p-2 break-words h-max "}>
        {!isMine?<p className="text-orange-400">{sender.userName}</p>:null}
        {messageText}
        <div onMouseLeave={()=>{handleLeave()}} ref={menu} className="hidden  z-10  w-56  rounded-md dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-1 " >
            <div className="py-1" role="none">
            <a onClick={handleMessageDelete}  className=" block px-4 py-2 text-sm"   >Delete Message</a>
            </div>
        </div>
    </div>
    
)
}

