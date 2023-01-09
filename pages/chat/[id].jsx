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

const ChatWithID = () => {
  const [message, setMessage] = useState("");
  const [peerId, setPeerId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { query } = useRouter();

  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const { loading, error, data } = useQuery(FETCH_CHAT);
  console.log(data);

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
      setMessages(response.data.fetchMesasges.data);
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
        router.push("/login", { pathname: "/chat" });
      }
    }
  }, [user]);

  return (
    <App>
      <TopBar />
      <Fragment>
        <div className="w-full p-4 flex gap-4">
          <div className="w-full md:w-2/5 lg:w-1/3 bg-customGray-light message-list flex flex-col">
            {data &&
              data.fetchChat.map((item, i) => (
                <div
                  className={
                    item.product._id === query.pid
                      ? "w-full flex p-2 active-message"
                      : "w-full flex p-2"
                  }
                  key={i}
                >
                  <img
                    src={[item.product.images[0].url]}
                    className="rounded-full h-16 w-16 b"
                  />
                  <div className="flex flex-col justify-center p-2">
                    <h2 className="font-semibold">{[item.user1.fullName]}</h2>
                    <p>{[item.product.title]}</p>
                  </div>
                </div>
              ))}
          </div>
          {/* {fetchMesasges() &&
          fetchMesasges().data.fetchMessages.success === true ? ( */}
          <div className="w-full bg-customGray-navbar rounded-md relative">
            <div style={{ "overscroll-behavior": "none" }}>
              <div className="flex bg-primary rounded-md h-14 gap-2 justify-center items-center text-white">
                <div className="h-10 w-10 bg-white rounded-full"></div>
                <h2 className="text-2xl">Yeswant</h2>
              </div>

              <div className="mt-20 mb-16">
                <div className="clearfix">
                  <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg">
                    this is a basic mobile chat layout, build with tailwind css
                  </div>
                </div>

                <div className="clearfix">
                  <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                    It will be used for a full tutorial about building a chat
                    app with vue, tailwind and firebase.
                  </div>
                </div>
                <div className="clearfix">
                  <div className="bg-primary float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
                    check my twitter to see when it will be released.
                  </div>
                </div>
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
              <button className="m-2" onClick={() => sendMessage()}>
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
          </div>
          {/* ) : (
            "loading"
          )} */}
        </div>
      </Fragment>
    </App>
  );
};

export default ChatWithID;
