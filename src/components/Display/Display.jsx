import React from "react";
import Calendar from "../Calendar/Calendar";
import Patients from "../Patients/Patients";
import Communication from "../Communication/Communication";
import Results from "../Results/Results";
import Domain from "../Domain/Domain";
import PhysicianProfile from "../ProfileDepartment/PhysicianProfile";
import Dashboard from "../Dashboard/Dashboard";
import Learning from "../Learning/Learning";

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
        ) : displayed === "domain" ? (
          <Domain />
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
