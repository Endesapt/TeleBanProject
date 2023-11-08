import { createRoot } from 'react-dom/client';
import "./index.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import keycloak from './Configuration/Keycloack';
import client from './Configuration/ApolloClient';
import { KeycloakProvider } from 'keycloak-react-web';
import {ApolloProvider, gql} from '@apollo/client'
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <KeycloakProvider client={keycloak} initOptions={{
    onLoad:"login-required",
    checkLoginIframe:false,
  }}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </KeycloakProvider>
);
 // createRoot(container!) if you use TypeScript
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
