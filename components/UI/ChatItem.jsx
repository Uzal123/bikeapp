import React from "react";

const ChatItem = ({ onClick, image, adTitle, userName, active = false }) => {
  return (
    <div
      className={`"w-full flex p-2   border-b-2 border-gray-200 ${
        active ? " active-message rounded-md" : ""
      }  }`}
      onClick={onClick}
    >
      <img src={image} className="rounded-full h-16 w-16 b" />
      <div className="flex flex-col justify-center p-2">
        <h2 className="font-semibold">{userName}</h2>
        <p>{adTitle}</p>
      </div>
    </div>
  );
};

export default ChatItem;
