import React, { useState } from "react";
import { Gear } from "@phosphor-icons/react";

import "../../styles/settingsstyles.css";
import Account from "./Account";
import Security from "./Security";
import Notifications from "./Notifications";
import Billing from "./Billing";
const Settings = () => {
  const [activeDisplay, setActiveDisplay] = useState("");

  return (
    <div>
      <div style={{ display: "flex", gap: "30px" }}>
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
              value="security"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "security" ? "activeDisplay" : ""
              }`}
            >
              Security
            </button>
          </li>
          <li>
            <button
              value="notifications"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "notifications" ? "activeDisplay" : ""
              }`}
            >
              Notifications
            </button>
          </li>
          <li>
            <button
              value="language"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "language" ? "activeDisplay" : ""
              }`}
            >
              Language
            </button>
          </li>
          <li>
            <button
              value="billing"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "billing" ? "activeDisplay" : ""
              }`}
            >
              Billing
            </button>
          </li>
          <li>
            <button
              value="dataex"
              onClick={(e) => setActiveDisplay(e.target.value)}
              className={`settings-nav__btn ${
                activeDisplay === "dataex" ? "activeDisplay" : ""
              }`}
            >
              Data Export
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
          {activeDisplay === "account" ? (
            <Account />
          ) : activeDisplay === "security" ? (
            <Security />
          ) : activeDisplay === "notifications" ? (
            <Notifications />
          ) : activeDisplay === "billing" ? (
            <Billing />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
