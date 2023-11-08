import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useKeycloak } from 'keycloak-react-web/dist/keycloak';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Components/Nav';
import Chat from './Components/Chat';
import {useMutation, useQuery } from '@apollo/client';
import { USER_CREATE } from './Queries/Mutations';
import { GET_USER } from './Queries/Queries';



function App() {
  const { keycloak, initialized } = useKeycloak();
  const[userMutation,{data,loading,error}]=useMutation(USER_CREATE,{ errorPolicy:"ignore" });
  let userName:string,userId:number;
  useEffect(() => {
    if (initialized) {
      if (!keycloak.authenticated) {
        keycloak.login();
      } 
      localStorage.setItem("access_token",keycloak.token!);
      userMutation();
    }
    
  }, [initialized]);
  if (!initialized) {
    return <p>Loading...</p>;
  }
  if (!keycloak.authenticated) {
    return <p>Authenticating...</p>;
  }
  userId=data?.addUser?.id!;
  userName=keycloak.idTokenParsed!.preferred_username;
  return (
    <div className='dark:text-slate-300 h-full grid grid-cols-[24rem_auto] '>
    <Nav/>
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-[#1b2431] dark:to-[#131314] grid grid-rows-[3.5rem_1fr_auto] max-h-[100vh]">
      <Routes>
        <Route path="k/:chatId" element={<Chat userName={userName} userId={userId}/>}/>
      </Routes>
    </div>

    </div>);
}

export default App;
