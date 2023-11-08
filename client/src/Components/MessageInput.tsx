import {useEffect, useState} from 'react'
import { Cache, useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../Queries/Mutations';
import { MessagesQuery } from '../__generated__/graphql';
import client from '../Configuration/ApolloClient';
import { GET_MESSAGES } from '../Queries/Queries';

export default function MessageInput({chatId,userName}:{
    chatId:string,
    userName:string,
}){
    const [message,setMessage]=useState("");
    const[sendMessage,{error,loading,data}]=useMutation(ADD_MESSAGE,{errorPolicy:"ignore"});
    useEffect(()=>{
        if(!loading && !error && data){
            setMessage("");
        }
        
    },[loading])
    function handleKeyDown(event:React.KeyboardEvent<HTMLTextAreaElement>){
        if(event.code=="Enter" && !event.shiftKey){
            event.preventDefault();
            if(!message)return;
            sendMessage({variables:{
                id:parseInt(chatId),
                message:message
            }})
            
        }
    }
    function textAreaAdjust(el:HTMLElement){
        el.style.height = "1px";
        el.style.height = Math.min((25+el.scrollHeight),200)+"px";
    }
    return(
        <textarea value={message} onKeyDown={(e)=>{handleKeyDown(e)}}  onChange={(e)=>{setMessage(e.currentTarget.value);textAreaAdjust(e.currentTarget)}}  placeholder="Enter your message" 
            className="w-full text-slate-400 dark:bg-slate-600 bg-white  rounded-xl focus:outline-none p-2 text-lg resize-none max-w-[22rem] min-w-[400px] m-auto overflow-y-scroll" > 
        </textarea>
    )
}