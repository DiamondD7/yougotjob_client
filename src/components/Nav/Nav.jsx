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
            <button>
              <Calendar size={20} color="#454545" />
            </button>

            <label
              className={minimizedNav === true ? "remove-label" : "icon-label"}
            >
              Calendar
            </label>
          </li>
          <li>
            <button>
              <BellRinging size={20} color="#454545" />
            </button>
            <label
              className={minimizedNav === true ? "remove-label" : "icon-label"}
            >
              Notification
            </label>
          </li>
          <li>
            <button>
              <Chat size={20} color="#454545" />
            </button>
            <label
              className={minimizedNav === true ? "remove-label" : "icon-label"}
            >
              Communication
            </label>
          </li>
          <li>
            <button>
              <Note size={20} color="#454545" />
            </button>
            <label
              className={minimizedNav === true ? "remove-label" : "icon-label"}
            >
              Results
            </label>
          </li>
          <li>
            <button>
              <Briefcase size={20} color="#454545" />
            </button>
            <label
              className={minimizedNav === true ? "remove-label" : "icon-label"}
            >
              Domain
            </label>
          </li>
          <li>
            <button>
              <BookOpenText size={20} color="#454545" />
            </button>
            <label
              className={minimizedNav === true ? "remove-label" : "icon-label"}
            >
              Care Plan
            </label>
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
