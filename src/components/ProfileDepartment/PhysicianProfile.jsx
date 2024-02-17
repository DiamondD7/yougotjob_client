import React from "react";
import { Phone, Envelope, GraduationCap } from "@phosphor-icons/react";

import "../../styles/physicianprofilestyles.css";
const PhysicianProfile = () => {
  return (
    <div>
      <div className="profile-details__wrapper">
        <div style={{ display: "flex", gap: "10px" }}>
          <img
            className="profile-doctor-picture"
            src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="doctor-picture"
          />
          <div>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Dr. Mahichit Sharma
            </p>
            <p>General Practioner</p>
            <div style={{ marginTop: "20px" }}>
              <div className="physician-profile-sub-details__wrapper">
                <GraduationCap size={17} color="rgba(0,0,0,0.5)" />
                <p style={{ fontSize: "13px" }}>Phd in Medicine </p>
              </div>
              <div className="physician-profile-sub-details__wrapper">
                <Envelope size={17} color="rgba(0,0,0,0.5)" />
                <p style={{ fontSize: "13px" }}>mahichitsharma@clinic.com</p>
              </div>
              <div className="physician-profile-sub-details__wrapper">
                <Phone size={17} color="rgba(0,0,0,0.5)" />
                <p style={{ fontSize: "13px" }}>02102102124</p>
              </div>

              <button className="btnclear physician-profile-allinfo__btn">
                see all information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicianProfile;
