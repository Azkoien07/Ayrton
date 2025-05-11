import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8081/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;