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
  AddAppointmentFromForm,
} from "../../assets/js/serverApi";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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
  const id = parseInt(sessionStorage.getItem("id"));
  const [startDate, setStartDate] = useState();
  const [appointmentData, setAppointmentData] = useState({
    Nhi: "",
    PractitionerId: 0,
    PatientsId: id,
    FullName: "",
    Comments: "",
    ContactNumber: "",
    EmailAddress: "",
    HealthPractitionerType: "",
    PreferredAppointmentDate: null,
  });
  const [consentCheckbox, setConsentCheckbox] = useState(false);

  const handleOnChangeInput = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferredDate = (date) => {
    const dateFormat = new Date(date);
    setAppointmentData({
      ...appointmentData,
      PreferredAppointmentDate: dateFormat.toISOString(),
    });
    setStartDate(date);
  };

  const handlePractitionerType = (e) => {
    setAppointmentData({
      ...appointmentData,
      HealthPractitionerType: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(AddAppointmentFromForm, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((ex) => {
        console.log(`Error: ${ex.message}`);
      });
  };

  const getMinTime = () => {
    const minTime = new Date();
    minTime.setHours(8, 0, 0, 0);
    return minTime;
  };

  const getMaxTime = () => {
    const maxTime = new Date();
    maxTime.setHours(23, 0, 0, 0);
    return maxTime;
  };
  return (
    <div>
      <div className="appointment-wait__wrapper ">
        <h2>Appointment Form Submission,</h2>
        <br />
        <p className="appointment-wait-paragraph">
          Please carefully fill out the form below with accurate and complete
          information to ensure we can assist you effectively.
        </p>
        <br />
        <form
          className="appointment-wait-form__wrapper"
          onSubmit={handleFormSubmit}
        >
          <input
            className="appointment-wait-form-full__input"
            type="text"
            name="FullName"
            placeholder="Full name"
            onChange={(e) => handleOnChangeInput(e)}
          />
          <br />
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              className="appointment-wait-form-half__input"
              type="text"
              name="EmailAddress"
              placeholder="Email"
              onChange={(e) => handleOnChangeInput(e)}
            />
            <input
              className="appointment-wait-form-half__input"
              type="text"
              name="ContactNumber"
              placeholder="Contact number"
              onChange={(e) => handleOnChangeInput(e)}
            />
          </div>

          <br />
          <input
            className="appointment-wait-form-full__input"
            type="text"
            name="Nhi"
            placeholder="NHI (optional)"
            onChange={(e) => handleOnChangeInput(e)}
          />

          <div>
            <br />
            <br />
            <br />
            <h5>Service Details :</h5>

            <label style={{ fontSize: "12px" }}>Health Practitioner Type</label>
            <br />
            <select
              className="service-details-typeofPractitioner__select"
              onChange={(e) => handlePractitionerType(e)}
            >
              <option value=""></option>
              <option
                value="General Practitioner"
                name="HealthPractitionerType"
              >
                General Practitioner
              </option>
              <option value="Nurse" name="HealthPractitionerType">
                Nurse
              </option>
              <option value="Therapist" name="HealthPractitionerType">
                Therapist
              </option>
            </select>

            <br />
            <label style={{ fontSize: "12px" }}>Preffered Date</label>
            <br />
            <DatePicker
              className="datePicker"
              dateFormat="dd/MM/YYYY - hh:mm a"
              selected={startDate}
              onChange={(date) => handlePreferredDate(date)}
              minDate={new Date()}
              showTimeSelect
              timeIntervals={30}
              timeFormat="hh:mm a"
              minTime={getMinTime()}
              maxTime={getMaxTime()}
            />
            <br />
            <br />
            <textarea
              className="service-details-reason__textarea"
              placeholder="Comments or Requests"
              name="Comments"
              onChange={(e) => handleOnChangeInput(e)}
            ></textarea>
            <br />
            <br />
            <input
              type="checkbox"
              name="Consent"
              value={consentCheckbox}
              onChange={() => setConsentCheckbox(!consentCheckbox)}
            />
            <label style={{ fontSize: "12px" }}>
              {"   "}* I consent to the processing of my information for
              scheduling purposes.
            </label>

            <br />
            <button
              type="submit"
              className={`appointment-wait-form__btn ${
                consentCheckbox === false ? "btnDisabled" : ""
              }`}
              disabled={consentCheckbox === true ? false : true}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Appointment = () => {
  const [filterSearch, setFilterSearch] = useState("");
  //const [onlineRadio, setOnlineRadio] = useState("online");
  const [getStartedClicked, setGetStartedClicked] = useState(false);
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
          {getStartedClicked === true ? (
            <AppointmentWait />
          ) : (
            <div style={{ textAlign: "center", margin: "90px 0 0 130px" }}>
              <h2 style={{ width: "650px", lineHeight: "1.5" }}>
                Or to make the process easier, we offer the option to book an
                appointment based on the type of service or care you need and
                get seen by all, rather than selecting a specific practitioner.
              </h2>
              <button
                className="get-started__btn"
                onClick={() => setGetStartedClicked(true)}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
