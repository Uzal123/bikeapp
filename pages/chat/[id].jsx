import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useUserStore } from "../../store/auth";

import App from "../../components/Layout/App";
import { useRouter } from "next/router";
import TopBar from "../../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import FETCH_CHAT from "../../graphql/Query/FetchChat";
import SEND_MESSAGE from "../../graphql/Mutation/SendMessage";
import { client } from "../../graphql/client";
import FETCH_MESSAGE from "../../graphql/Query/FetchMessage";
import ChatItem from "../../components/UI/ChatItem";
import ChatLayout from "../../components/Layout/ChatLayout";
import Spinner from "../../components/UI/Spinner";

const ChatWithID = () => {
  const [message, setMessage] = useState("");
  const [peerId, setPeerId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(true);
  const { query } = useRouter();

  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAT);

  const fetchMesasges = async (productId, peerId) => {
    try {
      const response = await client.query({
        query: FETCH_MESSAGE,
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
      console.log(msgResponse);
    } catch (error) {}
  };

  useEffect(() => {
    if (query.pid && query.uid) {
      setPeerId(query.uid);
      setProductId(query.pid);
      fetchMesasges(query.pid, query.uid);
    }
  }, [query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("rent-app-token")) {
        router.push("/login");
      }
    }
  }, [user]);

  const onChat = (peerId, productId) => {
    router.push({
      pathname: `/chat/q`,
      query: { uid: peerId, pid: productId },
    });
  };

  return (
    <ChatLayout
      showMessagePage={true}
      chat={
        <Fragment>
          {data &&
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
            <div className="h-10 w-10 bg-white rounded-full mx-4"></div>
            <h2 className="text-lg md:text-xl">
              {messages[0].sender._id === user.id
                ? messages[0].receiver.fullName
                : messages[0].sender.fullName}
            </h2>
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
          <Spinner />
        </div>
      )}
      <div className="absolute bottom-0  w-full flex justify-between">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none w-full"
          rows="1"
          placeholder="Message..."
          value={message}
        />
        <button
          className="m-2"
          onClick={() => sendMessage(productId, peerId, message)}
        >
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
      </div>
    </ChatLayout>
  );
};

export default ChatWithID;

{
  /*
<div className="pb-20 overflow-hidden">
        <div className="flex bg-primary rounded-md h-14 gap-2 justify-center items-center text-white">
          <div className="h-10 w-10 bg-white rounded-full"></div>
          <h2 className="text-2xl">
            {messages[0] && messages[0].sender._id === user.id ? (messages[0].receiver.fullName) : (messages[0].sender.fullName)}
          
          </h2>
        </div>
        {console.log(messages)}
        <div className="flex flex-col ">
          {messages.map((item, i) => {
            if (item.sender._id === user.id) {
              return (
                <div className="clearfix" key={item._id}>
                  <div className="bg-primary text-white float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                    {item.message}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="clearfix" key={item._id}>
                  <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg">
                    {item.message}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="absolute bottom-0  w-full flex justify-between">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none w-full"
          rows="1"
          placeholder="Message..."
          value={message}
        />
        <button
          className="m-2"
          onClick={() => sendMessage(productId, peerId, message)}
        >
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
      </div>
      */
}
