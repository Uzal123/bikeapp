import React from "react";
import Location from "../../assets/TopBar/location.svg";
import Search from "../../assets/TopBar/search.svg";

const TopBar = () => {
  return (
    <div className="flex ml-20 p-6 justify-between gap-4">
      <div className="flex w-full text-center items-center gap-12">
        <a href="/" className="font-bold text-2xl text-primary">RentingApp</a>
        <div className="flex">
          <Location className="h-8 w-8" />
          <h2 className="text-xl underline font-semibold">Kathmandu</h2>
        </div>
      </div>
      <div className="w-full pl-14">
        <div className="flex border-2 rounded-lg  h-10 items-center p-2 ">
          <input
            type="text"
            className="w-full outline-none placeholder:text-inherit font-semibold"
            placeholder="Search for Cars,bikes,scooty"
          />
          <div className="flex items-center justify-center bg-primary rounded-full">
            <div className="p-2">
              <Search className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
