import React, { Fragment } from "react";
import { useState } from "react";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";

const index = () => {
  const [message, setMessage] = useState("");
  return (
    <App>
      <TopBar />
      <Fragment>
        <div className="w-full p-4 flex gap-4">
          <div className="w-full md:w-2/5 lg:w-1/3 bg-customGray-light message-list flex flex-col">
            <div className="w-full flex p-2 active-message">
              <div className="rounded-full h-16 w-16 bg-black"></div>
              <div className="flex flex-col justify-center p-2">
                <h2 className="font-semibold">Yeswant</h2>
                <p>bike for rent</p>
              </div>
            </div>
            <div className="w-full flex p-2">
              <div className="rounded-full h-16 w-16 bg-black"></div>
              <div className="flex flex-col justify-center p-2">
                <h2 className="font-semibold">Yeswant</h2>
                <p>bike for rent</p>
              </div>
            </div>
            <div className="w-full flex p-2" onClick={() => setActive()}>
              <div className="rounded-full h-16 w-16 bg-black"></div>
              <div className="flex flex-col justify-center p-2">
                <h2 className="font-semibold">Yeswant</h2>
                <p>bike for rent</p>
              </div>
            </div>
          </div>
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
              <button className="m-2">
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
        </div>
      </Fragment>
    </App>
  );
};

export default index;
