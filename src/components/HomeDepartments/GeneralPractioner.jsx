import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";

import "../../styles/homestyles.css";
const GeneralPractioner = () => {
  const [displayed, setDisplayed] = useState("dashboard");
  return (
    <>
      <div className="main-display__wrapper">
        <>
          <Nav
            setDisplayed={setDisplayed}
          />
        </>
        <>
          <Display displayed={displayed} />
        </>
      </div>
    </>
  );
};

export default GeneralPractioner;
