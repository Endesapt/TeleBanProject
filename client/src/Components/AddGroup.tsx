import { useEffect, useRef, useState } from 'react';
import {ReactComponent as Pen} from '../pen.svg';
import { CREATE_GROUP } from '../Queries/Mutations';
import { useMutation } from '@apollo/client';
import { Conversation } from '../Types/Conversation';
import client from '../Configuration/ApolloClient';
import { GET_CONVERSATIONS } from '../Queries/Queries';
export default function AddGroup({chats}:{chats:any}){
    const menu= useRef<HTMLInputElement>(null);
    const [addGroup,groupData]=useMutation(CREATE_GROUP);
    useEffect(()=>{
        if(!groupData.loading && groupData.data){
            const c=groupData.data.createConversation;
            client.cache.updateQuery({query:GET_CONVERSATIONS},(data)=>({
                conversations:[...data?.conversations!,{
                    id:c.id,
                    title:c.title,
                    messages:[],
                    conversationGuid:c.conversationGuid,
                    creatorId:c.creatorId
                }]
            }))
        }
    },[groupData.loading])
    const [groupTitle,setGroupTitle]=useState("");
    function handleClick(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
        if(menu.current!.classList.contains("absolute"))return;
        var rect = e.currentTarget.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top; 
        menu.current!.style.top=y-40+"px";
        menu.current!.style.left=x-40+"px";
        menu.current!.classList.remove("hidden");
        menu.current!.classList.add("absolute");
   
    }
    function handleLeave(){
        menu.current!.classList.remove("absolute");
        menu.current!.classList.add("hidden");
    }
    function handleCreateGroup(){
        addGroup({variables:{title:groupTitle}});
        handleLeave();
    }
    function handleKeyDown(event:React.KeyboardEvent<HTMLInputElement>){
        if(event.code=="Enter" && !event.shiftKey){
            event.preventDefault();
            handleCreateGroup()
        }
    }
    return(
    <div onClick={(e)=>handleClick(e)} className=" flex items-center justify-center w-14 h-14 rounded-full bg-cyan-400 dark:bg-indigo-500 absolute bottom-6 right-6">
        <Pen width="30px" height="30px"/>
        <div onMouseLeave={handleLeave} ref={menu} className="hidden  z-10  w-56  rounded-md dark:bg-slate-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-1 " >
            <div className="py-1" role="none">
            <input value={groupTitle} onKeyDown={(e)=>{handleKeyDown(e)}} onChange={(e)=>setGroupTitle(e.currentTarget.value)} className="block px-4 py-2 text-sm text-slate-400 dark:bg-slate-600 bg-white  rounded-xl focus:outline-none"/>
            <button onClick={handleCreateGroup}className=" block px-4 py-2 text-sm"   >Create Group</button>
            </div>
        </div>
    </div>
)
}