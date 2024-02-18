import React from "react";
import Calendar from "../Calendar/Calendar";
import Patients from "../Patients/Patients";
import Communication from "../Communication/Communication";
import Results from "../Results/Results";
import PhysicianProfile from "../ProfileDepartment/PhysicianProfile";
import Dashboard from "../Dashboard/Dashboard";
import Learning from "../Learning/Learning";
import Support from "../Support/Support";

import "../../styles/displaystyles.css";
const Display = ({ displayed }) => {
  return (
    <>
      <div className="display__wrapper">
        {displayed === "calendar" ? (
          <Calendar />
        ) : displayed === "patients" ? (
          <Patients />
        ) : displayed === "communication" ? (
          <Communication />
        ) : displayed === "results" ? (
          <Results />
        ) : displayed === "support" ? (
          <Support />
        ) : displayed === "learning" ? (
          <Learning />
        ) : displayed === "dashboard" ? (
          <Dashboard />
        ) : displayed === "profile" ? (
          <PhysicianProfile />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Display;
