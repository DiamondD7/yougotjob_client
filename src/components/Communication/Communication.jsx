import React from "react";

import "../../styles/communicationstyles.css";
import PatientComms from "./PatientComms";
const Communication = () => {
  //add the background highlight when clicked once i have data.

  return (
    <div>
      <div style={{ backgroundColor: "orange", textAlign: "center" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#f3f3f3",
            letterSpacing: "1px",
          }}
        >
          This feature will be available soon, but not at this moment
        </p>
      </div>
      <PatientComms />
    </div>
  );
};

export default Communication;
