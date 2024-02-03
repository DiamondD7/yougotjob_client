import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";

import "../../styles/homestyles.css";
const Receptionist = ({ fakeRole }) => {
  const [displayed, setDisplayed] = useState("dashboard");
  return (
    <>
      <div className="main-display__wrapper">
        <>
          <Nav setDisplayed={setDisplayed} fakeRole={fakeRole} />
        </>
        <>
          <Display displayed={displayed} />
        </>
      </div>
    </>
  );
};

export default Receptionist;
