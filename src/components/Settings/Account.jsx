import React from "react";
import { Pencil } from "@phosphor-icons/react";

import "../../styles/accountstyles.css";
const Account = () => {
  return (
    <div>
      <div>
        <div className="account-profile__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profilename">
              Dr. Mahichit Sharma
            </p>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Pencil size={13} />
            </button>
          </div>
          <p className="account-profile__text profiledetails">
            mahisharma@gmail.com
          </p>
          <p className="account-profile__text profiledetails">022022022022</p>
          <p className="account-profile__text profiledetails">DOB: 3/1/1989</p>

          <p className="account-profile__text address">Addresses:</p>
          <ul>
            <li className="account-profile__text addressdetails">
              1/88 Hunters Drive, Auckland 2330{" "}
              <label className="address-primary">Primary</label>
            </li>
            <li className="account-profile__text addressdetails">
              1001 Robertson Road, Auckland 2220
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
