import React, { Fragment } from "react";
import AppLayout from "./AppLayout";
import TopBar from "../Topbar/TopBar";

const ChatLayout = ({ chat, showMessagePage = false, ...props }) => {
  return (
    <AppLayout title="Chats">
      <Fragment>
        <div className="chatContainer lg:p-4 flex gap-4">
          <div
            className={`w-screen md:w-1/3 lg:w-1/4 bg-customGray-light h-full flex-col rounded-md ${
              showMessagePage ? "hidden" : ""
            } md:flex`}
          >
            <h1 className="p-4 text-white bg-primary mb-4 lg:rounded-t-md text-lg font-semibold">
              Chats
            </h1>
            {chat}
          </div>

          {showMessagePage && (
            <div className="w-full h-full md:w-2/3 lg:w-3/4 bg-customGray-navbar rounded-md relative">
              {props.children}
            </div>
          )}
          {!showMessagePage && (
            <div className="hidden md:flex w-full h-full md:w-2/3 lg:w-3/4 bg-customGray-navbar rounded-md justify-center">
              <img src="/signup.png" className="h-full object-cover"  alt="Signup Image"/>
            </div>
          )}
        </div>
      </Fragment>
    </AppLayout>
  );
};

export default ChatLayout;
