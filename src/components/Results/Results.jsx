import React from "react";

import "../../styles/resultsstyles.css";
const Results = () => {
  return (
    <div>
      <div className="patients-results-container__wrapper">
        <div className="patients-results-container">
          <div className="patient-sub-details__wrapper">
            <h3 className="patient-name__text">Aaron Sierra</h3>
            <p className="patient-id__text">ID:30004997</p>
          </div>
        </div>
        <div className="patients-results-container">
          <div className="patient-sub-details__wrapper">
            <h3 className="patient-name__text">Tiara Tubalado </h3>
            <p className="patient-id__text">ID:35206327</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
