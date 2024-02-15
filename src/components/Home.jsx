import React, { useState } from "react";
import Nav from "./Nav/Nav";
import Display from "./Display/Display";

import "../styles/homestyles.css";
const Home = () => {
  const [displayed, setDisplayed] = useState("dashboard");

  console.log(displayed);
  return (
    <>
      <div className="main-display__wrapper">
        <>
          <Nav setDisplayed={setDisplayed} />
        </>
        <>
          <Display displayed={displayed} />
        </>
      </div>
    </>
  );
};

export default Home;
