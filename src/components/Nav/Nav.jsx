import React, { useState } from "react";
import {
  Calendar,
  BellRinging,
  Briefcase,
  SignOut,
  List,
  User,
  Note,
  Chat,
  BookOpenText,
} from "@phosphor-icons/react";

import "../../styles/navstyles.css";

const Nav = ({ setDisplayed }) => {
  const [minimizedNav, setMinimizedNav] = useState(false);
  const [activeDisplay, setActiveDisplay] = useState("");

  const onClickDisplayed = (display) => {
    setDisplayed(display);
    setActiveDisplay(display);
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
            {minimizedNav === false ? <p>1/12/2023</p> : ""}
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
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("calendar")}
              style={
                activeDisplay === "calendar"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
              }
            >
              <Calendar size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Calendar"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("notification")}
              style={
                activeDisplay === "notification"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
              }
            >
              <BellRinging size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Notification"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("communication")}
              style={
                activeDisplay === "communication"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
              }
            >
              <Chat size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Communication"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("results")}
              style={
                activeDisplay === "results"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
              }
            >
              <Note size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Results"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("domain")}
              style={
                activeDisplay === "domain" ? { backgroundColor: "#D6E8FF" } : {}
              }
            >
              <Briefcase size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Domain"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
              onClick={() => onClickDisplayed("careplan")}
              style={
                activeDisplay === "careplan"
                  ? { backgroundColor: "#D6E8FF" }
                  : {}
              }
            >
              <BookOpenText size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Care Plan"}
            </button>
          </li>
          <br />
          <li className="profile-btn">
            <button>
              <User size={20} color="#454545" />
            </button>
          </li>
          <li className="logout-btn">
            <button>
              <SignOut size={20} color="#454545" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
