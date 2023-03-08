import React from "react";

const ChatItem = ({ onClick, image, adTitle, userName, active = false }) => {
  return (
    <div
      className={`"w-full flex p-2  border-b-2 border-gray-200 cursor-pointer ${
        active ? " active-message rounded-md" : ""
      }  }`}
      onClick={onClick}
    >
      <div className="flex shrink-0 w-1/4">
        <img src={image} className="rounded-full object-cover" />
      </div>

      <div className="flex flex-col justify-center p-2 w-3/4">
        <h2 className="font-semibold line-clamp">{userName}</h2>
        <p className="truncate">{adTitle}</p>
      </div>
    </div>
  );
};

export default ChatItem;
