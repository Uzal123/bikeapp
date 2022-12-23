import React, { useEffect } from "react";
import "../styles/globals.scss";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import ME from "../graphql/Query/Me";
import { useUserStore } from "../store/auth";
import { client } from "../graphql/client";

function MyApp({ Component, pageProps }) {
  const setUser = useUserStore((state) => state.setUser);
  const removeUser = useUserStore((state) => state.removeUser);

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
