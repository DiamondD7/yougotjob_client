import React, { useState, useEffect } from "react";
import { User, Calendar } from "@phosphor-icons/react";

import "../../styles/dashboardstyles.css";
const Dashboard = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [inputDate, setInputDate] = useState("29 Jan 2024");
  const [currentDate, setCurrentDate] = useState(inputDate);

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
            <h5>Appointments</h5>
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

export default Dashboard;
