import React, { useState } from "react";
import ViewPDF from "../../assets/pdf/Aaron-CoverLetter.pdf";
import { PencilSimpleLine, Prescription } from "@phosphor-icons/react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const FullResult = ({ setOpenResult, chosenView }) => {
  const newPlugin = defaultLayoutPlugin();
  return (
    <div>
      <button
        className="fullres-back__btn"
        onClick={() => setOpenResult(false)}
      >
        back
      </button>
      <div className="fullres-profile-container__wrapper">
        <div>
          {/* <div className="fullres-profile__wrapper">
            <div className="full-result-profile-subinfo__wrapper">
              <h3>{chosenView.fullName}</h3>
              <p className="nhi-header">NHI: {chosenView.nhi}</p>
            </div>
          </div> */}
          {/* <div>
            <button className="fullres-viewprofile__btn">
              view patient's profile
            </button>
          </div> */}

          <div className="fullres-details__wrapper">
            <h5>Appointment Details</h5>

            <div className="fullres-details-infos__wrapper">
              <div>
                <p>Patient: {chosenView.fullName}</p>
                <p>Email: {chosenView.emailAddress}</p>
              </div>
              <div>
                <p>Appointment Type: {chosenView.appointmentType}</p>
                {chosenView.appointmentType === "on-site" ? (
                  <p>
                    Address: {chosenView.streetAdress} {chosenView.suburb}{" "}
                    {chosenView.city}, {chosenView.postCode}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <br />
          {/* <div className="fullres-testdescription__wrapper">
            <div>
              <h5>Patient's comments</h5>
              <textarea
                className="conclusion-textarea"
                value={chosenView.comments}
              ></textarea>
            </div>
          </div>
          <div className="fullres-testdescription__wrapper">
            <div>
              <h5>Conclusion/findings</h5>
              <textarea
                className="conclusion-textarea"
                value={chosenView.conclusion}
              ></textarea>
            </div>
          </div> */}
        </div>

        {/* <div className="pdf-container__wrapper">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={ViewPDF} plugins={[newPlugin]} />
          </Worker>
        </div> */}
      </div>
    </div>
  );
};

export default FullResult;
