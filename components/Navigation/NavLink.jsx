import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUserStore } from "../../store/auth";

const Navlink = ({ href, exact, children, myProfile, ...props }) => {
  const { pathname } = useRouter();
  const { id } = useRouter().query;
  const user = useUserStore((state) => state.user);
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  } else if (myProfile && user.id === id) {
    props.className += " active";
  } else {
    props.className += " inactive";
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default Navlink;
