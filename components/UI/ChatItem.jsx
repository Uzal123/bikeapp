import React from "react";

const ChatItem = ({ onClick, image, adTitle, userName, active = false }) => {
  return (
    <div
      className={`"w-full flex p-2  border-b-2 border-gray-200 cursor-pointer ${
        active ? " active-message rounded-md" : ""
      }  }`}
      onClick={onClick}
    >
      <div className="flex shrink-0 w-14 h-14 rounded-full overflow-hidden justify-center bg-white">
        <img src={image} className="w-full h-full object-cover" alt="User image"/>
      </div>

      <div className="flex flex-col justify-center p-2 w-4/5">
        <h2 className="font-semibold line-clamp">{userName}</h2>
        <p className="truncate">{adTitle}</p>
      </div>
    </div>
  );
};

export default ChatItem;
