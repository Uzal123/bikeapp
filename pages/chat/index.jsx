import React, { Fragment, useEffect } from "react";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import FETCH_CHAT from "../../graphql/Query/FetchChat";
import ChatItem from "../../components/UI/ChatItem";
import ChatLayout from "../../components/Layout/ChatLayout";

const Chat = () => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAT);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.email | error) {
        router.push("/login");
      }
    }
  }, [user, error]);

  //   const [active, setActive] = useState(1)

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
          {data &&
            !loading &&
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
                userName={item.user1._id === user.id ? item.user2.fullName : item.user1.fullName }
              />
            ))}
        </Fragment>
      }
    />
  );
};

export default Chat;

