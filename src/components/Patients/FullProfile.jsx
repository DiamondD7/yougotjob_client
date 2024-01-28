import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import ViewPDF from "../../assets/pdf/Aaron-CoverLetter.pdf";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const FullProfile = ({ fullProfileData, setOpenFullProfile }) => {
  const newPlugin = defaultLayoutPlugin();
  console.log(ViewPDF);
  return (
    <div>
      <div className="full-profile-container__wrapper">
        <div
          className="search-profile-container__wrapper"
          style={{ marginTop: "38px" }}
        >
          <button
            className="full-profile__btn"
            onClick={() => setOpenFullProfile(false)}
          >
            <X size={27} color="#454545" />
          </button>
          <div className="search-profile-header__wrapper">
            <img
              src={fullProfileData.picture}
              alt="test-img"
              className="search-profile__img"
            />
            <div>
              <p className="search-profile-header__texts">
                Nationality: {fullProfileData.nationality}
              </p>
              <p className="search-profile-header__texts">
                DOB: {fullProfileData.dob}
              </p>
              <p className="search-profile-header__texts">
                Age: {fullProfileData.age}
              </p>
              <p className="search-profile-header__texts">
                Height: {fullProfileData.height} cm
              </p>
              <p className="search-profile-header__texts">
                Weight: {fullProfileData.weight} kg
              </p>
            </div>
          </div>
          <p className="search-profile-name__text">
            {fullProfileData.firstName} {fullProfileData.lastName}
          </p>
          <p className="search-profile-nhi__text">NHI: {fullProfileData.nhi}</p>
        </div>

        <div className="pdf-container__wrapper">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={ViewPDF} plugins={[newPlugin]} />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;
