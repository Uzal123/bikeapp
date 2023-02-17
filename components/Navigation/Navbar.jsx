import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Home from "../../assets/NavigationBar/home.svg";
import Bell from "../../assets/NavigationBar/bell.svg";
import Chat from "../../assets/NavigationBar/chat.svg";
import User from "../../assets/NavigationBar/user.svg";
import Add from "../../assets/NavigationBar/add.svg";
import { useUserStore } from "../../store/auth";

const Navbar = ({ ...props }) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="navbar ">
      <ul className="flex w-full h-full justify-between items-center lg:flex-col lg:justify-start lg:my-12 lg:gap-4">
        <NavLink exact href={"/"} className="order-1">
          <Home className="h-6 lg:h-8 " />
        </NavLink>
        <NavLink exact href={"/notification"} className="order-2">
          <Bell className="h-6 lg:h-8 " />
        </NavLink>
        <NavLink
          exact={false}
          href={"/chat"}
          className="order-3"
        >
          <Chat className="h-6 lg:h-8" />
        </NavLink>
        <NavLink
          myProfile
          href={user.id ? `/profile/${user.id}` : "/login"}
          className="order-4"
        >
          <User className="h-6 lg:h-8" />
        </NavLink>
        <Link
          href={"/createpost"}
          className="flex items-center p-2 h-12 w-12 justify-center lg:mt-6 bg-primary rounded-full shadow-xl order-2 lg:order-5"
        >
          <Add className="h-5 w-5 lg:h-6" />
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
