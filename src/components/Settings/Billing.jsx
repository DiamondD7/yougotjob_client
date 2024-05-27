import React from "react";

import "../../styles/billingstyles.css";
const Billing = () => {
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>
        Billing Information
      </h3>
      <div className="settings-billing__wrapper">
        <p className="setting-billing-label__text">
          Make sure you update your billing details and address
        </p>
        <br />

        <div style={{ display: "flex", gap: "80px" }}>
          <div>
            <p className="setting-billing-label__text">Name on card</p>
            <p className="setting-billing-name__text">Mahichit Sharma</p>
            <br />
            <div style={{ display: "flex", gap: "50px" }}>
              <div>
                <p className="setting-billing-label__text">Card number</p>
                <p className="setting-billing-name__text">
                  &#x2022;&#x2022;&#x2022;&#x2022;
                  &#x2022;&#x2022;&#x2022;&#x2022;
                  &#x2022;&#x2022;&#x2022;&#x2022; 1234
                </p>
              </div>
              <div>
                <p className="setting-billing-label__text">CVV</p>
                <p className="setting-billing-name__text">
                  &#x2022;&#x2022;&#x2022;
                </p>
              </div>
              <div>
                <p className="setting-billing-label__text">Expiry</p>
                <p className="setting-billing-name__text">05/30</p>
              </div>
            </div>
          </div>
          <div>
            <p className="setting-billing-label__text">Billing address</p>
            <p className="setting-billing-name__text">
              1/99 Henderson Drive <br /> 2020 Auckland <br /> New Zealand
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
