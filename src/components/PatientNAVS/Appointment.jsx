import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlass,
  Check,
  PaperPlaneRight,
  X,
} from "@phosphor-icons/react";
import {
  GetHealthPractitionerData,
  GetPatient,
} from "../../assets/js/serverApi";

import "../../styles/appointmentstyles.css";
const ChosenPractitioner = ({ practitionerData, setPractitionerClicked }) => {
  return (
    <div>
      <div className="chosen-practitioner__wrapper">
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setPractitionerClicked(false)}
        >
          <X size={13} color="#202020" />
        </button>
        <h3>{practitionerData.fullName}</h3>
        <p style={{ fontSize: "12px" }}>{practitionerData.departmentRole}</p>
        <br />
        <p style={{ fontSize: "12px" }}>
          Email: {practitionerData.emailAddress}
        </p>
        <p style={{ fontSize: "12px" }}>Mobile: {practitionerData.mobile}</p>
        <p style={{ fontSize: "12px" }}>
          Preference: {practitionerData.workPreference}
        </p>

        <br />
        <p style={{ fontSize: "11px" }}>
          Send a message to {practitionerData.fullName}
        </p>
        <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
          <input
            className="chosen-pracitioner-inputmessage__input"
            type="text"
            placeholder="Send a message..."
          />
          <button className="chosen-practitioner__btn">
            <PaperPlaneRight size={13} color="#f3f3f3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ filterSearch }) => {
  const [practitioners, setPractioners] = useState([]);
  const [practitionerClicked, setPractitionerClicked] = useState(false);
  const [practitionerData, setPractitionerData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const practitionerData = async () => {
      try {
        const response = await fetch(GetHealthPractitionerData, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setPractioners(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    const id = parseInt(sessionStorage.getItem("id"));
    const checkPatient = async (retry = true) => {
      try {
        const response = await fetch(`${GetPatient}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (response.status === 302) {
          //302 is redericting to sign in screen because refresh token and jwt are expired.
          console.warn("302 detected, redirecting...");
          // Redirect to the new path
          navigate("/");
          return; // Exit the function to prevent further execution
        }

        if (response.status === 401 && retry) {
          // Retry the request once if a 401 status is detected
          console.warn("401 detected, retrying request...");
          return checkPatient(false); // Call with `retry` set to false
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        practitionerData();
      } catch (ex) {
        console.log(ex);
      }
    };

    checkPatient();
  }, []);

  const handleChosenPractitioner = (data) => {
    setPractitionerData(data);
    setPractitionerClicked(true);
  };
  return (
    <div className="result-cards-container__wrapper">
      <div className={practitionerClicked === true ? "overlay" : ""}></div>
      {practitionerClicked === true ? (
        <ChosenPractitioner
          practitionerData={practitionerData}
          setPractitionerClicked={setPractitionerClicked}
        />
      ) : (
        ""
      )}
      {practitioners
        .filter((data) =>
          filterSearch
            ? data.fullName
                ?.toLowerCase()
                .includes(filterSearch.toLowerCase()) ||
              data.departmentRole
                ?.toLowerCase()
                .includes(filterSearch.toLowerCase()) ||
              data.workPreference
                ?.toLowerCase()
                .includes(filterSearch.toLowerCase())
            : true
        )
        .map((data, index) => (
          <div key={data.id}>
            <button
              className="result-cards__wrapper"
              onClick={() => handleChosenPractitioner(data)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="result-card__img"
              />
              <div style={{ justifyItems: "start" }}>
                <h4>{data.fullName}</h4>
                <div style={{ fontSize: "12px", justifyItems: "start" }}>
                  <p>{data.departmentRole}</p>
                  <br />
                  <div>
                    <Check size={12} color="limegreen" />{" "}
                    <label>{data.workPreference}</label>
                  </div>
                  <div>
                    <Check size={12} color="limegreen" />{" "}
                    <label>Verified</label>
                  </div>
                  <div>
                    <Check size={12} color="limegreen" />{" "}
                    <label>Experienced</label>
                  </div>
                </div>
              </div>
            </button>
          </div>
        ))}
    </div>
  );
};

const AppointmentSearch = ({ filterSearch, setFilterSearch }) => {
  const handleRadio = (e) => {
    setFilterSearch(e.target.value);
  };

  return (
    <div>
      <div className="appointment-search__wrapper">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="online"
            checked={filterSearch === "online"}
            onChange={(e) => handleRadio(e)}
          />
          <label className="radio-label">Online</label>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="on-site"
            checked={filterSearch === "on-site"}
            onChange={(e) => handleRadio(e)}
          />
          <label className="radio-label">On-site</label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="flexible"
            checked={filterSearch === "flexible"}
            onChange={(e) => handleRadio(e)}
          />
          <label className="radio-label">flexible</label>
        </div>
      </div>
    </div>
  );
};

const AppointmentWait = () => {
  return (
    <div>
      <div className="appointment-wait__wrapper">
        <h2>Await available Health Practitioner</h2>
        <br />
        <p>
          Send all the details about you and what you need help with in the form
          below
        </p>
        <br />
        <form className="appointment-wait-form__wrapper">
          <input
            className="appointment-wait-form-full__input"
            type="text"
            placeholder="Full name"
          />
          <br />
          <br />
          <input
            className="appointment-wait-form-half__input"
            type="text"
            placeholder="Email"
          />
          <input
            className="appointment-wait-form-half__input"
            type="text"
            placeholder="Contact number"
          />
        </form>
      </div>
    </div>
  );
};

const Appointment = () => {
  const [filterSearch, setFilterSearch] = useState("");
  //const [onlineRadio, setOnlineRadio] = useState("online");
  return (
    <div style={{ margin: "50px 0 0 100px" }}>
      <div style={{ display: "flex", gap: "50px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className="appointment-search-container__wrapper">
              <div>
                <MagnifyingGlass size={15} />
                <input
                  className="appointment__input"
                  type="text"
                  placeholder="what are you looking for..."
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
              </div>
            </div>
            <AppointmentSearch
              filterSearch={filterSearch}
              setFilterSearch={setFilterSearch}
            />
          </div>
          <SearchResults filterSearch={filterSearch} />
        </div>

        <div>
          <AppointmentWait />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
