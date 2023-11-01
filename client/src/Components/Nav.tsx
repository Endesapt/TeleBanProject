import { useState } from "react";
import { Link } from "react-router-dom";

let DUMMY_DATA=[
{
    id:1,
    name:"First",
    first_message:"AGA",
    sender:"LOLIPdasOP"
},
{
    id:23,
    name:"Second",
    first_message:"BOB",
    sender:"LOL23IPOP"
},
{
    id:523,
    name:"Third",
    first_message:"DA YA HOCHU SDAT EGE",
    sender:"LOLIPO2"
},
{
    id:62345,
    name:"Third",
    first_message:"AGA OKE OKE OKE OKE ",
    sender:"LOLIPO2"
},
{
    id:456,
    name:"Third",
    first_message:"PERAMOGA BUDZE",
    sender:"LOLIPO2"
}
];
export default function Nav(){
    const [chats,setChats]=useState(DUMMY_DATA);
    return(
       <div className=" flex flex-col dark:bg-gray-900 p-2 h-full  ">
            {chats.map((chat)=>
            <Link to={`/k/${chat.id}`} key={chat.id} className="rounded-lg hover:bg-slate-200 dark:hover:bg-gray-500 p-1  truncate" >

                <p className="font-bold truncate">{chat.name}</p>
                <p className="truncate text-gray-400">
                    <span className="truncate text-black dark:text-slate-300">{chat.sender}: </span>
                    {chat.first_message}
                </p>
            </Link>
            )}
       </div>
    )
}