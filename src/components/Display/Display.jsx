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
import DashboardPatient from "../Dashboard/DashboardPatient";
import LabResults from "../PatientNAVS/LabResults";
import TestResults from "../PatientNAVS/TestResults";
import Immunisation from "../PatientNAVS/Immunisation";
import Prescriptions from "../PatientNAVS/Prescriptions";
const Display = ({ displayed, setEditChanges }) => {
  const role = sessionStorage.getItem("role");
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
        ) : displayed === "dashboard" && role === "Practitioner" ? (
          <Dashboard />
        ) : displayed === "dashboard" && role === "Patient" ? (
          <DashboardPatient />
        ) : displayed === "profile" ? (
          <PhysicianProfile />
        ) : displayed === "records" ? (
          <Records />
        ) : displayed === "settings" ? (
          <Settings setEditChanges={setEditChanges} /> //setEditChanges will change the time on the Nav from changing it in the Settings/Account
        ) : displayed === "lab results" ? (
          <LabResults />
        ) : displayed === "test results" ? (
          <TestResults />
        ) : displayed === "immunisation" ? (
          <Immunisation />
        ) : displayed === "prescriptions" ? (
          <Prescriptions />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Display;
