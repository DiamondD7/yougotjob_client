import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetNextAppointmentForPatient } from "../../assets/js/serverApi";
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

  const [nextApt, setNextApt] = useState([]);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetNextAppointmentForPatient}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setNextApt(res.returnStatus.data[0]);
        //format date and setting for timer
        const dateFormat = new Date(
          res.returnStatus.data[0].preferredAppointmentDate
        );

        setInputDate(dateFormat.toLocaleString());
      });
  }, []);

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
              <h3>{nextApt.practitionerName} </h3>
              <label className="patient-card-id__label">
                {nextApt.healthPractitionerType}
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
      <div className="patientdashboard-invoice-container__wrapper">
        <h5 className="patientdashboard-invoice-h5__text">Invoice</h5>
        <table className="patientdashboard-invoice-table">
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

const PrescriptionContainer = () => {
  return (
    <div>
      <div className="prescription-container__wrapper">
        <h5 className="prescription-h5__text">Prescription</h5>
        <div className="prescription-table-container__wrapper">
          <table className="prescription-table__wrapper">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Medicine(s)</th>
                <th>Prescribed by</th>
                <th>Dispensed by</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>26/06/2024</td>
                <td>Otrivin Plus</td>
                <td>Dr. Johnson</td>
                <td>Haleon Jackson</td>
                <td className="prescription-pending__btn">pending</td>
                <td>
                  <button className="btnclear">view</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/05/2024</td>
                <td>Codral PSE</td>
                <td>Dr. Johnson</td>
                <td>Haleon Jackson</td>
                <td>paid</td>
                <td>
                  <button className="btnclear">view</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/05/2024</td>
                <td>Codral PSE</td>
                <td>Dr. Johnson</td>
                <td>Haleon Jackson</td>
                <td>paid</td>
                <td>
                  <button className="btnclear">view</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/05/2024</td>
                <td>Codral PSE</td>
                <td>Dr. Johnson</td>
                <td>Haleon Jackson</td>
                <td>paid</td>
                <td>
                  <button className="btnclear">view</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>2/05/2024</td>
                <td>Codral PSE</td>
                <td>Dr. Johnson</td>
                <td>Haleon Jackson</td>
                <td>paid</td>
                <td>
                  <button className="btnclear">view</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TestResults = () => {
  return (
    <div>
      <table className="tables-chosen-table__wrapper">
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice Id</th>
            <th>Test</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>960078</td>
            <td>Blood Test</td>
            <td>29/04/2024</td>
            <td>
              <button className="btnclear">view</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Immunisations = () => {
  return (
    <div>
      <table className="tables-chosen-table__wrapper">
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice Id</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>253999</td>
            <td>Flu Immunisation</td>
            <td>2/01/2024</td>
            <td>
              <button className="btnclear">view</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const LabResulls = () => {
  return (
    <div>
      <table className="tables-chosen-table__wrapper">
        <thead>
          <tr>
            <th>#</th>
            <th>Invoice Id</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>443299</td>
            <td>X-ray</td>
            <td>2/22/2024</td>
            <td>
              <button className="btnclear">view</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TablesContainer = () => {
  const [chosenTopic, setChosenTopic] = useState("Test results");
  return (
    <div>
      <div className="tables-container__wrapper">
        <div className="tables-header-btns__wrapper">
          <button
            className={`tables-headers__btns ${
              chosenTopic === "Test results" ? "chosenBtn" : ""
            }`}
            onClick={() => setChosenTopic("Test results")}
          >
            Test results
          </button>
          <button
            className={`tables-headers__btns ${
              chosenTopic === "Immunisations" ? "chosenBtn" : ""
            }`}
            onClick={() => setChosenTopic("Immunisations")}
          >
            Immunisations
          </button>
          <button
            className={`tables-headers__btns ${
              chosenTopic === "Vaccinations" ? "chosenBtn" : ""
            }`}
            onClick={() => setChosenTopic("Vaccinations")}
          >
            Vaccinations
          </button>
          <button
            className={`tables-headers__btns ${
              chosenTopic === "Lab results" ? "chosenBtn" : ""
            }`}
            onClick={() => setChosenTopic("Lab results")}
          >
            Lab results
          </button>
        </div>
        <div>
          {chosenTopic === "Test results" ? <TestResults /> : ""}
          {chosenTopic === "Immunisations" ? <Immunisations /> : ""}
          {chosenTopic === "Lab results" ? <LabResulls /> : ""}
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
        <PrescriptionContainer />
      </div>
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <InvoiceContainer />
        <TablesContainer />
      </div>
    </div>
  );
};

export default DashboardPatient;
