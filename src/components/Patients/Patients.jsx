import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import "../../styles/patientsstyles.css";
const Patients = () => {
  return (
    <div>
      <div className="patientsId-search__wrapper">
        <div>
          <input
            className="patientID__input"
            type="text"
            placeholder="Patient ID/First or Last Name"
          />
          <button className="patientsearch__btn">
            <MagnifyingGlass size={16} color="#f3f3f3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Patients;
