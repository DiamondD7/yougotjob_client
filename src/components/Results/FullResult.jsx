import React from "react";
import ViewPDF from "../../assets/pdf/Aaron-CoverLetter.pdf";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const FullResult = ({ setOpenResult }) => {
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
          <div className="fullres-profile__wrapper">
            <div>
              <img
                className="result-profile-pic__img"
                src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile-pic"
              />
            </div>
            <div>
              <h3>Johnson Martin Leaso Henderson</h3>
              <h4 className="nhi-header">NHI: 3550837</h4>
              <p>DOB: 2 November 1998</p>
              <p>Age: 35</p>
              <p>Nationality: Mexican</p>
              <p>Height: 166cm</p>
              <p>Weight: 75kg</p>
            </div>
          </div>

          <div className="fullres-testdescription__wrapper">
            <h3>Haemoglobin Test:</h3>
            <br />
            <div>
              <h5>Symptoms</h5>
              <textarea className="symptoms-textarea"></textarea>
            </div>
          </div>
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

export default FullResult;
