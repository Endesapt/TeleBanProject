import { ApolloClient, InMemoryCache,HttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
const httpLink=new HttpLink({
  uri: 'http://localhost:5095/graphql/',
  fetchOptions:{
    mode:"cors"
  },
  credentials: 'same-origin'
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
    link:authLink.concat(httpLink),

    cache: new InMemoryCache(),
  });

export default client;