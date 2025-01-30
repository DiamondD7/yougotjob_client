import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetNextAppointmentForPatient,
  GetPatientPreviousApt,
} from "../../assets/js/serverApi";
import {
  User,
  Calendar,
  ChatCenteredText,
  Link,
  EnvelopeOpen,
  CalendarSlash,
  X,
} from "@phosphor-icons/react";
import Payment from "../Stripe/Payment";

import "../../styles/patientdashboard.css";
const SummaryCards = ({ apts, setPreviousAptModal }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [inputDate, setInputDate] = useState("7 Aug 2024 20:00"); //can be changed to mm/dd/yyyy

  const prevApt = apts[0] || "";

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
          <div className="dashboard-patient-card__wrapper">
            <div>
              <h3>{prevApt.practitionerName}</h3>
              {/* <label className="patient-card-id__label">
                {prevApt.registrationNumber}
              </label> */}
            </div>
          </div>

          <div className="dashboard-patient-card-details__wrapper">
            <h2 className="dashboard-patient-card-details-h2-schedule">
              {new Date(prevApt.appointmentDateCompleted).toLocaleString(
                "en-nz"
              )}
            </h2>
            <h2 className="dashboard-patient-card-details-h2-schedule">
              Accepted at{" "}
              {new Date(prevApt.acceptedJobDate).toLocaleString("en-nz")}
            </h2>
            <div className="previous-patient-view__wrapper">
              <button
                className="previous-patient-view__btn"
                onClick={() => setPreviousAptModal(true)}
              >
                view
              </button>
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
        {/* <div className="dashboard-cards__wrapper">
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
        </div> */}
      </div>
    </div>
  );
};

