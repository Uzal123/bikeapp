import React from "react";
import Link from "next/link";
import Location from "../../assets/TopBar/location.svg";
import { useState, useEffect } from "react";

const TopBar = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setLocation(data));
  }, []);
  return (
    <div className="topbar shadow-md">
      <Link href="/" className="font-bold text-2xl text-primary">
        Wheelz
        <span className="px-1 mx-1 rounded-md bg-primary text-white">Hub</span>
      </Link>
      <div className="flex items-center">
        <Location className="h-8 w-8" />
        <p className="text-md lg:text-xl text-center underline font-semibold">
          {location.city}
        </p>
      </div>
    </div>
  );
};

export default TopBar;
