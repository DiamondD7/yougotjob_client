import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Briefcase,
  SignOut,
  List,
  User,
  Note,
  Chat,
  ChalkboardTeacher,
  Folders,
  Gear,
  Invoice,
  BookOpenText,
  House,
} from "@phosphor-icons/react";
import NavLogo from "../../assets/img/HauoraNav.png";
import { Link } from "react-router-dom";
import { GetaHealthPractitioner } from "../../assets/js/serverApi";

import "../../styles/navstyles.css";

const Nav = ({ setDisplayed }) => {
  const [minimizedNav, setMinimizedNav] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("dashboard");
  const [userLoggedData, setUserLoggedData] = useState([]);

  const onClickDisplayed = (display) => {
    setDisplayed(display);
    setActiveDisplay(display);
  };

  let date = new Date();

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetaHealthPractitioner}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserLoggedData(data);
      });
  }, []);

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
              {minimizedNav === false ? (
                <p className="nav-date__text">
                  {date.toLocaleDateString("en-NZ")}
                </p>
              ) : (
                ""
              )}
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
