import Head from "next/head";
import React, { Fragment } from "react";
import Navbar from "../Navigation/Navbar";

const AppLayout = ({ title, ...props }) => {
  return (
    <Fragment>
      <div className="main">
        <Head>
          <meta
            property="og:title"
            content={`MotoGhar ${title ? " - " + title : ""}`}
          />
          <title>{`MotoGhar ${title ? " - " + title : ""}`}</title>
        </Head>
        <Navbar />
        {props.children}
      </div>
    </Fragment>
  );
};

export default AppLayout;
