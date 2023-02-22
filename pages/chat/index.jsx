import React, { Fragment, useEffect } from "react";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import FETCH_CHAT from "../../graphql/Query/FetchChat";
import ChatItem from "../../components/UI/ChatItem";
import ChatLayout from "../../components/Layout/ChatLayout";
import Spinner from "../../components/UI/Spinner";

const Chat = () => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAT);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.email | error) {
        router.push("/login", { basePath: "/chat" });
      }
    }
  }, [user, error]);

  const onChat = (peerId, productId) => {
    router.push({
      pathname: `/chat/q`,
      query: { uid: peerId, pid: productId },
    });
  };

  return (
    <ChatLayout
      showMessagePage={false}
      chat={
        <Fragment>
          {loading ? (
            <Spinner />
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
  );
};

export default Chat;
