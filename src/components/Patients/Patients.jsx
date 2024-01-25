import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import "../../styles/patientsstyles.css";
import SearchProfile from "./SearchProfile";
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
            <MagnifyingGlass size={16} color="#454545" />
          </button>
        </div>
      </div>

      <SearchProfile />
    </div>
  );
};

export default Patients;
