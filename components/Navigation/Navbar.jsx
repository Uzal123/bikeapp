import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Home from "../../assets/NavigationBar/home.svg";
import Bell from "../../assets/NavigationBar/bell.svg";
import Chat from "../../assets/NavigationBar/chat.svg";
import User from "../../assets/NavigationBar/user.svg";
import Add from "../../assets/NavigationBar/add.svg";

const Navbar = ({...props}) => {
  return (
    <div className="flex flex-col items-center w-20 h-screen p-6 pt-20  bg-customGray-navbar fixed">
      <ul className="flex flex-col w-full gap-6 items-center">
        <NavLink exact href={"/"}>
          <Home className="h-6 lg:h-8" />
        </NavLink>
        <NavLink exact href={"/notification"}>
          <Bell className="h-6 lg:h-8 " />
        </NavLink>
       <NavLink exact href={"/chat"}>
          <Chat className="h-6 lg:h-8" />
        </NavLink>
        <NavLink exact href={"/profile"}>
          <User className="h-6 lg:h-8" />
        </NavLink>
      </ul>
      <Link href={"/createpost"} className="flex items-center p-2 h-12 w-12 justify-center mt-6 bg-primary rounded-full shadow-xl">
        <Add className="h-5 w-5 lg:h-6" />
      </Link>
    </div>
  );
};


export default Navbar;
