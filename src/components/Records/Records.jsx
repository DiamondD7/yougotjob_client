import React from "react";

import "../../styles/recordsstyles.css";
const PatientDetailsContainer = () => {
  return (
    <div>
      <div className="patientdetails-container__wrapper">
        <div style={{ backgroundColor: "#9dcd5a" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <p className="contents-headingTitle__text">Patient Details</p>
            <button className="contents-edit__btn">edit</button>
          </div>
        </div>
        <div style={{ padding: "5px" }}>
          <p className="contents-details__text">Name: Johnson Martin Leoso</p>
          <p className="contents-details__text">
            Address: 1/33 Butley Drive, Farm Cove
          </p>
          <p className="contents-details__text">Date of Birth: 03/01/1966</p>
        </div>
      </div>
    </div>
  );
};

const Records = () => {
  return (
    <div>
      <div>
        <div className="records-invoice-search__wrapper">
          <input
            type="text"
            className="records-invoice-search__input"
            placeholder="Search by patient name, nhi or id"
          />
          <button className="records-invoice-search__btn">search</button>
        </div>
        <div className="records-invoice-container__wrapper">
          {/* <p className="norecordsfound__text">No records found</p> */}
          <p className="status-outcome__text">Paid</p>
          <label className="status-outcome__date"> on 15/03/2024</label>
          <h4>Invoice #77134</h4>
          <p style={{ fontSize: "11px" }}>Johnson Martin Leoso</p>
          <div style={{ marginTop: "10px" }}>
            <PatientDetailsContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
