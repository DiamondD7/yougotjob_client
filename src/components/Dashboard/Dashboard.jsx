import React, { useState, useEffect } from "react";
import { MockUserData } from "../../assets/js/mockChartData";
import {
  User,
  Calendar,
  CaretDown,
  CaretUp,
  BookOpenText,
} from "@phosphor-icons/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import "../../styles/dashboardstyles.css";

const SummaryCards = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [inputDate, setInputDate] = useState("27 Feb 2024 15:50:00");
  const [currentDate, setCurrentDate] = useState(inputDate);

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
          <div className="dashboard-patient-card__wrapper">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="test-picture"
              className="dashboard-card-profilepic"
            />
            <div>
              <h3>Aaron Sierra</h3>
              <label className="patient-card-id__label">ID:30004997</label>
            </div>
          </div>
          <div className="dashboard-patient-card-details__wrapper">
            <h2 className="dashboard-patient-card-details-h2-schedule">
              23/01/2024 12:40pm
            </h2>
            <h2 className="dashboard-patient-card-details-h2-countdown">
              {days}
              {day} : {hours}
              {hour} : {minutes}
              {min} : {seconds}
              {sec}
            </h2>
          </div>
        </div>

        <div className="dashboard-cards__wrapper">
          <div className="dashboard-card-title__wrapper">
            <div>
              <Calendar size={19} color="#9DCD5A" />
            </div>
            <h5>Previous appointment</h5>
          </div>
          <div className="dashboard-patient-card__wrapper">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="test-picture"
              className="dashboard-card-profilepic"
            />
            <div>
              <h3>John Doe</h3>
              <label className="patient-card-id__label">ID:54004987</label>
            </div>
          </div>

          <div className="dashboard-patient-card-details__wrapper">
            <h2 className="dashboard-patient-card-details-h2-schedule">
              19/01/2024 8:40am
            </h2>
            <div className="previous-patient-view__wrapper">
              <button className="previous-patient-view__btn">view</button>
            </div>
          </div>
        </div>

        <div className="dashboard-cards__wrapper">
          <div className="dashboard-card-title__wrapper">
            <div>
              <User size={19} color="#9DCD5A" />
            </div>
            <h5>Next appointment</h5>
          </div>
          <div className="dashboard-patient-card__wrapper">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="test-picture"
              className="dashboard-card-profilepic"
            />
            <div>
              <h3>Aaron Sierra</h3>
              <label className="patient-card-id__label">ID:30004997</label>
            </div>
          </div>
          <div className="dashboard-patient-card-details__wrapper">
            <h2 className="dashboard-patient-card-details-h2-schedule">
              23/01/2024 12:40pm
            </h2>
            <h2 className="dashboard-patient-card-details-h2-countdown">
              {days}
              {day} : {hours}
              {hour} : {minutes}
              {min} : {seconds}
              {sec}
            </h2>
          </div>
        </div>
      </div>
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

const EmailNotificationContainer = () => {
  return <div></div>;
};

const WeeklyScheduleContainer = () => {
  let today = new Date();
  let currentDate = today.getDate();
  let weeklyDate = []; //initialising empty array, before populating it.
  let sundayDate = currentDate - today.getDay(); //gets the sunday date of the week by subtracting the current date and the day (eg. sun(0), mon(1)...)
  let lastDateOfWeek = 7 - today.getDay(); //gets the value of the max days of the week for the for loop below.
  const weeklyDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = sundayDate; i < currentDate + lastDateOfWeek; i++) {
    // i is the sunday date and the max value is the currentDate plus the max days
    weeklyDate.push(i); //populating the array to display.
  }
  // if (today.getDay() !== 0) {
  //   for (let i = sundayDate; i < currentDate + lastDateOfWeek; i++) {
  //     weeklyDate.push(i);
  //   }
  // } else {
  //   for (let i = sundayDate; i <= currentDate + 3; i++) {
  //     weeklyDate.push(i);
  //   }
  // }

  // useEffect(() => {
  //   if (weeklyDate[0] !== startDate) {
  //     for (let i = startDate; i <= currentDate + 3; i++) {
  //       weeklyDate.push(i);
  //     }
  //   }
  // }, [weeklyDay]);

  // for (let i = currentDate; i <= currentDate + 6; i++) {
  //   weeklyDate.push(i);
  // }

  // useEffect(() => {
  //   const getWeekDays = () => {
  //     const days = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];
  //     const dynamicWeekdays = [];
  //     const currentDayIndex = today.getDay();
  //     for (let i = 0; i < 7; i++) {
  //       dynamicWeekdays.push(days[(currentDayIndex + i) % 7]);
  //     }
  //     return dynamicWeekdays;
  //   };
  //   setWeekDays(getWeekDays());
  // }, []);

  // const isNewDayHandle = () => {
  //   let isNewDay = today.getDay();
  //   if (currentDay === isNewDay) {
  //     console.log("1");
  //     setCurrentDay(today.getDay());
  //   }
  // };

  // useEffect(() => {
  //   let newArr = [...weeklyDay]; //copies
  //   const firstElement = newArr.shift(); //sun
  //   newArr.push(firstElement);
  //   setWeeklyDay(newArr);
  // }, []);

  // useEffect(() => {
  //   const testest = () => {
  //     const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, and so on...
  //     const currentDate = today.getDate();
  //     const sundayDate = currentDate - currentDay; // Calculate Sunday's date
  //     const sunday = new Date(today.setDate(sundayDate)); // Set to Sunday

  //     for (let i = 0; i < 7; i++) {
  //       const date = new Date();
  //       date.setDate(sunday.getDate() + i);
  //       const options = { weekday: "short" };
  //       weekdays.push(date.toLocaleDateString("en-US", options)); // Store dates as strings
  //     }

  //     return weekdays;
  //   };

  //   testest();
  // }, []);

  return (
    <div>
      <div className="weekly-email-container__wrapper">
        <div className="weekly-calendar__wrapper">
          <div style={{ display: "flex", height: "170px", overflow: "auto" }}>
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
                      : {}
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
        <div className="email-notif-container__wrapper">
          <EmailNotificationContainer />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <div>
        <SummaryCards />
      </div>
      <div className="dashboard-graph-container__wrapper">
        <div className="dashboard-graph__wrapper">
          <PatientLineGraph />
        </div>
        <div>
          <AppointmentContainer />
        </div>
        <div>
          <ContinueLearningContainer />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            width: "695px",
            height: "230px",
            backgroundColor: "red",
            margin: "20px 0 0 20px",
          }}
        ></div>
        <div>
          <WeeklyScheduleContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
