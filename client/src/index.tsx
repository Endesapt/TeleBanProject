import { createRoot } from 'react-dom/client';
import "./index.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import keycloak from './Configuration/Keycloack';
import client from './Configuration/ApolloClient';
import { KeycloakProvider } from 'keycloak-react-web';
import {ApolloProvider, gql} from '@apollo/client'
const root = createRoot(
  document.getElementById('root') as HTMLElement
);

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
