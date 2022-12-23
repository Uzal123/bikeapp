import React from "react";
import Location from "../../assets/TopBar/location.svg";

const TopBar = () => {
  return (
    <div className="flex p-6 w-full h-20">
      <div className="flex text-center w-full items-center gap-12 justify-between">
        <a href="/" className="font-bold text-2xl text-primary">
          RentingApp
        </a>
        <div className="flex items-center">
          <Location className="h-8 w-8" />
          <h2 className="text-md lg:text-xl text-center underline font-semibold">Kathmandu</h2>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
