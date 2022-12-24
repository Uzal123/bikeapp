import React from "react";
import Location from "../../assets/TopBar/location.svg";

const TopBar = () => {
  return (
    <div className="topbar ">
      <a href="/" className="font-bold text-2xl text-primary">
        RentingApp
      </a>
      <div className="flex items-center">
        <Location className="h-8 w-8" />
        <p className="text-md lg:text-xl text-center underline font-semibold">
          Kathmandu
        </p>
      </div>
    </div>
  );
};

export default TopBar;
