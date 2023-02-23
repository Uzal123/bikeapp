import React from "react";
import Cross from "../../assets/Notification/Cross.svg";
import Check from "../../assets/Notification/Check.svg";
import Loading from "../../assets/Notification/Loading.svg";

const PopUpNotification = ({ notifications }) => {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center my-8 md:my-6 gap-2 lg:my-4 z-[10000]">
      {notifications.map((item) => (
        <div
          className={`notification text-center flex p-4 bg-white rounded-md shadow-md border-2 border-gray-100 justify-center items-center ${
            item.status === "Success" || item.status === "Loading"
              ? "text-primary"
              : "text-red-500"
          }`}
          key={item.id}
        >
          <span className="px-2">
            {item.status === "Success" ? <Check className="h-6" /> : ""}
            {item.status === "Loading" ? <Loading className="h-6" /> : ""}

            {item.status === "Error" ? <Cross className="h-6" /> : ""}
          </span>
          {item.message}
        </div>
      ))}
    </div>
  );
};

export default PopUpNotification;
