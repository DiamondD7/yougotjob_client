import React from "react";
import Nav from "./Nav/Nav";
import Display from "./Display/Display";

import "../styles/homestyles.css";
const Home = () => {
  return (
    <>
      <div className="main-display__wrapper">
        <>
          <Nav />
        </>
        <>
          <Display />
        </>
      </div>
    </>
  );
};

export default Home;
