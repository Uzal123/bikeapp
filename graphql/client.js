import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("rent-app-token");
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,

      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
