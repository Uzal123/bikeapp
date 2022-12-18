import React from "react";
import Navbar from "../Navigation/Navbar";
import TopBar from "../Topbar/TopBar";

const App = ({ ...props }) => {
  return (
    <div>
      <Navbar />
      <TopBar />
      <div className="ml-20">{props.children}</div>
    </div>
  );
};

export default App;
