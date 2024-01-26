import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import "../../styles/patientsstyles.css";
import SearchProfile from "./SearchProfile";
const Patients = () => {
  const [searchField, setSearchField] = useState("");
  return (
    <div>
      <div className="patientsId-search__wrapper">
        <div>
          <input
            className="patientID__input"
            type="text"
            placeholder="Patient ID/First or Last Name"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <button className="patientsearch__btn">
            <MagnifyingGlass size={16} color="#454545" />
          </button>
        </div>
      </div>

      <SearchProfile searchField={searchField} />
    </div>
  );
};

export default Patients;
