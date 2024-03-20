import React, { useState } from "react";
import { X } from "@phosphor-icons/react";

const AddEvent = ({ setOpenAddEventModal }) => {
  const [formSearchField, setFormSearchField] = useState("");

  const testProfile = [
    {
      id: 55,
      picture:
        "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "NHNX8438",
      firstName: "Henry",
      lastName: "Tood",
      nationality: "Indian",
      dob: "28 Jan 1998",
      age: "25",
      height: "160",
      weight: "60",
      email: "henry@gmail.com",
    },
    {
      id: 56,
      picture:
        "https://images.unsplash.com/photo-1705798543468-5b951da25e1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "KJHN8438",
      firstName: "Helen",
      lastName: "Tood",
      nationality: "Indian",
      dob: "2 Nov 1991",
      age: "32",
      height: "150",
      weight: "60",
      email: "helen@gmail.com",
    },
    {
      id: 57,
      picture:
        "https://images.unsplash.com/photo-1699901853492-8bc942fc6a5c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "CDEK8438",
      firstName: "Jack",
      lastName: "Armstrong",
      nationality: "Kiwi",
      dob: "15 Aug 1997",
      age: "26",
      height: "180",
      weight: "77",
      email: "jackarm@gmail.com",
    },
  ];
  const filteredFormData = testProfile.filter(
    (data) =>
      data.firstName.toLowerCase().includes(formSearchField.toLowerCase()) ||
      data.lastName.toLowerCase().includes(formSearchField.toLowerCase()) ||
      data.nhi.toLowerCase().includes(formSearchField.toLowerCase())
  );

  return (
    <div>
      <div className="addevent__wrapper">
        <button
          className="addevent-close__btn"
          onClick={() => setOpenAddEventModal(false)}
        >
          <X size={30} color="#f3f3f3" />
        </button>
        <h1 style={{ color: "#f3f3f3", marginLeft: "100px" }}>
          Appointment Form
        </h1>
        <div className="addevent-subcontainer__wrapper">
          <div className="form-search-users__wrapper">
            <h4 style={{ textAlign: "center" }}>Search for existing user</h4>
            <input
              type="text"
              className="form-search-users__input"
              placeholder="Patient ID / Name / NHI"
              onChange={(e) => setFormSearchField(e.target.value)}
            />
            {filteredFormData.length === 0 || formSearchField === "" ? (
              <div></div>
            ) : (
              <div className="form-search-result__wrapper">
                {filteredFormData.map((data, index) => (
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "3px",
                      width: "100%",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    key={index}
                  >
                    <img
                      className="form-search-profile-picture__img"
                      src={data.picture}
                      alt="profilepic"
                    />
                    <p style={{ fontSize: "11px" }}>
                      {data.firstName} {data.lastName}
                    </p>
                    <p style={{ fontSize: "11px" }}>{data.nhi}</p>
                    <p style={{ fontSize: "11px" }}>{data.height}cm</p>
                    <p style={{ fontSize: "11px" }}>{data.weight}kg</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="form-details__wrapper">
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              Or
            </p>
            <h4 style={{ textAlign: "center", marginBottom: "10px" }}>
              Create a new appointment
            </h4>
            <div style={{ display: "flex" }}>
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  First Name
                </p>
              </div>
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  Last Name
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  Contact number
                </p>
              </div>
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  Email Address
                </p>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input className="form-address__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  margin: "5px 0 0 16px",
                }}
              >
                Street Address
              </p>
              <input className="form-address__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  margin: "5px 0 0 16px",
                }}
              >
                Street Address Line 2
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  City
                </p>
              </div>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  Postal / Zip Code
                </p>
              </div>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  State/Province
                </p>
              </div>
            </div>
            <div>
              <textarea className="form-comments__textarea"></textarea>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "2px",
                  marginLeft: "16px",
                }}
              >
                Comments
              </p>
            </div>
            <button className="form-submit__btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
