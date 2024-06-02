import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";

import "../../styles/homestyles.css";
const GeneralPractioner = ({ userLoggedData, setUserLoggedData }) => {
  const [displayed, setDisplayed] = useState("dashboard");
  return (
    <>
      <div className="main-display__wrapper">
        <>
          <Nav
            setDisplayed={setDisplayed}
            userLoggedData={userLoggedData}
            setUserLoggedData={setUserLoggedData}
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
