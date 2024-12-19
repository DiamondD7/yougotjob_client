import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { MockUserData } from "../../assets/js/mockChartData";
import {
  GetTotalAppointment,
  GetNextAppointment,
  UpdateIsAppointmentCompleted,
  GetPreviousApt,
  CreateNote,
  DeleteNote,
  GetSpecificNotes,
} from "../../assets/js/serverApi";
import { exportedMonthsArray } from "../../assets/js/months";
import {
  User,
  Calendar,
  CaretDown,
  CaretUp,
  BookOpenText,
  Notepad,
  Trash,
  EnvelopeOpen,
  Plus,
  ChatCenteredText,
  X,
  CircleNotch,
  CalendarSlash,
  NoteBlank,
} from "@phosphor-icons/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import "../../styles/dashboardstyles.css";

const SummaryCards = ({
  setNextAptBtn,
  setPrevAptBtn,
  inputDate,
  nextApt,
  prevApt,
  setActivateGoTo,
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleNextAptView = (e) => {
    e.preventDefault();
    setNextAptBtn(true);
  };
  //handles countdown
  useEffect(() => {
    const changingDate = new Date(inputDate);
    const currentDate = new Date();
    const totalSeconds = (changingDate - currentDate) / 1000;

    if (totalSeconds <= 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setActivateGoTo(true); //activates the btn go to, when countdown is finished
    } else if (totalSeconds > 0) {
      setDays(Math.floor(totalSeconds / 3600 / 24));
      setHours(Math.floor(totalSeconds / 3600) % 24);
      setMinutes(Math.floor(totalSeconds / 60) % 60);
    }

    let interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
        }
        return Math.floor(totalSeconds % 60);
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts or the effect is re-run
    return () => clearInterval(interval);
  }, [days, minutes, hours, seconds]);

  const day = <label className="time-indication">d</label>;
  const hour = <label className="time-indication">hr</label>;
  const min = <label className="time-indication">min</label>;
  const sec = <label className="time-indication">sec</label>;

  return (
    <div>
      <div className="dashboard-summary-cards__wrapper">
        <div className="dashboard-cards__wrapper">
          <div className="dashboard-card-title__wrapper">
            <div>
              <User size={19} color="#9DCD5A" />
            </div>
            <h5>Next appointment</h5>
          </div>
          {nextApt.length <= 0 ? (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <CalendarSlash size={25} color="rgba(0,0,0,0.4)" />
              <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "13px" }}>
                No upcoming appointment
              </p>
            </div>
          ) : (
            <>
              <div className="dashboard-patient-card__wrapper">
                {/* <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="test-picture"
              className="dashboard-card-profilepic"
            /> */}
                <div>
                  <h3>{nextApt.fullName}</h3>
                  <label className="patient-card-id__label">
                    NHI:{nextApt.nhi}
                  </label>
                </div>
              </div>
              <div className="dashboard-patient-card-details__wrapper">
                <h2 className="dashboard-patient-card-details-h2-schedule">
                  {new Date(nextApt.preferredAppointmentDate).toLocaleString(
                    "en-nz"
                  )}
                </h2>
                <h2 className="dashboard-patient-card-details-h2-countdown">
                  {days}
                  {day} : {hours}
                  {hour} : {minutes}
                  {min} : {seconds}
                  {sec}
                </h2>

                <button
                  className="dashboard-patient-card__btn"
                  onClick={(e) => handleNextAptView(e)}
                >
                  View
                </button>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-cards__wrapper">
          <div className="dashboard-card-title__wrapper">
            <div>
              <Calendar size={19} color="#9DCD5A" />
            </div>
            <h5>Previous appointment</h5>
          </div>
          {prevApt <= 0 ? (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <CalendarSlash size={25} color="rgba(0,0,0,0.4)" />
              <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "13px" }}>
                No previous appointment
              </p>
            </div>
          ) : (
            <>
              <div className="dashboard-patient-card__wrapper">
                {/* <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="test-picture"
              className="dashboard-card-profilepic"
            /> */}
                <div>
                  <h3>{prevApt.fullName}</h3>
                  <label className="patient-card-id__label">
                    NHI:{prevApt.nhi}
                  </label>
                </div>
              </div>

              <div className="dashboard-patient-card-details__wrapper">
                <h2 className="dashboard-patient-card-details-h2-schedule">
                  {new Date(prevApt.preferredAppointmentDate).toLocaleString(
                    "en-nz"
                  )}
                </h2>
                <h2 className="dashboard-patient-card-details-h2-schedule">
                  Accepted at:{" "}
                  {new Date(prevApt.acceptedJobDate).toLocaleString("en-nz")}
                </h2>
                <div className="previous-patient-view__wrapper">
                  <button
                    className="previous-patient-view__btn"
                    onClick={() => setPrevAptBtn(true)}
                  >
                    view
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-cards__wrapper">
          <div className="dashboard-card-title__wrapper">
            <div>
              <ChatCenteredText size={19} color="#9DCD5A" />
            </div>
            <h5>Messages</h5>
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <EnvelopeOpen size={25} color="rgba(0,0,0,0.4)" />
            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "13px" }}>
              No new messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrevAptView = ({ prevApt, setPrevAptBtn }) => {
  return (
    <div className="prevaptview__wrapper">
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setPrevAptBtn(false)}
      >
        <X size={15} />
      </button>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="prevapt-details-patient__wrapper">
          <h4>Details: Patient</h4>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "12px" }}>Name:</label>
            <label style={{ fontSize: "12px" }}>{prevApt.fullName}</label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "12px" }}>NHI:</label>
            <label style={{ fontSize: "12px" }}>{prevApt.nhi}</label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "12px" }}>Contact Number:</label>
            <label style={{ fontSize: "12px" }}>{prevApt.contactNumber}</label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "12px" }}>Email:</label>
            <label style={{ fontSize: "12px" }}>{prevApt.emailAddress}</label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "12px" }}>Preferred Date:</label>
            <label style={{ fontSize: "12px" }}>
              {new Date(prevApt.preferredAppointmentDate).toLocaleString(
                "en-nz"
              )}
            </label>
          </div>
          <p style={{ fontSize: "12px", marginTop: "15px" }}>
            Comments/Requests:
          </p>
          <textarea
            className="prevapt-textarea"
            value={prevApt.comments}
          ></textarea>
        </div>

        <div className="prevapt-details-diagnosis__wrapper">
          <h4>Details: Diagnosis</h4>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ fontSize: "12px" }}>Practitioner name:</label>
            <label style={{ fontSize: "12px" }}>
              {prevApt.practitionerName}
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: "12px" }}>Accepted Job Date:</label>
            <label style={{ fontSize: "12px" }}>
              {new Date(prevApt.appointmentDateCompleted).toLocaleDateString(
                "en-nz"
              )}
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <label style={{ fontSize: "12px" }}>
              {new Date(prevApt.appointmentDateCompleted).toLocaleTimeString(
                "en-nz"
              )}
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "12px" }}>Accepted Job Date:</label>
            <label style={{ fontSize: "12px" }}>
              {new Date(prevApt.acceptedJobDate).toLocaleDateString("en-nz")}
            </label>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <label style={{ fontSize: "12px" }}>
              {new Date(prevApt.acceptedJobDate).toLocaleTimeString("en-nz")}
            </label>
          </div>

          <label style={{ fontSize: "12px" }}>Conclusion/findings:</label>
          <textarea className="prevapt-textarea"></textarea>
        </div>
      </div>
    </div>
  );
};

