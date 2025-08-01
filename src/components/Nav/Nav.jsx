import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  SignOut,
  List,
  User,
  Note,
  Stethoscope,
  Heartbeat,
  Prescription,
  Syringe,
  ChatCenteredText,
  ChalkboardTeacher,
  Folders,
  Gear,
  Copyright,
  House,
  CalendarPlus,
  ClipboardText,
  CalendarDots,
  NotePencil,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import NavLogo from "../../assets/img/HauoraLogo.png";
import moment from "moment-timezone";
import { Logout } from "../../assets/js/serverApi";

import "../../styles/navstyles.css";

const NavPractitioner = ({ activeDisplay, minimizedNav, onClickDisplayed }) => {
  return (
    <>
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "dashboard" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("dashboard")}
          style={
            minimizedNav === false
              ? activeDisplay === "dashboard"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <House size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Dashboard"}
        </button>
      </li>
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={activeDisplay === "jobs" ? { backgroundColor: "#D6E8FF" } : {}}
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("jobs")}
          style={
            minimizedNav === false
              ? activeDisplay === "jobs"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <ClipboardText size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Jobs"}
        </button>
      </li>
      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "calendar" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("calendar")}
          style={
            minimizedNav === false
              ? activeDisplay === "calendar"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Calendar size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Calendar"}
        </button>
      </li> */}
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "prescription" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("prescriptions")}
          style={
            minimizedNav === false
              ? activeDisplay === "prescriptions"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Prescription size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Prescriptions"}
        </button>
      </li>

      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "patients" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("patients")}
          style={
            minimizedNav === false
              ? activeDisplay === "patients"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Users size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Patients"}
        </button>
      </li>

      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "communication"
            ? { backgroundColor: "#D6E8FF" }
            : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("communication")}
          style={
            minimizedNav === false
              ? activeDisplay === "communication"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <ChatCenteredText size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Communication"}
        </button>
      </li> */}

      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "results" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("results")}
          style={
            minimizedNav === false
              ? activeDisplay === "results"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Note size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Results"}
        </button>
      </li>

      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "records" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("records")}
          style={
            minimizedNav === false
              ? activeDisplay === "records"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Invoice size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Records"}
        </button>
      </li> */}

      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "documents" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("documents")}
          style={
            minimizedNav === false
              ? activeDisplay === "documents"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Folders size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Documents"}
        </button>
      </li>

      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "feedback" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("feedback")}
          style={
            minimizedNav === false
              ? activeDisplay === "feedback"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <NotePencil size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Write a Feedback"}
        </button>
      </li>

      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "learning" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("learning")}
          style={
            minimizedNav === false
              ? activeDisplay === "learning"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <ChalkboardTeacher size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Learning"}
        </button>
      </li> */}
    </>
  );
};

const NavPatient = ({ minimizedNav, activeDisplay, onClickDisplayed }) => {
  return (
    <>
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "dashboard" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("dashboard")}
          style={
            minimizedNav === false
              ? activeDisplay === "dashboard"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <House size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Dashboard"}
        </button>
      </li>

      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "schedules" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("schedules")}
          style={
            minimizedNav === false
              ? activeDisplay === "schedules"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <CalendarDots size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Schedules"}
        </button>
      </li>
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "appointment" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("appointment")}
          style={
            minimizedNav === false
              ? activeDisplay === "appointment"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <CalendarPlus size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Appointment"}
        </button>
      </li>
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "feedback" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("feedback")}
          style={
            minimizedNav === false
              ? activeDisplay === "feedback"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <NotePencil size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Write a Feedback"}
        </button>
      </li>

      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "communication"
            ? { backgroundColor: "#D6E8FF" }
            : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("communication")}
          style={
            minimizedNav === false
              ? activeDisplay === "communication"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <ChatCenteredText size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Communication"}
        </button>
      </li> */}
      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "prescriptions"
            ? { backgroundColor: "#D6E8FF" }
            : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("prescriptions")}
          style={
            minimizedNav === false
              ? activeDisplay === "prescriptions"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Prescription size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Prescriptions"}
        </button>
      </li> */}
      {/* <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "immunisation" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("immunisation")}
          style={
            minimizedNav === false
              ? activeDisplay === "immunisation"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Syringe size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Immunisations"}
        </button>
      </li>

      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "test results" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("test results")}
          style={
            minimizedNav === false
              ? activeDisplay === "test results"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Stethoscope size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Test results"}
        </button>
      </li>
      <li
        className={minimizedNav === true ? "minimizednav-icons" : ""}
        style={
          activeDisplay === "lab results" ? { backgroundColor: "#D6E8FF" } : {}
        }
      >
        <button
          className={minimizedNav === true ? "btn-normal" : "icon-label"}
          onClick={() => onClickDisplayed("lab results")}
          style={
            minimizedNav === false
              ? activeDisplay === "lab results"
                ? { backgroundColor: "#D6E8FF" }
                : {}
              : {}
          }
        >
          <Heartbeat size={20} color="#454545" />
          &nbsp;
          {minimizedNav === true ? "" : "Lab results"}
        </button>
      </li> */}
    </>
  );
};

