import React, { Fragment, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Router, { withRouter, useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FETCH_CHAT from "../../graphql/Query/FetchChat";
import ChatItem from "../../components/UI/ChatItem";
import ChatLayout from "../../components/Layout/ChatLayout";
import Loading from "../../assets/createpost/loading.svg";
import Head from "next/head";
import Auth from "../../outlet/Auth";
const Chat = () => {
  const user = useAuth((state) => state.user);

  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAT, {
    fetchPolicy: "no-cache",
  });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (!user.phone | error) {
  //       router.push("/login", { basePath: "/chat" });
  //     }
  //   }
  // }, [user, error]);

  const onChat = (peerId, productId) => {
    router.push({
      pathname: `/chat/q`,
      query: { uid: peerId, pid: productId },
      asPath: `/chat`,
    });
  };

  return (
    <Auth>
    <div className="flex">
      <ChatLayout
        showMessagePage={false}
        chat={
          <Fragment>
            {loading ? (
              <div className="flex w-full justify-center">
                <Loading className="h-12" />
              </div>
            ) : (
              <Fragment>
                {data && !loading && data.fetchChat.length > 0 ? (
                  data.fetchChat.map((item, i) => (
                    <ChatItem
                      key={item._id}
                      onClick={() => {
                        onChat(
                          item.user1._id === user.id
                            ? item.user2._id
                            : item.user1._id,
                          item.product._id
                        );
                      }}
                      image={item.product.images[0].url}
                      adTitle={item.product.title}
                      userName={
                        item.user1._id === user.id
                          ? item.user2.fullName
                          : item.user1.fullName
                      }
                    />
                  ))
                ) : (
                  <div className="flex justify-center text-center p-4">
                    <p className="text-xl">Its so empty. 🙃</p>
                  </div>
                )}
              </Fragment>
            )}
          </Fragment>
        }
      />
    </div>
    </Auth>
  );
};

export default Chat;
