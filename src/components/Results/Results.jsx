import React from "react";

import "../../styles/resultsstyles.css";
const Results = () => {
  return (
    <div>
      <div className="patients-results-container__wrapper">
        <div className="patients-results-container">
          <div>
            <p className="patient-result-date">5/12/2023</p>
          </div>
          <div className="patient-sub-details__wrapper">
            <h3 className="patient-name__text">Aaron Sierra</h3>
            <p className="patient-id__text">ID:30004997</p>
          </div>
          <div className="patient-diagnosis__wrapper">
            <p>
              jdokiajdkoia Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Repellendus dolores minima cupiditate officiis voluptatum,
              sed laborum amet similique atque assumenda minus eligendi libero
              mollitia illum, fugit corporis aspernatur facilis nemo! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Asperiores
              doloribus exercitationem, ad delectus, nostrum sit magni veniam
              illo corporis minus iusto dolor, nulla rerum necessitatibus
              reprehenderit. Quam fuga nostrum dolorum!
            </p>
          </div>
          <div>
            <button className="patient-view__btn">view</button>
          </div>
        </div>
        <div className="patients-results-container">
          <div>
            <p className="patient-result-date">5/12/2023</p>
          </div>
          <div className="patient-sub-details__wrapper">
            <h3 className="patient-name__text">Tiara Tubalado </h3>
            <p className="patient-id__text">ID:35206327</p>
          </div>
          <div className="patient-diagnosis__wrapper">
            <p>
              jdokiajdkoia Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Repellendus dolores minima cupiditate offici
            </p>
          </div>
          <div>
            <button className="patient-view__btn">view</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
