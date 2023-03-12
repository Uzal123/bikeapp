import React from "react";

const ProfilePicContainer = ({ url, fullName, className, ...props }) => {
  return (
    <div
      className={` bg-primary rounded-full text-center flex items-center justify-center text-white text-4xl font-semibold relative overflow-hidden border-2 border-white ${className}`}
    >
      {!url ? (
        <p className="text-primary ">{fullName[0]}</p>
      ) : (
        <img src={url} className="h-full w-full object-cover rounded-full" alt="User Image"/>
      )}
      {props.children}
    </div>
  );
};

export default ProfilePicContainer;
