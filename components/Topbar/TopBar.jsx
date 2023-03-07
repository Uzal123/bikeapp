import React from "react";
import Link from "next/link";
import Location from "../../assets/TopBar/location.svg";
import Logo from "../../assets/TopBar/logo.svg";
import { useAppStore } from "../../store/appState";

const TopBar = () => {
  const { city } = useAppStore((state) => state);
  return (
    <div className="topbar ">
      <Link href="/" className="font-bold text-2xl text-primary">
        
        <Logo className="h-20 md:h-24"/>
      </Link>
      <div className="flex items-center">
        <Location className="h-6 w-6" />
        <p className="text-md text-center underline font-semibold">
          {city}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
