import React, { useState, useEffect } from "react";
import { MockUserData } from "../../assets/js/mockChartData";
import { User, Calendar, CaretDown } from "@phosphor-icons/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import "../../styles/dashboardstyles.css";

const SummaryCards = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [inputDate, setInputDate] = useState("21 Feb 2024 13:40:00");
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
  return (
    <div>
      <div className="appointment-container__wrapper">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1 style={{ color: "#9dcd5a" }}>5</h1>
          <h4 style={{ width: "100px", fontSize: "13px" }}>
            appointments due today
          </h4>
          <button className="btnclear appointment-container__btn">
            expand <CaretDown size={16} />
          </button>
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
      </div>
    </div>
  );
};

export default Dashboard;
