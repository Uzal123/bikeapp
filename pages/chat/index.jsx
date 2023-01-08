import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import App from "../../components/Layout/App";
import { useRouter } from "next/router";
import TopBar from "../../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import FETCH_CHAT from "../../graphql/Query/FetchChat";
import SEND_MESSAGE from "../../graphql/Mutation/SendMessage";
import { client } from "../../graphql/client";
import FETCH_MESSAGE from "../../graphql/Query/FetchMessage";

const Chat = () => {
  const { loading, error, data } = useQuery(FETCH_CHAT);

  return (
    <App>
      <TopBar />
      <Fragment>
        <div className="w-full p-4 flex gap-4">
          <div className="w-full md:w-2/5 lg:w-1/3 bg-customGray-light message-list flex flex-col">
            {data &&
              !loading &&
              data.fetchChat.map((item,i) => (
                <div className="w-full flex p-2" key={i}>
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
        </div>
      </Fragment>
    </App>
  );
};

export default Chat;
