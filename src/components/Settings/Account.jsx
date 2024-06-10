import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import {
  GetaHealthPractitioner,
  CreateContact,
  GetEmergencyContact,
  DeleteContact,
} from "../../assets/js/serverApi";

import "../../styles/accountstyles.css";
const Profile = ({ loggedUserData }) => {
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Profile</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="account-profile__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profileheader">
              Personal information
            </p>
            <button className="account-profile-edit__btn">
              <Pencil size={15} /> Edit
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
                {loggedUserData.fullName}
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
              {loggedUserData.mobile}
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <p className="account-profile__text profilelabel">Email Address</p>
            <p className="account-profile__text profiledetails">
              {loggedUserData.emailAddress}
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

        <Certifications />
      </div>
    </div>
  );
};

const Certifications = () => {
  return (
    <div>
      <div>
        <div className="account-profile-certification__wrapper">
          <div style={{ overflow: "auto", height: "150px" }}>
            <p className="account-profile__text certificationheader">
              Certifications
            </p>
            <table className="certification-container__table">
              <thead>
                <tr>
                  <th>Certification Name</th>
                  <th>Issuing Organization</th>
                  <th>Date Issued</th>
                  <th>Expiration Date</th>
                  <th>Certification ID</th>
                  <th>Certification Level</th>
                  <th>Description</th>
                  <th>Attachments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Certified Data Professional</td>
                  <td>Data Management Association (DAMA)</td>
                  <td>2023-04-15</td>
                  <td>2026-04-14</td>
                  <td>CDP-123456</td>
                  <td>Advanced</td>
                  <td>
                    Certification for data management and data governance.
                  </td>
                  <td>
                    <a href="certificate.pdf" target="_blank">
                      View
                    </a>
                  </td>
                  <td style={{ display: "flex", gap: "5px" }}>
                    <button>
                      <Pencil size={15} />
                    </button>
                    <button>
                      <Trash size={15} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="addnew-contact__btn">Add new certification</button>
      </div>
    </div>
  );
};

const Contacts = () => {
  const [addNewContact, setAddNewContact] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetEmergencyContact}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setEmergencyContacts(res.returnStatus.data);
      });
  }, [emergencyContacts]);

  const deleteHandleContact = (e, id) => {
    e.preventDefault();
    fetch(`${DeleteContact}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //logging result
      });
  };
  return (
    <div>
      <div>
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Contacts</h3>

        <div className="account-profile-contactnums__wrapper">
          {addNewContact === false ? (
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
                  {emergencyContacts.map((data, index) => (
                    <tr key={index}>
                      <td>{data.contactName}</td>
                      <td>{data.contactMobile}</td>
                      <td>{data.contactRelationship}</td>
                      <td>{data.contactEmailAddress}</td>
                      <td style={{ display: "flex", gap: "5px" }}>
                        <button>
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={(e) => deleteHandleContact(e, data.id)}
                        >
                          <Trash size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <AddNewContact
              addNewContact={addNewContact}
              setAddNewContact={setAddNewContact}
            />
          )}
        </div>
        <button
          className="addnew-contact__btn"
          onClick={() => setAddNewContact(!addNewContact)}
        >
          {addNewContact === false ? "Add new contact" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

const AddNewContact = ({ addNewContact, setAddNewContact }) => {
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [formRelationship, setFormRelationship] = useState("");
  const [formEmailAddress, setFormEmailAddress] = useState("");

  const addedContact = (e) => {
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(CreateContact, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        PractitionerId: id,
        ContactName: formName,
        ContactMobile: formNumber,
        ContactRelationship: formRelationship,
        ContactEmailAddress: formEmailAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAddNewContact(false);
      });
  };
  return (
    <div className="addnewcontact__wrapper">
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
            <td>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setFormName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Number"
                onChange={(e) => setFormNumber(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Relationship"
                onChange={(e) => setFormRelationship(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setFormEmailAddress(e.target.value)}
              />
            </td>
            {addNewContact === false ? (
              <td style={{ display: "flex", gap: "5px" }}>
                <button>
                  <Pencil size={15} />
                </button>
                <button>
                  <Trash size={15} />
                </button>
              </td>
            ) : (
              <td>
                <button className="save-contact__btn" onClick={addedContact}>
                  Save
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const TimezonesSettings = () => {
  const [editActive, setEditActive] = useState(false);

  const TimezoneEdit = () => {
    return (
      <div>
        <div className="account-timezone-edit__wrapper">
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
        <button
          className="account-timezonesetting-cancel_btn"
          onClick={() => setEditActive(false)}
        >
          Cancel
        </button>
        <button className="account-timezonesetting-save__btn">Save</button>
      </div>
    );
  };
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Timezone</h3>
      {editActive === false ? (
        <div className="account-timezone__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profileheader">
              Timezone/Date preference
            </p>
            <button
              className="account-timezone-edit__btn"
              onClick={() => setEditActive(true)}
            >
              <Pencil size={15} />
              Edit
            </button>
          </div>
          <div style={{ width: "57%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <p className="account-timezone__text timezonelabel">Country</p>
              <p className="account-timezone__text timezonedetails">
                New Zealand
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p className="account-timezone__text timezonelabel">Timezone</p>
              <p className="account-timezone__text timezonedetails">
                Pacific/Auckland
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p className="account-timezone__text timezonelabel">
                Date Format
              </p>
              <p className="account-timezone__text timezonedetails">
                DD/MM/YYYY
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p className="account-timezone__text timezonelabel">
                Time Format
              </p>
              <p className="account-timezone__text timezonedetails">24-Hour</p>
            </div>
          </div>
        </div>
      ) : (
        <TimezoneEdit />
      )}
    </div>
  );
};

const Account = () => {
  const [loggedUserData, setLoggedUserData] = useState([]);
  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetaHealthPractitioner}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedUserData(data);
      });
  }, []);
  return (
    <div>
      <div className="setting-contents-display-container__wrapper">
        <Profile loggedUserData={loggedUserData} />
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
