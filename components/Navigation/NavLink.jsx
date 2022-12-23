import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navlink = ({ href, exact, children, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
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
