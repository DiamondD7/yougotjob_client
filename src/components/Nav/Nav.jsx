import React, { useState } from "react";
import {
  Calendar,
  Users,
  Briefcase,
  SignOut,
  List,
  User,
  Note,
  Chat,
  Gear,
  BookOpenText,
  House,
} from "@phosphor-icons/react";

import "../../styles/navstyles.css";

const Nav = ({ setDisplayed, fakeRole }) => {
  const [minimizedNav, setMinimizedNav] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("dashboard");

  const onClickDisplayed = (display) => {
    setDisplayed(display);
    setActiveDisplay(display);
  };

  let date = new Date();

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
            {minimizedNav === false ? <p>{date.toLocaleDateString()}</p> : ""}
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
          {fakeRole === "Receptionist" ? (
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
          {fakeRole === "Receptionist" || fakeRole === "General Practioner" ? (
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

          {fakeRole === "General Practioner" ? (
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

          <li
            className={minimizedNav === true ? "minimizednav-icons" : ""}
            style={
              activeDisplay === "domain" ? { backgroundColor: "#D6E8FF" } : {}
            }
          >
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("domain")}
              style={
                minimizedNav === false
                  ? activeDisplay === "domain"
                    ? { backgroundColor: "#D6E8FF" }
                    : {}
                  : {}
              }
            >
              <Briefcase size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Domain"}
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
              <BookOpenText size={20} color="#454545" />
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
              <button>
                <Gear size={20} color="#454545" />
              </button>
            </li>
            <li className="logout-btn">
              <button>
                <SignOut size={20} color="#454545" />
              </button>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
