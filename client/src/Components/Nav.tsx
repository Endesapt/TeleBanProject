import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useQuery,gql} from "@apollo/client";
import { Conversation } from "../Types/Conversation";
import AddGroup from "./AddGroup";
import { GET_CONVERSATIONS, GET_MESSAGES } from "../Queries/Queries";
import { notificationCount } from "../Configuration/cache";
import { CHAT_SUBSCRIPTIONS, DELETE_MESSAGE_SUBSCRIPTION } from "../Queries/Subscriptions";
import client from "../Configuration/ApolloClient";


export default function Nav(){
    const { subscribeToMore,loading, error, data } = useQuery(GET_CONVERSATIONS);
    const [chats,setChats]=useState(data?.conversations);
    useEffect(()=>{
        if(data){
            setChats(data?.conversations);
            for(let conversation of data!.conversations){
                subscribeToMore({
                    document: CHAT_SUBSCRIPTIONS,
                    variables: { conversationId:String(conversation.id) },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      const newMessage = subscriptionData.data.onConversationNewMessage!;
                      
                      client.cache.updateQuery({ query:GET_MESSAGES,variables:{id:conversation.id} }, (data) => {
                        if(!data?.messages)return null;
                        return{
                            messages:[...data!.messages,newMessage]
                        }
                    });
                      return prev;
                    }
                })
                subscribeToMore({
                    document: DELETE_MESSAGE_SUBSCRIPTION,
                    variables: { conversationId:String(conversation.id) },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      const deletedMessage = subscriptionData.data.onDeleteMessage;
                      client.cache.updateQuery({ query:GET_MESSAGES,variables:{id:conversation.id} }, (data) => {
                        if(!data?.messages)return null;
                        const index=data!.messages.findIndex((el)=>el.id==deletedMessage.id);
                        const newMessages=[...data!.messages];
                        console.log(newMessages);
                        newMessages.splice(index,1)
                        return {
                            messages:newMessages
                        }});
                      return prev;
                    }
                  })
            }
        }
    },[loading])
    return(
       <div className=" flex flex-col dark:bg-gray-900 p-2 h-full relative ">
            {chats?chats.map((chat)=>
            <Link to={`/k/${chat.id}`} key={chat.id} className="rounded-lg hover:bg-slate-200 dark:hover:bg-gray-500 p-1  truncate flex" >
                <div>
                <p className="font-bold truncate">{chat.title}</p>
                {chat.messages?.length?<p className="truncate text-gray-400">
                    <span className="truncate text-black dark:text-slate-300">{chat.messages[0].senderId}: </span>
                    {chat.messages[0].messageText}
                </p>:null}
                </div>
                {chat.notificationCount?<div className="flex items-center ml-3">
                    <div className=" p-1 rounded-full text-sm bg-cyan-400 dark:bg-indigo-500 flex items-center justify-center">{chat.notificationCount}</div>
                </div>:null}
                
            </Link>
            ):null}
            <AddGroup chats={chats!} setChats={setChats}/>
            
       </div>
    )
}