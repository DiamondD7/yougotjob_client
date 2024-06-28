import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  SignOut,
  List,
  User,
  Note,
  Chat,
  ChalkboardTeacher,
  Folders,
  Gear,
  Invoice,
  House,
} from "@phosphor-icons/react";
import NavLogo from "../../assets/img/HauoraNav.png";
import { Link } from "react-router-dom";
import { GetaHealthPractitioner } from "../../assets/js/serverApi";
import moment from "moment-timezone";

import "../../styles/navstyles.css";

const Nav = ({ setDisplayed, dateSettings }) => {
  const [minimizedNav, setMinimizedNav] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("dashboard");
  const [userLoggedData, setUserLoggedData] = useState([]);
  const [seconds, setSeconds] = useState(0);

  const onClickDisplayed = (display) => {
    setDisplayed(display);
    setActiveDisplay(display);
  };

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetaHealthPractitioner}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserLoggedData(data);
      });
  }, []);

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
          <li
            className={minimizedNav === true ? "minimizednav-icons" : ""}
            style={
              activeDisplay === "dashboard"
                ? { backgroundColor: "#D6E8FF" }
                : {}
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
          {userLoggedData.role === "Receptionist" ||
          userLoggedData.role === "Practitioner" ? (
            <li
              className={minimizedNav === true ? "minimizednav-icons" : ""}
              style={
                activeDisplay === "calendar"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
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
            </li>
          ) : (
            ""
          )}
          {userLoggedData.role === "Receptionist" ||
          userLoggedData.role === "General Practitioner" ? (
            <li
              className={minimizedNav === true ? "minimizednav-icons" : ""}
              style={
                activeDisplay === "patients"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
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
          ) : (
            ""
          )}
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
              <Chat size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Communication"}
            </button>
          </li> */}

          {userLoggedData.role === "Practitioner" ? (
            <li
              className={minimizedNav === true ? "minimizednav-icons" : ""}
              style={
                activeDisplay === "results"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
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
          ) : (
            ""
          )}

          {userLoggedData.role === "Practitioner" ? (
            <li
              className={minimizedNav === true ? "minimizednav-icons" : ""}
              style={
                activeDisplay === "records"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
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
            </li>
          ) : (
            ""
          )}

          <li
            className={minimizedNav === true ? "minimizednav-icons" : ""}
            style={
              activeDisplay === "documents"
                ? { backgroundColor: "#D6E8FF" }
                : {}
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
          </li>
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
              <button
                onClick={() => {
                  sessionStorage.setItem("auth", false);
                }}
              >
                <Link to="/">
                  <SignOut size={20} color="#454545" />
                </Link>
              </button>
              {minimizedNav === false ? getDateTime() : ""}
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
