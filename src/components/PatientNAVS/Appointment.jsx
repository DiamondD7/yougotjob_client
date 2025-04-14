import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlass,
  Check,
  X,
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "@phosphor-icons/react";
import {
  GetHealthPractitionerData,
  GetPatient,
  AddAppointmentFromForm,
  UploadFile,
} from "../../assets/js/serverApi";
import {
  getDaysFromPreviousMonth,
  getNextMonthDays,
  currentYear,
  handleYearChange,
} from "../../assets/js/months";
import DatePicker from "react-datepicker";
import AppointmentImage from "../../assets/img/AppointmentImage.png";

import "react-datepicker/dist/react-datepicker.css";
import "../../styles/appointmentstyles.css";
const CalendarConfirmation = ({ openConfimation }) => {
  return (
    <div
      className={`calendar-confirmation__wrapper ${
        openConfimation === true ? "openModalConfirmation" : ""
      }`}
    >
      <div className="calendar-confirmation-times__wrapper">
        <button>8:00</button>
        <button>9:00</button>
        <button>10:00</button>
        <button>11:00</button>
        <button>12:00</button>
        <button>13:00</button>
        <button>14:00</button>
        <button>15:00</button>
        <button>16:00</button>
        <button>17:00</button>
        <button>18:00</button>
        <button>19:00</button>
      </div>
      <button className="calendar-confirmation-submit__btn">Confirm</button>
    </div>
  );
};

