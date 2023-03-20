import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useUserStore } from "../../store/auth";

import AppLayout from "../../components/Layout/AppLayout";
import { useRouter } from "next/router";
import TopBar from "../../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import FETCH_CHAT from "../../graphql/Query/FetchChat";
import SEND_MESSAGE from "../../graphql/Mutation/SendMessage";
import { client } from "../../graphql/client";
import FETCH_MESSAGE from "../../graphql/Query/FetchMessage";
import ChatItem from "../../components/UI/ChatItem";
import ChatLayout from "../../components/Layout/ChatLayout";
import Loading from "../../assets/createpost/loading.svg";
import ProfilePicContainer from "../../components/UI/ProfilePicContainer";
import Auth from "../../outlet/Auth";

const ChatWithID = () => {
  const [message, setMessage] = useState("");
  const [peerId, setPeerId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [messageLoading, setMessageLoading] = useState(true);
  const { query } = useRouter();

  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAT);

  const fetchMesasges = async (productId, peerId) => {
    try {
      const response = await client.query({
        query: FETCH_MESSAGE,
        fetchPolicy: "no-cache",
        variables: {
          fetchMessageInput: {
            page: 1,
            limit: 10,
            productId: productId,
            peerId: peerId,
          },
        },
      });
      setMessages(new Array(...response.data.fetchMessages.data));
      setMessageLoading(false);
      const profile = response.data.fetchMessages.profile;
      console.info({ t: response.data.fetchMessages.profile.profilePic[0] });
      setProfilePic(
        profile.profilePic.length > 0
          ? profile.profilePic[profile.profilePic.length - 1].url
          : null
      );
    } catch (error) {}
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const sendMessage = async (productId, peerId, message) => {
    try {
      const msgResponse = await client.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          messageInput: {
            productId: productId,
            message: message,
            receiver: peerId,
          },
        },
      });
      setMessage("");
      setMessages((prevs) => [...prevs, msgResponse.data.sendMessage.data]);
    } catch (error) {}
  };

  useEffect(() => {
    if (query.pid && query.uid) {
      setMessageLoading(true);

      setPeerId(query.uid);
      setProductId(query.pid);
      fetchMesasges(query.pid, query.uid);
    }
  }, [query]);

 
  const onChat = (peerId, productId) => {
    router.push({
      pathname: `/chat/q`,
      query: { uid: peerId, pid: productId },
    });
  };

  return (
    <Auth >
    <ChatLayout
      showMessagePage={true}
      chat={
        <Fragment>
          {loading && <Loading className="h-12" />}
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
                active={
                  item.product._id === query.pid &&
                  (item.user1._id === peerId || item.user2._id === peerId)
                }
                image={item.product.images[0].url}
                adTitle={item.product.title}
                userName={
                  item.user1._id === user.id
                    ? item.user2.fullName
                    : item.user1.fullName
                }
              />
            ))}
        </Fragment>
      }
    >
      {!messageLoading ? (
        <Fragment>
          <div className="flex bg-primary  md:rounded-md h-14 gap-2 justify-start items-center text-white">
            <div
              className="flex justify-start items-center cursor-pointer"
              onClick={() => {
                router.push(
                  `/profile/${
                    messages[0].sender._id === user.id
                      ? messages[0].receiver._id
                      : messages[0].sender._id
                  }`
                );
              }}
            >
              <ProfilePicContainer
                url={profilePic}
                className="h-10 w-10  mx-4 bg-white"
                fullName={
                  messages[0].sender._id === user.id
                    ? messages[0].receiver.fullName
                    : messages[0].sender.fullName
                }
              />

              <h2 className="text-lg md:text-xl">
                {messages[0].sender._id === user.id
                  ? messages[0].receiver.fullName
                  : messages[0].sender.fullName}
              </h2>
            </div>
          </div>
          <div className="flex flex-col chatbox overflow-y-scroll">
            {messages.map((item, i) => {
              if (item.sender._id === user.id) {
                return (
                  <div className="clearfix" key={item._id}>
                    <div className="bg-primary text-white float-right mx-4 my-2 p-2 rounded-lg clearfix">
                      {item.message}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="clearfix" key={item._id}>
                    <div className="bg-gray-300 float-left mx-4 my-2 p-2 rounded-lg">
                      {item.message}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Fragment>
      ) : (
        <div className="flex justify-center items-center h-1/2">
          <Loading className="h-12" />
        </div>
      )}
      <form
        className="absolute bottom-0  w-full flex justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(productId, peerId, message);
        }}
      >
        <textarea
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !event.shiftKey) {
              e.preventDefault(); // prevent the default behavior of creating a newline
              sendMessage(productId, peerId, message);
            }
          }}
          className="m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none w-full"
          rows="1"
          placeholder="Message..."
          value={message}
        />
        <button className="m-2" type="submit">
          <svg
            className="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="paper-plane"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#1FC39E"
              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
            />
          </svg>
        </button>
      </form>
    </ChatLayout>
    </Auth>
  );
};

export default ChatWithID;