const NextAptView = ({ nextApt, activateGoTo, setNextAptBtn }) => {
  const [openMeeting, setOpenMeeting] = useState(false);
  const handleFinaliseAuth = () => {
    const cliendId = import.meta.env.VITE_ZOOM_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_ZOOM_REDIRECT_URI;
    window.open(
      `https://zoom.us/oauth/authorize?response_type=code&client_id=${cliendId}&redirect_uri=${redirectUri}?id=${nextApt.id}`,
      "_blank",
      "noreferrer"
    );
  };

  const handleGoToZoomMeeting = (e) => {
    e.preventDefault();
    setOpenMeeting(true);
    window.open(nextApt.startZoomLink, "_blank", "noreferrer");
  };

  return (
    <div>
      <div className="nextaptview__wrapper">
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setNextAptBtn(false)}
        >
          <X size={15} />
        </button>
        {openMeeting === true ? (
          <div>
            <ZoomMeetingFinishConfirmation setNextAptBtn={setNextAptBtn} />
          </div>
        ) : (
          <div>
            <h4>Patient's Details</h4>
            <p style={{ fontSize: "12px" }}>{nextApt.nhi}</p>
            <br />
            <div>
              <div>
                <p style={{ fontSize: "12px" }}>
                  Full name: {nextApt.fullName}
                </p>
                <p style={{ fontSize: "12px" }}>{nextApt.emailAddress}</p>
                <p style={{ fontSize: "12px" }}>{nextApt.contactNumber}</p>
                <br />
                <p style={{ fontSize: "12px" }}>
                  Date:{" "}
                  {new Date(nextApt.preferredAppointmentDate).toLocaleString(
                    "en-nz"
                  )}
                </p>
              </div>
            </div>
            <button
              className={`dashboard-patient-info__btn ${
                activateGoTo === false ? "btnDisabled" : ""
              }`}
              onClick={(e) => handleGoToZoomMeeting(e)}
              disabled={activateGoTo === true ? false : true}
            >
              Go to the meeting
            </button>

            {/* if the practitioner created a zoom meeting, then isZoomMeetingCreated is true which will lead to the button to disappear */}
            {nextApt.isZoomMeetingCreated === false ? (
              <button
                className="dashboard-patient-card__btn"
                onClick={(e) => handleFinaliseAuth(e)}
              >
                Finalise & Authorize
              </button>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ZoomMeetingFinishConfirmation = ({ setNextAptBtn }) => {
  const handleCompleteAppointment = (e) => {
    e.preventDefault();
    //TODO: set appointmentCompleted to true in the db
    fetch(UpdateIsAppointmentCompleted, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: nextApt.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNextAptBtn(false);
      });
  };

  return (
    <div>
      <h4>Conclusion</h4>
      <textarea
        className="zoomconfirmation-textarea"
        placeholder="Conclusion/findings..."
      ></textarea>
      <p style={{ fontSize: "12px" }}>Conclude appointment?</p>
      <button
        className="zoomconfirmation-btn"
        onClick={(e) => handleCompleteAppointment(e)}
      >
        Yes
      </button>
    </div>
  );
};

const PatientLineGraph = () => {
  const [changeChartSubject, setChangeChartSubject] = useState(1);
  const [userData, setUserData] = useState({
    labels: MockUserData.map((data) => data.monthName),
    datasets: [
      {
        label: "Amount of Appointments per month",
        data: MockUserData.map((data) => data.appointments),
        backgroundColor: "#9dcd5a",
        borderColor: "#9dcd5a",
      },
    ],
  });

  const handleChangeChartSubject = () => {
    if (changeChartSubject < 3) {
      setChangeChartSubject(changeChartSubject + 1);
    } else {
      setChangeChartSubject(1);
    }
  };

  useEffect(() => {
    if (changeChartSubject === 1) {
      setUserData({
        labels: MockUserData.map((data) => data.monthName),
        datasets: [
          {
            label: "Amount of Appointments per month",
            data: MockUserData.map((data) => data.appointments),
            backgroundColor: "#9dcd5a",
            borderColor: "#9dcd5a",
          },
        ],
      });
    } else if (changeChartSubject === 2) {
      setUserData({
        labels: MockUserData.map((data) => data.monthName),
        datasets: [
          {
            label: "Amount of Flu Vaccination per month",
            data: MockUserData.map((data) => data.fluVacinnation),
            backgroundColor: "purple",
            borderColor: "purple",
          },
        ],
      });
    } else {
      setUserData({
        labels: MockUserData.map((data) => data.monthName),
        datasets: [
          {
            label: "Amount of Covid Vaccination per month",
            data: MockUserData.map((data) => data.covidVaccination),
            backgroundColor: "red",
            borderColor: "red",
          },
        ],
      });
    }
  }, [changeChartSubject]);

  return (
    <div>
      <div className="dashboard-graph__wrapper">
        <Line data={userData} />
        <button
          className="dashboard-graph-switch__btn"
          onClick={handleChangeChartSubject}
        >
          switch
        </button>
      </div>
    </div>
  );
};

const AppointmentContainer = () => {
  const [openAppointmentContainer, setOpenAppointmentContainer] =
    useState(false);
  return (
    <div>
      <button
        className="appointment-container__wrapper"
        onClick={() => setOpenAppointmentContainer(!openAppointmentContainer)}
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1 style={{ color: "#9dcd5a" }}>5</h1>
            <h4 style={{ width: "100px", fontSize: "13px" }}>
              appointments due today
            </h4>
          </div>
          <p className="appointment-container__text">
            {openAppointmentContainer === true ? (
              <>
                close <CaretUp size={16} />
              </>
            ) : (
              <>
                expand <CaretDown size={16} />
              </>
            )}
          </p>
        </div>
      </button>
      <div
        className={`appointment-container__wrapper ${
          openAppointmentContainer === true
            ? "fullsize-appointment"
            : "fullsize-appointment-down"
        }`}
      >
        <table
          className={`appointment-fullsize__table ${
            openAppointmentContainer === false ? "hideTableData" : ""
          }`}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sierra, Aaron</td>
              <td>15 Mar 2024 12:40pm</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Sierra, Aaron</td>
              <td>15 Mar 2024 12:40pm</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Sierra, Aaron</td>
              <td>15 Mar 2024 12:40pm</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Sierra, Aaron</td>
              <td>15 Mar 2024 12:40pm</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Sierra, Aaron</td>
              <td>15 Mar 2024 12:40pm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
const TotalAppointmentContainer = () => {
  const id = parseInt(sessionStorage.getItem("id"));
  const [totalApt, setTotalApt] = useState(0);

  useEffect(() => {
    fetch(`${GetTotalAppointment}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTotalApt(res);
      });
  }, []);
  return (
    <div>
      <div className="total-appointment__wrapper">
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <h1 style={{ color: "#9dcd5a" }}>{totalApt}</h1>
          <h4 style={{ width: "100px", fontSize: "13px" }}>
            total appointments
          </h4>
        </div>
        {/* <div>
          <p style={{ fontSize: "13px" }}>since 2019</p>
          <p style={{ fontSize: "13px", color: "#9dcd5a" }}>+ 8%</p>
        </div> */}
      </div>
    </div>
  );
};
const ContinueLearningContainer = () => {
  return (
    <div>
      <div className="continue-learning-container__wrapper">
        <h5 style={{ display: "flex", gap: "5px", padding: "10px" }}>
          {" "}
          <BookOpenText size={19} color="#9dcd5a" /> continue learning
        </h5>
        <div style={{ marginTop: "5px", textAlign: "center" }}>
          <label style={{ color: "rgba(0,0,0,0.4)" }}>Dr. Henry Campbell</label>

          <p
            style={{
              color: "rgba(0,0,0,0.4)",
              fontSize: "13px",
            }}
          >
            17/12/2023
          </p>
          <img
            className="continue-learning__img"
            src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="module-picture"
          />
          <h3 style={{ marginTop: "5px" }}>
            Virus 101 - Physicians guide to 0% virus free
          </h3>
        </div>
      </div>
      <button className="btnclear" style={{ margin: "10px 0 0 10px" }}>
        Continue reading
      </button>
    </div>
  );
};

const WeeklyScheduleContainer = () => {
  let today = new Date();
  let currentDate = today.getDate();
  let weeklyDate = []; //initialising empty array, before populating it.
  let sundayDate = currentDate - today.getDay(); //gets the sunday date of the week by subtracting the current date and the day (eg. sun(0), mon(1)...)
  // let lastDateOfWeek = 7 - today.getDay();
  //gets the value of the max days of the week for the for loop below.
  const weeklyDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let count = 0;
  var lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate(); //gets us the last day of the current month

  var firstDayOfTheCurrentMonth = new Date( //first day of the current month.
    today.getFullYear(),
    today.getMonth(),
    1
  );
  var lastDayOfThePrevMonth = new Date(firstDayOfTheCurrentMonth - 1); //minus one the firstDayOfTheCurrentMonth, will get me the last day of the prev month by using .getMonth()

  //alternative has a condition statements to use the right initial date of the for loop
  let alternative =
    sundayDate < 0
      ? lastDayOfThePrevMonth.getDate() - sundayDate * -1 //sundayDate * -1 will help the logic to convert negative numbers to positive.
      : sundayDate === 0
      ? lastDayOfThePrevMonth.getDate()
      : sundayDate;

  for (let i = alternative; i < alternative + 7; i++) {
    // i is the sunday date and the max value is the currentDate plus the max days

    weeklyDate.push(i); //populating the array to display.

    if (
      i > lastDayOfMonth ||
      (i > lastDayOfThePrevMonth.getDate() && sundayDate <= 0) //TWO conditions to check if i is less than the prevMonth or currentMonth's last day
    ) {
      count = count + 1; //counting to help us get the remaining iteration that this whole loop has.
      for (let j = 1; j <= count; j++) {
        weeklyDate[weeklyDate.length - 1] = j;
      }
    }
  }

  return (
    <div>
      <div className="weekly-container__wrapper">
        <div className="weekly-calendar__wrapper">
          <h2 className="weekly-calendar-month-header__text">
            {exportedMonthsArray[today.getMonth()]} {today.getFullYear()}
          </h2>
          <div
            style={{
              display: "flex",
              height: "190px",
              overflow: "auto",
              marginTop: "10px",
            }}
          >
            {weeklyDate.map((day, index) => (
              <div className="days-daily__wrapper" key={index}>
                <h4 key={index}>{weeklyDay[index]}</h4>

                <h4
                  style={
                    currentDate === day
                      ? {
                          color: "#f3f3f3",
                          borderRadius: "50px",
                          border: "1px solid #9dcd5a",
                          backgroundColor: "#9dcd5a",
                          display: "inline-block",
                          padding: "0 25px",
                        }
                      : { color: "rgba(0,0,0,0.5)" }
                  }
                >
                  {day}
                </h4>
                <p>appointment @ 12 55pm</p>
                <p>appointment @ 12 55pm</p>
                <p>appointment @ 12 55pm</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InvoiceContainer = () => {
  const testinvoice = [
    {
      Date: "23/02/2024",
      Code: 3445,
      Description: "Short Consultation",
      Tax: 0.0,
      Total: 76.0,
    },
    {
      Date: "23/02/2024",
      Code: 3445,
      Description: "Short Consultation",
      Tax: 0.0,
      Total: 76.0,
    },
    {
      Date: "23/02/2024",
      Code: 3445,
      Description: "Short Consultation",
      Tax: 0.0,
      Total: 76.0,
    },
    {
      Date: "23/02/2024",
      Code: 3445,
      Description: "Short Consultation",
      Tax: 0.0,
      Total: 76.0,
    },
    {
      Date: "23/02/2024",
      Code: 3445,
      Description: "Short Consultation",
      Tax: 0.0,
      Total: 76.0,
    },
  ];

  return (
    <div>
      <div className="dashboard-invoice-container__wrapper">
        <table className="dashboard-invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Invoice Code</th>
              <th>Description</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {testinvoice.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.Date}</td>
                <td>{data.Code}</td>
                <td>{data.Description}</td>
                <td>${data.Tax}</td>
                <td>${data.Total}</td>
                <td>
                  <button className="btnclear">view</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const NotesContainer = () => {
  const navigate = useNavigate();
  const id = parseInt(sessionStorage.getItem("id"));
  const [openFormAdd, setOpenFormAdd] = useState(false);
  const [noteData, setNoteData] = useState({
    PractitionerId: id,
    NoteTitle: "",
    NoteContent: "",
    CreatedDate: null,
  });
  const [notes, setNotes] = useState([]);

  const noteTest =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora incidunt ab natus unde quae fugiat nihil esse error doloremque atque. Voluptas repellat neque earum quos! Ipsam, qui! Unde, impedit vero!";

  const handleAddNote = (e) => {
    e.preventDefault();
    AddNote();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${GetSpecificNotes}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setNotes(res.returnStatus.data);
      });
  };

  const AddNote = async (retry = true) => {
    try {
      const response = await fetch(CreateNote, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          PractitionerId: noteData.PractitionerId,
          NoteTitle: noteData.NoteTitle,
          NoteContent: noteData.NoteContent,
        }),
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
        return AddNote(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      //console.log(res);
      fetchData(); //refresh the data to load new note
      setOpenFormAdd(false); // Close form only if the note was added successfully
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const handleDeleteNote = async (e, id, retry = true) => {
    e.preventDefault();
    try {
      const response = await fetch(DeleteNote, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: id,
        }),
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
        return AddNote(id, false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      //console.log(res);
      fetchData(); //refresh the data to load
    } catch (error) {
      console.log("Error fetching data: ", error.message);
    }
  };

  const handleNoteChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="notes__wrapper">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Notepad size={19} color="#9DCD5A" />
            <h5>Notes</h5>
          </div>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setOpenFormAdd(true)}
          >
            <Plus size={15} color="#515151" />
          </button>
        </div>
        {openFormAdd === true ? (
          <div style={{ marginTop: "10px" }}>
            <form className="note-form-container" onSubmit={handleAddNote}>
              <div>
                <input
                  className="note-form-input"
                  type="text"
                  placeholder="Title"
                  name="NoteTitle"
                  onChange={(e) => handleNoteChange(e)}
                />
                <br />
                <textarea
                  className="note-form-textarea"
                  placeholder="write something here..."
                  name="NoteContent"
                  onChange={(e) => handleNoteChange(e)}
                ></textarea>
              </div>
              <div style={{ padding: "5px 10px" }}>
                <button className="note-form-btn" type="submit">
                  Submit
                </button>
                <button
                  className="note-form-btn-cancel"
                  onClick={() => setOpenFormAdd(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}

        {notes.length <= 0 && openFormAdd === false ? (
          <div style={{ textAlign: "center", marginTop: "45px" }}>
            <NoteBlank size={25} color="rgba(0,0,0,0.4)" />
            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "13px" }}>
              No notes
            </p>
          </div>
        ) : (
          <div>
            {notes.map((items, index) => (
              <div style={{ marginTop: "10px" }} key={items.id}>
                <button
                  className="note-container"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ textAlign: "start" }}>
                    <h5 style={{ fontSize: "13px" }}>{items.noteTitle}</h5>
                    <p>
                      {items.noteContent.length > 70
                        ? `${items.noteContent.substring(0, 80)}....`
                        : items.noteContent}
                    </p>
                  </div>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleDeleteNote(e, items.id)}
                  >
                    <Trash size={17} color="#DA4A1A" />
                  </button>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [nextAptBtn, setNextAptBtn] = useState(false);
  const [prevAptBtn, setPrevAptBtn] = useState(false);
  const [inputDate, setInputDate] = useState(""); //for timer
  const [activateGoTo, setActivateGoTo] = useState(false);
  const [nextApt, setNextApt] = useState([]);
  const [prevApt, setPrevApt] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetNextAppointment}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.returnStatus.data !== undefined) {
          setNextApt(res.returnStatus.data[0]);
          //format date and setting for timer
          const dateFormat = new Date(
            res.returnStatus.data[0].preferredAppointmentDate
          );
          setInputDate(dateFormat.toLocaleString());
        }
      });

    //fetching the previous apt
    fetch(`${GetPreviousApt}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPrevApt(res.returnStatus.data[0]);
        setLoading(false); //MIGHT CHANGE THE LOADING.
      });
  };
  return (
    <div>
      {nextAptBtn === true ? (
        <div>
          {" "}
          <div className="overlay"></div>{" "}
          <NextAptView
            nextApt={nextApt}
            activateGoTo={activateGoTo}
            setNextAptBtn={setNextAptBtn}
          />{" "}
        </div>
      ) : (
        ""
      )}

      {prevAptBtn === true ? (
        <div>
          {" "}
          <div className="overlay"></div>{" "}
          <PrevAptView prevApt={prevApt} setPrevAptBtn={setPrevAptBtn} />
        </div>
      ) : (
        ""
      )}

      {loading === false ? (
        <div>
          <div style={{ display: "flex" }}>
            <SummaryCards
              setNextAptBtn={setNextAptBtn}
              setPrevAptBtn={setPrevAptBtn}
              inputDate={inputDate}
              nextApt={nextApt}
              prevApt={prevApt}
              setActivateGoTo={setActivateGoTo}
            />
            <NotesContainer />
          </div>
          <div className="dashboard-graph-container__wrapper">
            <div className="dashboard-graph__wrapper">
              <PatientLineGraph />
            </div>
            <div>
              <TotalAppointmentContainer />
              <AppointmentContainer />
            </div>
            <div>
              <ContinueLearningContainer />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "20px 0 0 20px",
              }}
            >
              <InvoiceContainer />
            </div>
            <div className="weekly-schedule-container__wrapper">
              <WeeklyScheduleContainer />
            </div>
          </div>
        </div>
      ) : (
        <div className="display-loading-icon__wrapper">
          <CircleNotch size={45} color="#202020" className={"loading-icon"} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
