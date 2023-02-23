import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="relative flex justify-center">
        <div className="w-12 h-12 rounded-full absolute border-8 border-dashed border-white"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-dashed border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loading;
