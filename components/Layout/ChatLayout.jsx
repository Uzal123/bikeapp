import React, { Fragment } from "react";
import App from "./App";
import TopBar from "../Topbar/TopBar";

const ChatLayout = ({ chat, showMessagePage = false, ...props }) => {
  return (
    <App>
      <Fragment>
        <div className="w-full h-full lg:p-4 flex gap-4">
          <div
            className={`w-full md:w-2/5 lg:w-1/3 bg-customGray-light h-full flex-col rounded-md ${
              showMessagePage ? "hidden" : ""
            } md:flex`}
          >
            {chat}
          </div>

          {showMessagePage && (
            <div className="w-full h-full bg-customGray-navbar rounded-md relative">
              {props.children}
            </div>
          )}
        </div>
      </Fragment>
    </App>
  );
};

export default ChatLayout;