const CalendarView = ({ setOpenConfirmation }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  let today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]); //
  const [selectedMaxMonthDays, setSelectedMaxMonthDays] = useState(0); //sets the max days of each month.
  const [selectedDay, setSelectedDay] = useState(0);

  const nextMonthDays = getNextMonthDays(
    today.getFullYear(),
    months,
    selectedMonth
  );
  const previousMonthDays = getDaysFromPreviousMonth(
    today.getFullYear(),
    months,
    selectedMonth
  );
  const [selectedYear, setSelectedYear] = useState(currentYear); //sets its current year
  const [fullDate, setFullDate] = useState(
    handleYearChange(today.getFullYear()) //calling a function from months.js file to update the month list.
  );

  useEffect(() => {
    refreshCalendarList(); //use this to refresh the whole calendar. Incase there might be changes.
  }, [fullDate, selectedMonth]); //will run this again once it senses that there is a change in 'fullDate'.

  const refreshCalendarList = () => {
    fullDate.map((month) => {
      if (month.monthName === selectedMonth) {
        setSelectedMaxMonthDays(month.maxDays);
        setSelectedMonth(month.monthName);
      } //handles the current month and the current month's max days.
    });
  };
  useEffect(() => {
    setFullDate(handleYearChange(parseInt(selectedYear))); //updating the full calendar date if there is changes in year.
  }, [selectedYear]); //this will only run when the state got change

  const handleMonthChanged = (month, isIncrease) => {
    if (month === "Jan" && isIncrease === false) {
      setSelectedMonth(months[0]);
    } else if (month === "Dec" && isIncrease === true) {
      setSelectedMonth(months[11]);
    } else if (isIncrease === true) {
      // setSelectedMonth(selectedMonth + 1);
      let indexOfNextMonth = months.indexOf(selectedMonth) + 1;
      setSelectedMonth(months[indexOfNextMonth]);
    } else {
      let indexOfPreviousMonth = months.indexOf(selectedMonth) - 1;
      setSelectedMonth(months[indexOfPreviousMonth]);
    }

    handleSelectedDay(0, false);
  };

  const handleSelectedDay = (day, isOpened) => {
    setSelectedDay(day);
    setOpenConfirmation(isOpened);
  };
  return (
    <div>
      <div className="calendar-view__wrapper">
        <div style={{ display: "flex", alignContent: "center", gap: "10px" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleMonthChanged(selectedMonth, false)}
          >
            <ArrowLeft size={12} />
          </button>
          <p>
            <strong>
              {selectedMonth} {today.getFullYear()}
            </strong>
          </p>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleMonthChanged(selectedMonth, true)}
          >
            <ArrowRight size={12} />
          </button>
        </div>
        <div className="calendar-view-days__wrapper">
          {daysOfWeek.map((day, index) => (
            <label key={index}>{day}</label>
          ))}
        </div>
        <div className="calendar-view-daysMonth__wrapper">
          {previousMonthDays.map((day, index) => (
            <div
              className="calendar-prevMonthDays__btn prev-nextMonthDays"
              key={index}
            >
              {day}
            </div>
          ))}
          {days.map(
            (day, index) => (
              days.splice(selectedMaxMonthDays),
              (day <= today.getDate() &&
                selectedMonth === months[today.getMonth()] &&
                parseInt(selectedYear) === currentYear) ||
              months.indexOf(selectedMonth) < //getting the index of selectedMonth from 0 to 11: 0 means Jan
                months.indexOf(months[today.getMonth()]) ? ( //is LESS than the indexOf the currentMonth. because if we dont do indexOf then the output will just be a string eg. "Mar"
                <button
                  className="calendar-prevMonthDays__btn daysDisabled"
                  disabled={true}
                  key={index}
                >
                  {day}
                </button>
              ) : (
                <button
                  className={`calendar-days-avail__btn ${
                    selectedDay === day ? "selectedDay" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectedDay(day, true)}
                >
                  {day}
                </button>
              )
            )
          )}
          {nextMonthDays.map((day, index) => (
            <div
              className="calendar-prevMonthDays__btn prev-nextMonthDays"
              key={index}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChosenPractitioner = ({ practitionerData, setPractitionerClicked }) => {
  const [openConfimation, setOpenConfirmation] = useState(false);
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
          <X size={16} color="#202020" />
        </button>

        <div>
          <div style={{ display: "flex", gap: "20px" }}>
            <img
              src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="chosen-practitioner__img"
            />
            <div>
              <h3>{practitionerData.fullName}</h3>
              {/* <p>{practitionerData.role}</p> */}

              <div className="chosen-profile-details__wrapper">
                <label style={{ fontSize: "12px" }}>Gender: </label>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  Male
                </label>
                <br />
                <label style={{ fontSize: "12px" }}>Email: </label>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {practitionerData.emailAddress || "N/A"}
                </label>
                <br />
                <label style={{ fontSize: "12px" }}>Mobile: </label>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {practitionerData.mobileNumber || "N/A"}
                </label>
              </div>

              <div className="chosen-profile-details__wrapper">
                <label style={{ fontSize: "12px" }}>Registration #: </label>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {practitionerData.registrationNumber || "N/A"}
                </label>
                <br />
                <label style={{ fontSize: "12px" }}>
                  Years of experience:{" "}
                </label>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  10
                </label>
                <br />
                <label style={{ fontSize: "12px" }}>Work preference: </label>
                <label style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {practitionerData.workPreference || "N/A"}
                </label>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <h4>Professional testimony</h4>
            <div className="chosen-professional-details__wrapper">
              <p className="chosen-professional-details__p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio vero fugiat velit cumque tenetur aliquam praesentium
                accusantium laborum, labore itaque. Recusandae inventore maiores
                tempore praesentium, officiis consectetur autem. Minima,
                accusamus.
              </p>
            </div>
          </div>
          <br />
          <h4>Availability</h4>
          <div style={{ display: "flex" }}>
            <CalendarView setOpenConfirmation={setOpenConfirmation} />
            <CalendarConfirmation openConfimation={openConfimation} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({
  filterSearch,
  practitionerClicked,
  setPractitionerClicked,
}) => {
  const [practitioners, setPractioners] = useState([]);

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
    <>
      {practitionerClicked === true ? (
        <div>
          <ChosenPractitioner
            practitionerData={practitionerData}
            setPractitionerClicked={setPractitionerClicked}
          />
        </div>
      ) : (
        <div className="result-cards-container__wrapper">
          {/* <div className={practitionerClicked === true ? "overlay" : ""}></div> */}
          {/* {practitionerClicked === true ? (
          <ChosenPractitioner
            practitionerData={practitionerData}
            setPractitionerClicked={setPractitionerClicked}
          />
        ) : (
          ""
        )} */}
          {practitioners
            .filter((data) =>
              filterSearch
                ? data.fullName
                    ?.toLowerCase()
                    .includes(filterSearch.toLowerCase()) ||
                  data.role
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
                      <p>{data.role}</p>
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
      )}
    </>
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

const AppointmentWait = ({ autofillData }) => {
  const id = parseInt(sessionStorage.getItem("id"));
  const [startDate, setStartDate] = useState();
  const [appointmentData, setAppointmentData] = useState({
    // nhi: autofillData.nhi,
    PractitionerId: 0,
    PatientsId: id,
    Duration: 0,
    FullName: autofillData.fullName,
    Comments: "",
    ContactNumber: autofillData.mobileNumber || "",
    EmailAddress: autofillData.emailAddress,
    HealthPractitionerType: "",
    PreferredAppointmentDate: null,
    AppointmentType: "",
    StreetAddress: "",
    Suburb: "",
    City: "",
    PostCode: "",
  });
  const [consentCheckbox, setConsentCheckbox] = useState(false);
  const [files, setFiles] = useState([]);

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
  const handleAppointmentType = (e) => {
    setAppointmentData({
      ...appointmentData,
      AppointmentType: e.target.value,
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
        if (files) {
          handleFilesUpload(res.returnStatus.aptId);
        }
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

  const handleFileChange = (event) => {
    // Get the current files selected by the user
    const newFiles = event.target.files;

    // Convert the FileList to an array and append it to the existing files
    setFiles((prevFiles) => {
      return [...prevFiles, ...Array.from(newFiles)];
    });
  };

  const handleFilesUpload = async (id) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(`${UploadFile}/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading files");
      }

      const data = await response.json();
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
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
            disabled
            value={autofillData.fullName}
          />
          <br />
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              className="appointment-wait-form-half__input"
              type="text"
              name="EmailAddress"
              placeholder="Email"
              disabled
              value={autofillData.emailAddress}
            />
            <input
              className="appointment-wait-form-half__input"
              type="text"
              name="ContactNumber"
              placeholder="Contact number"
              required
              disabled={autofillData.mobileNumber === null ? false : true}
              value={autofillData.mobileNumber}
              onChange={(e) => handleOnChangeInput(e)}
            />
          </div>

          {/* <br />
          <input
            className="appointment-wait-form-full__input"
            type="text"
            name="nhi"
            placeholder="NHI"
            disabled
            value={autofillData.nhi}
          /> */}

          {appointmentData.AppointmentType === "on-site" ? (
            <div>
              <p
                style={{
                  fontSize: "11px",
                  marginTop: "10px",
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                *if your appointment type is on-site, please fill address
              </p>
              <input
                className="appointment-wait-form-full__input"
                type="text"
                name="StreetAddress"
                placeholder="Street Address"
                onChange={(e) => handleOnChangeInput(e)}
                required
              />
              <br />
              <br />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  className="appointment-wait-form-half__input"
                  type="text"
                  name="Suburb"
                  placeholder="Suburb"
                  onChange={(e) => handleOnChangeInput(e)}
                  required
                />
                <input
                  className="appointment-wait-form-half__input"
                  type="text"
                  name="PostCode"
                  placeholder="Post Code"
                  onChange={(e) => handleOnChangeInput(e)}
                  required
                />
              </div>

              <br />
              <input
                className="appointment-wait-form-full__input"
                type="text"
                name="City"
                placeholder="City"
                onChange={(e) => handleOnChangeInput(e)}
                required
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <br />
            <h5>Service Details :</h5>

            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <label style={{ fontSize: "12px" }}>Appointment Type</label>
                <br />
                <select
                  className="service-details-typeofPractitioner__select"
                  onChange={(e) => handleAppointmentType(e)}
                >
                  <option value=""></option>
                  <option value="phone">Phone call</option>
                  <option value="online" name="AppointmentType">
                    Online (ZOOM)
                  </option>
                  <option value="on-site" name="AppointmentType">
                    On-site
                  </option>
                </select>
                <br />
              </div>
              <div>
                <label style={{ fontSize: "12px" }}>
                  Health Practitioner Type
                </label>
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
              </div>
            </div>
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
            <label style={{ fontSize: "12px" }}>Upload documents</label>
            <br />
            <input type="file" multiple onChange={handleFileChange} />
            {files.map((items, index) => (
              <p key={index} style={{ fontSize: "12px" }}>
                {items.name}
              </p>
            ))}
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
  const [practitionerClicked, setPractitionerClicked] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  //const [onlineRadio, setOnlineRadio] = useState("online");
  const [getStartedClicked, setGetStartedClicked] = useState(false);
  const [autofillData, setAutoFillData] = useState([]);
  const navigate = useNavigate();

  const handleAutoFill = (e) => {
    e.preventDefault();

    const fetchDataAsync = async (retry = true) => {
      try {
        const id = parseInt(sessionStorage.getItem("id"));
        const response = await fetch(`${GetPatient}/${id}`, {
          method: "GET",
          headers: {
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
          return fetchDataAsync(false); // Call with `retry` set to false
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setAutoFillData(data);
        setGetStartedClicked(true);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchDataAsync();
  };

  return (
    <div style={{ margin: "50px 0 0 100px" }}>
      {sessionStorage.getItem("isVerified") === "true" ? (
        <div style={{ display: "flex", gap: "50px" }}>
          {/* <div>
          {practitionerClicked === false ? (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div className="appointment-search-container__wrapper">
                <div>
                  <MagnifyingGlass size={15} />
                  <input
                    className="appointment__input"
                    type="text"
                    placeholder="Practitioner or service"
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="appointment-search-container__wrapper">
                <div>
                  <MapPin size={15} />
                  <input
                    className="appointment__input"
                    type="text"
                    placeholder="City or postal code"
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                </div>
              </div>
              <AppointmentSearch
                filterSearch={filterSearch}
                setFilterSearch={setFilterSearch}
              />
            </div>
          ) : (
            ""
          )}
          <SearchResults
            filterSearch={filterSearch}
            practitionerClicked={practitionerClicked}
            setPractitionerClicked={setPractitionerClicked}
          />
        </div> */}

          <div>
            {getStartedClicked === true ? (
              <AppointmentWait autofillData={autofillData} />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "100px 0 0 0",
                  padding: "10px",
                }}
              >
                <div style={{ width: "500px" }}>
                  <h2 style={{ lineHeight: "1.5" }}>
                    Seamless & Efficient Booking – Connecting You Instantly!
                  </h2>
                  {/* <h2 style={{ lineHeight: "1.5", width: "500px" }}>
                To streamline the booking process, we currently offer a simple
                way to schedule an appointment based on the type of service or
                care you need, rather than selecting a specific practitioner.
              </h2> */}

                  <p>
                    An appointment form is available{" "}
                    <strong>at the moment</strong> as part of our initial{" "}
                    <strong>MVP</strong> launch, and we are continuously working
                    to expand this booking feature. Stay tuned for more updates!
                  </p>
                  <button
                    className="get-started__btn"
                    onClick={(e) => handleAutoFill(e)}
                  >
                    Book an appointment
                  </button>
                </div>

                <div>
                  <img src={AppointmentImage} className="appointmentImage" />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <h2>Account is not verified</h2>
          <br />
          <p>
            You can not request an appointment yet, you need your account to be
            verified by our team first.
          </p>
        </>
      )}
    </div>
  );
};

export default Appointment;
