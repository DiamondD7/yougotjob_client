import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  ChatCenteredText,
  EnvelopeOpen,
} from "@phosphor-icons/react";

import "../../styles/patientdashboard.css";
const SummaryCards = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [inputDate, setInputDate] = useState("7 Aug 2024 20:00"); //can be changed to mm/dd/yyyy

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
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <div className="header-cards__wrapper">
          <div className="dashboard-card-title__wrapper">
            <div>
              <User size={19} color="#9DCD5A" />
            </div>
            <h5>Next appointment</h5>
          </div>
          <div className="dashboard-patient-card__wrapper">
            <div>
              <h3>Dr. Johnson</h3>
              <label className="patient-card-id__label">ID:30004997</label>
            </div>
          </div>
          <div className="dashboard-patient-card-details__wrapper">
            <h2 className="dashboard-patient-card-details-h2-schedule">
              27/08/2024 12:40pm
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
            <div>
              <h3>Dr. Johnson</h3>
              <label className="patient-card-id__label">ID:30004997</label>
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

const RecentDiagnosis = () => {
  return (
    <div>
      <div className="recent-diagnosis__wrapper">
        <h5>Recent Diagnosis</h5>
        <table className="recent-diagnosis__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Diagnosis</th>
              <th>Practitioner</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Broken Tendon</td>
              <td>Dr. Johnson</td>
              <td>02/11/2023</td>
              <td>
                <button className="recent-diagnosis-btn">view</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Broken Heart</td>
              <td>Dr. Sharma</td>
              <td>02/11/2023</td>
              <td>
                <button className="recent-diagnosis-btn">view</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Bahog Ilok</td>
              <td>Dr. Johnson</td>
              <td>02/11/2023</td>
              <td>
                <button className="recent-diagnosis-btn">view</button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Bayot</td>
              <td>Dr. Sharma</td>
              <td>02/11/2023</td>
              <td>
                <button className="recent-diagnosis-btn">view</button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Pulled Achilles</td>
              <td>Dr. Sharma</td>
              <td>02/11/2023</td>
              <td>
                <button className="recent-diagnosis-btn">view</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PreferredPractitioner = () => {
  return (
    <div className="preferred-practitioner__wrapper">
      <h5 className="preferred-practitioner-h5-title">
        Preferred Practitioner
      </h5>
      <div className="preferred-practitioner-details__wrapper">
        <h3>Dr. Mahachit Sharma</h3>
        <p className="preferred-practitioner-id__text">ID: 800976543</p>
      </div>

      <div>
        <div className="preferred-practitioner-recent-appointment__wrapper">
          <h5>Recent Appointment</h5>

          <p className="preferred-practitioner-recent-appointment-result">
            01/07/2024
          </p>
        </div>
        <div className="preferred-practitioner-total-appointment__wrapper">
          <h5>Recent Appointment</h5>
          <p className="preferred-practitioner-total-appointment-result">13</p>
        </div>
        <div className="preferred-practitioner-total-appointment__wrapper">
          <h5>Total Appointment</h5>
          <p className="preferred-practitioner-total-appointment-result">13</p>
        </div>
      </div>
    </div>
  );
};

const DashboardPatient = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SummaryCards />
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <RecentDiagnosis />
        <PreferredPractitioner />
      </div>
    </div>
  );
};

export default DashboardPatient;
