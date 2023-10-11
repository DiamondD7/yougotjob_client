import React from "react";
import { Calendar, BellRinging, Briefcase } from "@phosphor-icons/react";

import "../../styles/navstyles.css";
const Nav = () => {
  return (
    <>
      <div className="navside__wrapper">
        <ul>
          <li>
            <button>
              <Calendar size={16} color="#454545" />
            </button>

            <label>Calendar</label>
          </li>
          <li>
            <button>
              <BellRinging size={16} color="#454545" />
            </button>
          </li>
          <li>
            <button>
              <Briefcase size={16} color="#454545" />
            </button>
          </li>
          <br />
          <li className="logout-btn">
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
