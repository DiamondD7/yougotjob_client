import React from "react";

import "../../styles/navstyles.css";
const Nav = () => {
  return (
    <>
      <div className="navside__wrapper">
        <ul>
          <li>
            <button>Calendar</button>
          </li>
          <li>
            <button>Notification</button>
          </li>
          <li>
            <button>Domain</button>
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
