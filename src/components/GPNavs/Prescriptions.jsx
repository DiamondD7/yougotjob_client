import React from "react";

import "../../styles/prescriptionstyles.css";
const Prescriptions = () => {
  return (
    <div>
      <form className="prescription-form">
        <h4>Medical Prescription Form</h4>
        <br />
        <p>Search patient</p>
        <input
          className="prescription-search__input"
          type="text"
          placeholder="search patient"
        />

        <p style={{ textAlign: "center", marginTop: "20px" }}>Or</p>

        <p>Patient details</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="prescription-name__input"
            type="text"
            placeholder="First name"
          />
          <input
            className="prescription-name__input"
            type="text"
            placeholder="Last name"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="prescription-name__input"
            type="text"
            placeholder="NHI"
          />
          <input
            className="prescription-name__input"
            type="text"
            placeholder="Age"
          />
        </div>

        <br />
        <p>Treatment</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="prescription-treatment__input"
            type="text"
            placeholder="Medication name"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="prescription-treatment-half__input"
            type="text"
            placeholder="Route"
          />
          <input
            className="prescription-treatment-half__input"
            type="text"
            placeholder="Dosage"
          />
        </div>

        <table className="prescription-treatment__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medication Name</th>
              <th>Route</th>
              <th>Dosage</th>
              <th>Frequency (hr/day)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Paracetamol</td>
              <td>Oral</td>
              <td>500mg</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
        <button className="prescription-treatment__btn">Add medication</button>

        <br />
        <br />
        <p>Prescriber details</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="prescription-name__input"
            type="text"
            placeholder="First name"
          />
          <input
            className="prescription-name__input"
            type="text"
            placeholder="Last name"
          />
        </div>
        <br />
        <button className="prescription-form__btn">Submit</button>
      </form>
    </div>
  );
};

export default Prescriptions;
