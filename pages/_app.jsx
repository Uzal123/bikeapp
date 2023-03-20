import React, { useEffect, useState } from "react";
import "../styles/globals.scss";
import {
  ApolloProvider,
} from "@apollo/client";
import ME from "../graphql/Query/Me";
import { useAuth } from "../hooks/useAuth";
import { client } from "../graphql/client";
import { useNotification } from "../hooks/useNotification";
import PopUpNotification from "../components/UI/PopUpNotification";
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const {setUser, setAuthincatedUser} = useAuth((state) => state);
  const removeUser = useAuth((state) => state.removeUser);
  const { notifications, setNotification } = useNotification(
    (state) => state
  );

  const router = useRouter();

  const loadUser = async () => {
    try {
      const response = await client.query({ query: ME });
      if (response.data?.me?.["success"]) {
        const user = response.data.me["user"];
        console.log(user);
        setUser(
          user.accessToken,
          user._id,
          user.phone,
          user.fullName,
          user.verifiedPhone
        );
        if (user.verifiedPhone === false) {
          router.push("/verifyotp");
        }
      }else{
        setAuthincatedUser();
      }
    } catch (error) {
      console.log(error);
      removeUser();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadUser();
    }
  }, [typeof window !== "undefined"]);

  return (
    <ApolloProvider client={client}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <PopUpNotification notifications={notifications} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
