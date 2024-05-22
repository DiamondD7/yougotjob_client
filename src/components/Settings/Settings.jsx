import React from "react";
import { Gear } from "@phosphor-icons/react";

import "../../styles/settingsstyles.css";
const Settings = () => {
  return (
    <div>
      <ul className="settings-nav-container__wrapper">
        <li>
          <strong className="settings-nav-settings">
            <Gear size={15} color="#202020" />
            Settings
          </strong>
        </li>
        <li>
          <button>Account</button>
        </li>
        <li>
          <button>Payments</button>
        </li>
        <li>
          <button>Privacy Terms</button>
        </li>
        <li>
          <button>About Hauora</button>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
