import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

import "../../styles/patientsstyles.css";
import SearchProfile from "./SearchProfile";
import FullProfile from "./FullProfile";
const Patients = () => {
  const [searchField, setSearchField] = useState("");
  const [openFullProfile, setOpenFullProfile] = useState(false); //handles full profile click
  const [fullProfileData, setFullProfileData] = useState([]);
  return (
    <div>
      {openFullProfile === false ? (
        <div>
          <div className="patientsId-search__wrapper">
            <div>
              <input
                className="patientID__input"
                type="text"
                placeholder="Patient ID/First or Last Name"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <button className="patientsearch__btn">
                <MagnifyingGlass size={16} color="#454545" />
              </button>
            </div>
          </div>

          <SearchProfile
            searchField={searchField}
            setFullProfileData={setFullProfileData}
            setOpenFullProfile={setOpenFullProfile}
          />
        </div>
      ) : (
        <FullProfile
          fullProfileData={fullProfileData}
          setOpenFullProfile={setOpenFullProfile}
        />
      )}
    </div>
  );
};

export default Patients;
