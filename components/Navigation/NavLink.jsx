import React from 'react'
import { useRouter } from "next/router";
import Link from "next/link";


const Navlink = ({ href, exact, children, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className +=
      " border-2 p-2 rounded-2xl shadow-xl border-primary scale-110 hover:scale-125 transition ease-in-out duration-150";
  } else {
    props.className +=
      " border-2 p-2 rounded-2xl shadow-xl border-transparent hover:scale-110 transition ease-in-out duration-150";
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default Navlink