import React from "react";
import {
  Calendar,
  BellRinging,
  Briefcase,
  SignOut,
  ArrowFatLinesRight,
  ArrowFatLinesLeft,
} from "@phosphor-icons/react";

import "../../styles/navstyles.css";
const Nav = () => {
  return (
    <>
      <div className="navside__wrapper">
        <div>
          <div className="nav-date__wrapper">
            <p>1/12/2023</p>
            <div>
              <button className="nav-menu-arrow__button">
                <ArrowFatLinesLeft size={16} color="#454545" />
              </button>
            </div>
          </div>
        </div>
        <ul>
          <li>
            <button>
              <Calendar size={20} color="#454545" />
            </button>

            <label className="calendar-label">Calendar</label>
          </li>
          <li>
            <button>
              <BellRinging size={20} color="#454545" />
            </button>
            <label className="notification-label">Notification</label>
          </li>
          <li>
            <button>
              <Briefcase size={20} color="#454545" />
            </button>
            <label className="domain-label">Domain</label>
          </li>
          <br />
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
