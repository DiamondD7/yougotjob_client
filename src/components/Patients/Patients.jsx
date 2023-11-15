import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import "../../styles/patientsstyles.css";
const Patients = () => {
  return (
    <div>
      <div className="patients-form__wrapper">
        <h2>Patient's Details</h2>
        <form className="patients-form">
          <label style={{ marginLeft: "155px" }}> Patient's ID &nbsp;</label>
          <br />
          <input
            className="id-input"
            type="text"
            placeholder="eg. #AJS2023GTKT00752"
          />
          <br />
          <br />
          <label style={{ marginLeft: "190px", color: "rgba(0,0,0,0.4)" }}>
            or
          </label>
          <br />
          <br />
          <input className="names-input" type="text" placeholder="Surname" />
          <br />
          <input className="names-input" type="text" placeholder="First Name" />
          <br />
          <button className="patient-form__btn">
            <MagnifyingGlass size={16} color="#f3f3f3" /> search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Patients;
