import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_CONVERSATION } from "../Queries/Mutations";
import client from "../Configuration/ApolloClient";
import { GET_CONVERSATIONS } from "../Queries/Queries";
export default function NavBlock({chat}:{chat:{
    __typename?: "Conversation" | undefined;
    id: number;
    title: string;
    conversationGuid: any;
    messages: {
        __typename?: "Message" | undefined;
        messageText: string;
        senderId: number;
    }[]}}){
        const [deleteConversation,{loading,error}]=useMutation(DELETE_CONVERSATION,{variables:{id:chat.id}});
        const menu= useRef<HTMLInputElement>(null);
        const chatLink=useRef<HTMLDivElement>(null);
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
            chatLink.current!.classList.add("hidden");
        }
        function handleLinkShow(){
            chatLink.current!.classList.remove("hidden");
        }
        function handleDeleteGroup(){
            deleteConversation();
            client.cache.updateQuery({query:GET_CONVERSATIONS},(data)=>{
                const conversations=[...data?.conversations!];
                conversations.splice(conversations.findIndex(c=>c.id==chat.id),1);
                return {
                    conversations:conversations
                }
            })
        }
        return(<div onContextMenu={(e)=>handleRightClick(e)}  key={chat.id} className="rounded-lg hover:bg-slate-200 dark:hover:bg-gray-500 p-1 flex w-full relative"  >
            <Link to={`/k/${chat.id}`} className=" block truncate w-full">
                <p className="font-bold truncate">{chat.title}</p>
                {chat.messages?.length ? <p className="truncate text-gray-400">
                    <span className="truncate text-black dark:text-slate-300">{chat.messages[0].senderId}: </span>
                    {chat.messages[0].messageText}
                </p> : null}
            </Link>
            <div onMouseLeave={() => { handleLeave() }} ref={menu} className="hidden  z-10    rounded-md dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-1 " >
                <div className="py-1" role="none">
                    <a onClick={handleDeleteGroup} className=" block px-4 py-2 text-sm cursor-pointer"   >Удалить группу</a>
                    <a onClick={handleLinkShow} className=" block px-4 py-2 text-sm cursor-pointer"   >Добавить в группу</a>
                    <div ref={chatLink} className="px-4 py-2 text-sm hidden  break-words" >Ссылка: http://localhost:3000/enterChat/{chat.conversationGuid}</div>
                </div>
            </div>
        </div>)
}