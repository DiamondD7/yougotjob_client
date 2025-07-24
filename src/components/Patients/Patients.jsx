import React, { useEffect, useState } from "react";
import { ValidatePrac } from "../../assets/js/serverApi";
import { MagnifyingGlass } from "@phosphor-icons/react";
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
            <h1 style={{ color: "#f3f3f3" }}>
              Search, view, and manage patient records all in one place.
            </h1>
            <p style={{ color: "#f3f3f3", padding: "10px" }}>
              Find patients by typing their full name or phone number. Once
              found, click on a patient to view their details, appointments, or
              comments.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label className="search-patient__icon">
                <MagnifyingGlass size={23} />
              </label>
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
