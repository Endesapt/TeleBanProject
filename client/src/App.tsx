import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useKeycloak } from 'keycloak-react-web/dist/keycloak';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Components/Nav';
import Chat from './Components/Chat';
import {useQuery } from '@apollo/client';
import { gql } from '../src/__generated__/gql';

//проверяющая очередь, чтобы проверить работоспособность Apollo Client
const GET_FOODS = gql(`
        query User{
          user{
              id  
          }
        }
`);
function App() {
  const { keycloak, initialized } = useKeycloak();
  localStorage.setItem("access_token",keycloak.token!);
  const { loading, error, data } = useQuery(GET_FOODS);
  let userName:string;
  useEffect(() => {
    if (initialized) {
      if (!keycloak.authenticated) {
        keycloak.login();
      } 
    }
    
  }, [initialized]);
  if (!initialized) {
    return <p>Loading...</p>;
  }
  if (!keycloak.authenticated) {
    return <p>Authenticating...</p>;
  }

  console.log(error);
  console.log(data);
  userName=keycloak.idTokenParsed!.preferred_username;
  return (
    <div className='dark:text-slate-300 h-full grid grid-cols-[24rem_auto] '>
    <Nav/>
    <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-[#1b2431] dark:to-[#131314] grid grid-rows-[3.5rem_1fr_auto] ">
      <Routes>
        <Route path="k/:chatId" element={<Chat userName={userName}/>}/>
      </Routes>
    </div>

    </div>);
}

export default App;