const Nav = ({ setDisplayed, dateSettings }) => {
  const role = sessionStorage.getItem("role");
  const [minimizedNav, setMinimizedNav] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("dashboard");
  const [seconds, setSeconds] = useState(0);

  const onClickDisplayed = (display) => {
    setDisplayed(display);
    setActiveDisplay(display);
  };

  // ----------------------------------------------------DATETIME UPDATING LOGIC EVERY 60s---------------------------------------------------------
  const [currentTime, setCurrentTime] = useState(
    moment()
      .tz(dateSettings.timeZone)
      .format(`${dateSettings.dateFormat} ${dateSettings.timeFormat}`)
  );

  useEffect(() => {
    // Function to update the time
    const updateCurrentTime = () => {
      setCurrentTime(
        moment()
          .tz(dateSettings.timeZone)
          .format(`${dateSettings.dateFormat} ${dateSettings.timeFormat}`)
      );
    };

    // Update the time initially when the component mounts
    updateCurrentTime();

    // Calculate the delay until the next minute
    const now = moment();
    const delay = (60 - now.seconds()) * 1000; //eg. output: if the now.seconds() is 30s and the diff 60s - 30s = 30s * 100 which will get you (30000)

    // Set a timeout to update the time at the start of the next minute
    const timeoutId = setTimeout(() => {
      updateCurrentTime();

      // Set an interval to update the time every minute
      const intervalId = setInterval(updateCurrentTime, 60000);
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, delay);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [dateSettings.timeZone, dateSettings.dateFormat, dateSettings.timeFormat]);

  // ---------------------------------------------------------------END-------------------------------------------------------------------------------

  const getDateTime = () => {
    return <p className="nav-date__text">{currentTime}</p>;
  };

  const logout = () => {
    sessionStorage.removeItem("auth", false);
    sessionStorage.removeItem("firstTime");
    fetch(Logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include", // Ensure cookies are included in the request if necessary
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <div
        className={`navside__wrapper ${
          minimizedNav === true ? `minimized` : ""
        }`}
      >
        <div>
          <div
            className={`nav-date__wrapper ${
              minimizedNav === true ? "dateMinimized" : ""
            }`}
          >
            {minimizedNav === false ? (
              <img src={NavLogo} className="hauouralogonav" alt="hauora logo" />
            ) : (
              ""
            )}
            <div>
              <button
                className="nav-menu-arrow__button"
                onClick={() => setMinimizedNav(!minimizedNav)}
              >
                <List size={20} color="#454545" />
              </button>
            </div>
          </div>
        </div>
        <ul>
          {role === "Practitioner" ? (
            <NavPractitioner
              activeDisplay={activeDisplay}
              minimizedNav={minimizedNav}
              onClickDisplayed={onClickDisplayed}
            />
          ) : (
            ""
          )}

          {role === "Patient" ? (
            <NavPatient
              activeDisplay={activeDisplay}
              minimizedNav={minimizedNav}
              onClickDisplayed={onClickDisplayed}
            />
          ) : (
            ""
          )}
          <br />
          <div className="navigation-bottom-icons__wrapper">
            <li className="profile-btn">
              <button onClick={() => onClickDisplayed("profile")}>
                <User size={20} color="#454545" />
              </button>
            </li>
            <li className="settings-btn">
              <button onClick={() => onClickDisplayed("settings")}>
                <Gear size={20} color="#454545" />
              </button>
            </li>
            <li className="logout-btn">
              <button onClick={logout}>
                <Link to="/">
                  <SignOut size={20} color="#454545" />
                </Link>
              </button>
              <p className="nav-date-time">
                {minimizedNav === false ? getDateTime() : ""}
              </p>
            </li>
            {minimizedNav === false ? (
              <li className="nav-copyright">
                <Copyright size={12} color="rgba(0,0,0,0.3)" /> Aaron Julian
                Sierra
              </li>
            ) : (
              ""
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