const PreviousAppointment = ({ apts, setPreviousAptModal }) => {
  const aptDetails = apts[0] || "";
  return (
    <div>
      <div className="previous-appointment__wrapper">
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setPreviousAptModal(false)}
        >
          <X size={12} color="#202020" />
        </button>
        <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
          <div>
            <h5>Your details</h5>
            <br />
            <div className="previous-appointment-details__wrapper">
              <label>Name</label>
              <p>{aptDetails.fullName}</p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Email</label>
              <p>{aptDetails.emailAddress}</p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Mobile</label>
              <p>{aptDetails.contactNumber}</p>
            </div>
            {aptDetails.appointmentType === "on-site" ? (
              <div className="previous-appointment-details__wrapper">
                <label>Address</label>
                <p>
                  {aptDetails.streetAddress} {aptDetails.suburb}{" "}
                  {aptDetails.city} {aptDetails.postCode}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <h5>Practitioner details</h5>
            <br />
            <div className="previous-appointment-details__wrapper">
              <label>Type</label>
              <p>{aptDetails.healthPractitionerType}</p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Name</label>
              <p>{aptDetails.practitionerName}</p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Email</label>
              <p>{aptDetails.practitionerEmail}</p>
            </div>
          </div>
        </div>
        <br />
        <h5 style={{ padding: "10px" }}>Appointment details</h5>
        <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
          <div>
            <div className="previous-appointment-details__wrapper">
              <label>Type</label>
              <p>{aptDetails.appointmentType}</p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Preferred date</label>
              <p>
                {new Date(aptDetails.preferredAppointmentDate).toLocaleString(
                  "en-nz"
                )}
              </p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Accepted date</label>
              <p>
                {new Date(aptDetails.acceptedJobDate).toLocaleString("en-nz")}
              </p>
            </div>
          </div>

          <div>
            <div className="previous-appointment-details__wrapper">
              <label>Agenda</label>
              <p>{aptDetails.appointmentAgenda}</p>
            </div>
            <div className="previous-appointment-details__wrapper">
              <label>Complete date</label>
              <p>
                {new Date(aptDetails.appointmentDateCompleted).toLocaleString(
                  "en-nz"
                )}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "30px", padding: "10px" }}>
          <div className="previous-appointment-contents__wrapper">
            <p>Patient's comments</p>
            <textarea value={aptDetails.comments}></textarea>
          </div>
          <div className="previous-appointment-contents__wrapper">
            <p>Diagnosis</p>
            <textarea value={aptDetails.diagnosis}></textarea>
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

const PaymentContainer = ({ apts }) => {
  const [paymentClick, setPaymentClick] = useState(false);
  const [chosenPayment, setChosenPayment] = useState([]);
  const [chosenAptId, setChosenAptId] = useState(0);
  const [chosenAptEmail, setChosenAptEmail] = useState("");

  const handlePaymentModal = (e, data, id, email) => {
    e.preventDefault();
    setPaymentClick(true); //this is for opening the modal stripe pay
    setChosenPayment(data); //this is the appointmentPayments
    setChosenAptId(id);
    setChosenAptEmail(email);
  };

  return (
    <div>
      {paymentClick === true ? <div className="overlay"></div> : ""}
      {paymentClick === true ? (
        <div>
          <Payment
            chosenPayment={chosenPayment}
            setPaymentClick={setPaymentClick}
            chosenAptId={chosenAptId}
            chosenAptEmail={chosenAptEmail}
          />
        </div>
      ) : (
        ""
      )}
      <div className="patientdashboard-invoice-container__wrapper">
        <table className="patientdashboard-invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Practitioner</th>
              <th>Appointment</th>
              <th>Receipt</th>
              <th>Tax</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {apts?.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.practitionerName}</td>
                <td>
                  {new Date(data.appointmentDateCompleted).toLocaleString(
                    "en-nz"
                  )}
                </td>
                {/* if receiptLink is null, means users has not paid it yet */}
                {data.appointmentPayments.receiptLink === null ? (
                  <td></td>
                ) : (
                  <td>
                    <a
                      href={data.appointmentPayments.receiptLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Link size={15} />
                    </a>
                  </td>
                )}
                <td>{data.appointmentPayments.taxRate * 100}%</td>
                <td>${data.appointmentPayments.total}</td>
                <td>
                  $
                  {Math.floor(
                    (data.appointmentPayments.total * 0.15 +
                      data.appointmentPayments.total) *
                      100
                  ) / 100}
                </td>
                <td>
                  <button
                    className={
                      data.appointmentPayments.isPaid === true
                        ? "btn-paid"
                        : "btn-notpaid"
                    }
                    disabled={
                      data.appointmentPayments.isPaid === true ? true : false
                    }
                    onClick={(e) =>
                      handlePaymentModal(
                        e,
                        data.appointmentPayments,
                        data.id,
                        data.emailAddress
                      )
                    }
                  >
                    {data.appointmentPayments.isPaid === true
                      ? "Paid"
                      : "Pending"}
                  </button>
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
  const [previousAptModal, setPreviousAptModal] = useState(false);
  const [apts, setApts] = useState([]);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetPatientPreviousApt}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setApts(res.returnStatus.data);
      });
  }, []);
  return (
    <div>
      {/* {paymentClick === true ? <div className="overlay"></div> : ""}
      {paymentClick === true ? (
        <div>
          <Payment setPaymentClick={setPaymentClick} />
        </div>
      ) : (
        ""
      )} */}

      {previousAptModal === true ? (
        <>
          <div className="overlay"></div>
          <PreviousAppointment
            apts={apts}
            setPreviousAptModal={setPreviousAptModal}
          />
        </>
      ) : (
        ""
      )}
      <div style={{ display: "flex" }}>
        <SummaryCards apts={apts} setPreviousAptModal={setPreviousAptModal} />
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <RecentDiagnosis />
        <PreferredPractitioner />
        <PrescriptionContainer />
      </div>
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <PaymentContainer apts={apts} />
        <TablesContainer />
      </div>
    </div>
  );
};

export default DashboardPatient;
