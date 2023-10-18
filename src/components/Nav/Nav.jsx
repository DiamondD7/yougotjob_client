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
const Nav = () => {
  const [minimizedNav, setMinimizedNav] = useState(false);

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
            >
              <Calendar size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Calendar"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
            >
              <BellRinging size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Notification"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
            >
              <Chat size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Communication"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
            >
              <Note size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Results"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
            >
              <Briefcase size={20} color="#454545" />
              &nbsp;
              {minimizedNav === true ? "" : "Domain"}
            </button>
          </li>
          <li>
            <button
              className={minimizedNav === true ? "btn-normal" : "icon-label"}
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
