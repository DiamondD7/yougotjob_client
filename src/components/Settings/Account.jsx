import React from "react";
import { Pencil, Trash } from "@phosphor-icons/react";

import "../../styles/accountstyles.css";
const Profile = () => {
  return (
    <div>
      <h2 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Profile</h2>
      <div style={{ display: "flex", gap: "50px" }}>
        <div className="account-profile__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profileheader">
              Personal information
            </p>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Pencil size={13} /> Edit
            </button>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",

              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <div>
              <p className="account-profile__text profilelabel">Name</p>
            </div>
            <div>
              <p className="account-profile__text profiledetails">
                Mahichit Sharma
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <p className="account-profile__text profilelabel">Phone</p>

            <p className="account-profile__text profiledetails">
              021-02102-021
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              gap: "100px",
              width: "300px",
            }}
          >
            <p className="account-profile__text profilelabel">Email Address</p>
            <p className="account-profile__text profiledetails">
              sharma@gmail.com
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              width: "410px",
              justifyContent: "space-between",
            }}
          >
            <p className="account-profile__text address">Home Address</p>
            <ul style={{ paddingTop: "10px" }}>
              <li className="account-profile__text addressdetails">
                <p className="addressdetails">1/88 Hunters Drive,</p> Auckland
                2330{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div>
      <div>
        <h2 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Contacts</h2>
        <div className="account-profile-contactnums__wrapper">
          <div style={{ marginTop: "10px", overflow: "auto", height: "130px" }}>
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
  );
};

const TimezonesSettings = () => {
  return (
    <div>
      <h2 style={{ color: "#9dcd5a", fontWeight: "bold" }}>
        Timezone Settings
      </h2>
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
        <Contacts />
        <br />
        <br />
        <TimezonesSettings />
      </div>
    </div>
  );
};

export default Account;
