import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { GET_CONVERSATION_INFO } from "../Queries/Queries";
import { ENTER_GROUP } from "../Queries/Mutations";

export default function EnterChat(){
    const {chatGuid}=useParams();
    const {loading,error,data}=useQuery(GET_CONVERSATION_INFO,{variables:{conversationGuid:chatGuid}});
    const [enterChat]=useMutation(ENTER_GROUP,{variables:{conversationGuid:chatGuid}});
    if(loading)return <div>Loading...</div>
    function chatEnter(){
        enterChat();
        window.location.href='/';
    }
    return(<div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-[#1b2431] dark:to-[#131314] flex items-center justify-center ">
        <div className=" h-96 w-64 bg-slate-500 dark:bg-slate-800 flex flex-col items-center rounded-md">
            <div className="text-center dark:text-white ">
                <div className=" m-3 text-lg font-medium">You are trying to enter chat {data?.conversationInfo.title}</div>
                <button className="p-3 text-lg font-bold bg-cyan-400 dark:bg-indigo-700 rounded-lg" onClick={chatEnter}>Enter</button>
            </div>
        </div>
    </div>)
}