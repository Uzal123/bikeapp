import React from "react";
import Link from "next/link";
import Location from "../../assets/TopBar/location.svg";
import { useAppStore } from "../../store/appState";

const TopBar = () => {
  const { city } = useAppStore((state) => state);
  return (
    <div className="topbar ">
      <Link href="/" className="font-bold text-2xl text-primary">
        Wheelz
        <span className="px-1 mx-1 rounded-md bg-primary text-white">Hub</span>
      </Link>
      <div className="flex items-center">
        <Location className="h-8 w-8" />
        <p className="text-md lg:text-xl text-center underline font-semibold">
          {city}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
