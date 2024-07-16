import React, { useState } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";

const PatientsHome = () => {
  const [displayed, setDisplayed] = useState("dashboard");
  return (
    <>
      <div className="main-display__wrapper">
        <>
          <Nav setDisplayed={setDisplayed} />
        </>
        <>
          <Display displayed={displayed} />{" "}
          {/*setEditChanges will change the time on the Nav from changing it in the Settings/Account*/}
        </>
      </div>
    </>
  );
};

export default PatientsHome;
