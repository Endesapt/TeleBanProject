import { useEffect, useState } from "react";

import {useQuery,gql} from "@apollo/client";
import { Conversation } from "../Types/Conversation";
import AddGroup from "./AddGroup";
import { GET_CONVERSATIONS, GET_MESSAGES } from "../Queries/Queries";
import { notificationCount } from "../Configuration/cache";
import { CHAT_SUBSCRIPTIONS, DELETE_MESSAGE_SUBSCRIPTION } from "../Queries/Subscriptions";
import client from "../Configuration/ApolloClient";
import NavBlock from "./NavBlock";


export default function Nav({userName}:{userName:string}){
    const { subscribeToMore,loading, error, data } = useQuery(GET_CONVERSATIONS);
    function switchColorMode(){
      document.documentElement.classList.toggle("dark");
    }
    useEffect(()=>{
        if(data){
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
                        newMessages.splice(index,1)
                        return {
                            messages:newMessages
                        }});
                      return prev;
                    }
                  })
            }
        }
    },[loading,data])
    return(
      <div className="dark:bg-gray-900">
        <div className="h-14 p-2 text-lg border-b border-slate-50 dark:border-black w-full flex items-center">
          <div>{userName}</div>
          <div className=" float-right ml-auto h-10 w-10 rounded-full bg-slate-800 dark:bg-slate-500" onClick={switchColorMode}></div>
        </div>
        <div className=" flex p-2 w-full flex-col h-[calc(100%-56px)] relative ">
              {data?.conversations?data?.conversations.map((chat)=>
                  <NavBlock chat={chat}/>
              ):null}
              <AddGroup chats={data?.conversations} />
              
        </div>
      </div>
    )
}