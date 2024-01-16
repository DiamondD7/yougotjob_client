import React, { useState, useEffect } from "react";
import { User } from "@phosphor-icons/react";

import "../../styles/dashboardstyles.css";
const Dashboard = () => {
  let today = new Date();

  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [miliseconds, setMiliseconds] = useState(60);

  // useEffect(() => {
  //   // setHours(today.getHours());
  //   // setMinutes(minutez);
  //   let interval;
  //   interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(60 - today.getSeconds());
  //       // setMiliseconds(99);
  //     } else if (minutes > 0) {
  //       setMinutes(60 - today.getMinutes());
  //       setSeconds(60);
  //       setMiliseconds(99);
  //     } else if (hours > 0) {
  //       setHours((hours) => hours - 1);
  //       setMinutes(60);
  //       setSeconds(60);
  //       setMiliseconds(99);
  //     } else if (days > 0) {
  //       setDays((days) => days - 1);
  //       setHours(24);
  //       setMinutes(60);
  //       setSeconds(60);
  //       setMiliseconds(99);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [miliseconds, seconds, minutes, hours, days]);

  // useEffect(() => {
  //   // let interval;
  //   // interval = setInterval(() => {
  //   //   setSeconds(today.getSeconds());
  //   // }, 1000);
  //   setSeconds(today.getSeconds());
  //   console.log("Dasdas");
  // }, [seconds]);
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
            <h2>23/01/2024 12:40pm</h2>
            <h2>{seconds}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
