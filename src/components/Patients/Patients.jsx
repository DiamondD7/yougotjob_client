import React, { useEffect, useState } from "react";
import { ValidatePrac } from "../../assets/js/serverApi";

import SearchProfile from "./SearchProfile";
import FullProfile from "./FullProfile";

import "../../styles/patientsstyles.css";
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
