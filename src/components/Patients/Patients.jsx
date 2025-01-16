import React, { useEffect, useState } from "react";
import { ValidatePrac } from "../../assets/js/serverApi";

import SearchProfile from "./SearchProfile";
import FullProfile from "./FullProfile";

import "../../styles/patientsstyles.css";
const Patients = () => {
  const [searchField, setSearchField] = useState("");
  const [openFullProfile, setOpenFullProfile] = useState(false); //handles full profile click
  const [patientProfileId, setPatientProfileId] = useState(0);

  return (
    <div>
      {openFullProfile === false ? (
        <div>
          <div className="patientsId-search__wrapper">
            <div>
              <input
                className="patientID__input"
                type="text"
                placeholder="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              {/* <button className="patientsearch__btn">
                <MagnifyingGlass size={16} color="#454545" />
              </button> */}
            </div>
          </div>

          <SearchProfile
            searchField={searchField}
            setPatientProfileId={setPatientProfileId}
            setOpenFullProfile={setOpenFullProfile}
          />
        </div>
      ) : (
        <FullProfile
          patientProfileId={patientProfileId}
          setOpenFullProfile={setOpenFullProfile}
        />
      )}
    </div>
  );
};

export default Patients;
