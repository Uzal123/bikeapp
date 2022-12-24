import React from "react";
import Navbar from "../Navigation/Navbar";
import TopBar from "../Topbar/TopBar";

const App = ({ ...props }) => {
  return (
    <section>
      <Navbar />    
      <div className="main">
        {props.children}
      </div>
    </section>
  );
};

export default App;
