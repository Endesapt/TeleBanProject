import { ApolloClient, InMemoryCache,HttpLink, split} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { cache } from './cache';
const httpLink=new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  fetchOptions:{
    mode:"cors"
  },
  credentials: 'same-origin'
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const wsLink = new GraphQLWsLink(createClient({
  url: process.env.REACT_APP_WS_GRAPHQL_URL!,
}))
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);
const client = new ApolloClient({
    link:splitLink,

    cache: cache,
  });

export default client;