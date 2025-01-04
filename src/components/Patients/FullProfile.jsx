import React, { useState } from "react";
import { CaretRight, X, DownloadSimple } from "@phosphor-icons/react";

const PatientDocuments = () => {
  return (
    <div>
      <h4>Documents</h4>
      <div className="patient-documents__wrapper">
        <table className="patient-documents__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Name</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>12/12/2024</td>
              <td>passport</td>
              <td>.pdf</td>
              <td>
                <button className="btnclear">
                  <DownloadSimple size={18} color="#202020" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PatientDetails = ({ fullProfileData }) => {
  const none = "N/A";
  return (
    <div style={{ marginTop: "20px" }}>
      <label style={{ fontSize: "12px", color: "#9dcd5a" }}>NHI: </label>
      <label style={{ fontSize: "12px", color: "#9dcd5a", fontWeight: "bold" }}>
        {fullProfileData.nhi}
      </label>
      <div className="fullres-patient-details__wrapper">
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <label>Date of birth</label>
            <p>{fullProfileData.dob}</p>
          </div>
          <div>
            <label>Age</label>
            <p>{fullProfileData.age}</p>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Address</label>
          <p>{fullProfileData.homeAddress}</p>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <label>Contact number</label>
              <p>{fullProfileData.mobileNumber || none}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{fullProfileData.emailAddress}</p>
            </div>
            <div>
              <label>Insurance</label>
              <p>N/A</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Registered on</label>
          <p>12/12/2024</p>
        </div>
      </div>
    </div>
  );
};

const FullProfile = ({ fullProfileData, setOpenFullProfile }) => {
  return (
    <div style={{ margin: "10px 0 0 10px" }}>
      <button
        className="fullres-close__btn"
        onClick={() => setOpenFullProfile(false)}
      >
        <X size={20} />
      </button>
      <div className="fullres-route-name__wrapper">
        <h3>Patients</h3>
        <CaretRight size={15} color="#202020" />
        <h3 style={{ color: "rgba(0,0,0,0.5)" }}>{fullProfileData.fullName}</h3>
      </div>

      <PatientDetails fullProfileData={fullProfileData} />
      <br />
      <br />
      <PatientDocuments />
    </div>
  );
};

export default FullProfile;
