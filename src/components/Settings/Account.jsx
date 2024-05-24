import React from "react";
import { Pencil, Trash } from "@phosphor-icons/react";

import "../../styles/accountstyles.css";
const Profile = () => {
  return (
    <div>
      <h4 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Profile</h4>
      <div style={{ display: "flex", gap: "50px" }}>
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
        <div>
          <div className="account-profile-contactnums__wrapper">
            <h4>Contacts</h4>
            <div
              style={{ marginTop: "10px", overflow: "auto", height: "130px" }}
            >
              <table className="contactnums-container__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Relationship</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mr Henry Sharma</td>
                    <td>022022022022</td>
                    <td>Father</td>
                    <td>henryrawr@gmail.com</td>
                    <td style={{ display: "flex", gap: "5px" }}>
                      <button>
                        <Pencil size={12} />
                      </button>
                      <button>
                        <Trash size={12} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button className="addnew-contact__btn">Add new contact</button>
        </div>
      </div>
    </div>
  );
};

const TimezonesSettings = () => {
  return (
    <div>
      <h4 style={{ color: "#9dcd5a", fontWeight: "bold" }}>
        Timezone Settings
      </h4>
      <div className="account-timezone__wrapper">
        <div>
          <h5>Country</h5>
          <input
            type="text"
            className="account-timezone__input"
            value="New Zealand"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <h5>Timezone</h5>
          <input
            type="text"
            className="account-timezone__input"
            value="Pacific/Auckland"
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "50px",
            }}
          >
            <div>
              <h5>Date format</h5>
              <select className="account-date-format__select">
                <option value=""></option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>

            <div>
              <h5>Time format</h5>
              <select className="account-time-format__select">
                <option value=""></option>
                <option value={true}>12-hour</option>
                <option value={false}>24-hour</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button className="account-timezonesetting-save__btn">Save</button>
    </div>
  );
};

const Account = () => {
  return (
    <div>
      <div className="setting-contents-display-container__wrapper">
        <Profile />
        <br />
        <br />
        <TimezonesSettings />
      </div>
    </div>
  );
};

export default Account;
