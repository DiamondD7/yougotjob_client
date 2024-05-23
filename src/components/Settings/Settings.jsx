import React, { useState } from "react";
import { Gear } from "@phosphor-icons/react";

import "../../styles/settingsstyles.css";
import Account from "./Account";
const Settings = () => {
  const [activeDisplay, setActiveDisplay] = useState("");

  return (
    <div>
      <div style={{ display: "flex", gap: "90px" }}>
        <ul className="settings-nav-container__wrapper">
          <li>
            <strong className="settings-nav-settings">
              <Gear size={20} color="#202020" />
              Settings
            </strong>
          </li>
          <li>
            <button
              value="account"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "account" ? "activeDisplay" : ""
              }`}
            >
              Account
            </button>
          </li>
          <li>
            <button
              value="payments"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "payments" ? "activeDisplay" : ""
              }`}
            >
              Payments
            </button>
          </li>
          <li>
            <button
              value="privacy"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "privacy" ? "activeDisplay" : ""
              }`}
            >
              Privacy Terms
            </button>
          </li>
          <li>
            <button
              value="about"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "about" ? "activeDisplay" : ""
              }`}
            >
              About Hauora
            </button>
          </li>
        </ul>
        <div style={{ marginTop: "50px" }}>
          {activeDisplay === "account" ? <Account /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Settings;
