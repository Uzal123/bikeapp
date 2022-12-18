import React, { useEffect } from "react";
import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ME from "../graphql/Query/Me";
import { useUserStore } from "../store/auth";

function MyApp({ Component, pageProps }) {
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

  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const loadUser = async () => {
    try {
      const response = await client.query({ query: ME });
      if (response.data?.me?.["success"]) {
        const user = response.data.me["user"];
        setUser(user.accessToken, user);
      }
    } catch (error) {
      console.log(error);
      // removeUser();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadUser();
    }
  }, [typeof window !== "undefined"]);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
