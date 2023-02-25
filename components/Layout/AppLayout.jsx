import React, { Fragment } from "react";
import Navbar from "../Navigation/Navbar";
import TopBar from "../Topbar/TopBar";

const AppLayout = ({ ...props }) => {
  return (
    <Fragment>
      <div className="main">
      <Navbar />    
        {props.children}
      </div>
    </Fragment>
  );
};

export default AppLayout;
