import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URI = "/graphql";
export const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});
