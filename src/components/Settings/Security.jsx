import React from "react";

import "../../styles/securitystyles.css";
const Security = () => {
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>
        Two-factor Authentication
      </h3>
      <div className="security-settings__wrapper">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="security-settings-textheading__text">
            Two-factor authentication is a feature that adds an extra layer of
            protection to your account.
          </p>
          <button className="security-settings-enable__btn">Enable</button>
        </div>
      </div>
    </div>
  );
};

export default Security;
