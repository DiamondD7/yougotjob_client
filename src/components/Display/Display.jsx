import React from "react";
import Calendar from "../Calendar/Calendar";
import Patients from "../Patients/Patients";
import Communication from "../Communication/Communication";
import Results from "../Results/Results";
import PhysicianProfile from "../ProfileDepartment/PhysicianProfile";
import Dashboard from "../Dashboard/Dashboard";
import Learning from "../Learning/Learning";
import Documents from "../Documents/Documents";
import Records from "../Records/Records";

import "../../styles/displaystyles.css";
import Settings from "../Settings/Settings";
const Display = ({ displayed, setEditChanges }) => {
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
        ) : displayed === "documents" ? (
          <Documents />
        ) : displayed === "learning" ? (
          <Learning />
        ) : displayed === "dashboard" ? (
          <Dashboard />
        ) : displayed === "profile" ? (
          <PhysicianProfile />
        ) : displayed === "records" ? (
          <Records />
        ) : displayed === "settings" ? (
          <Settings setEditChanges={setEditChanges} /> //setEditChanges will change the time on the Nav from changing it in the Settings/Account
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Display;
