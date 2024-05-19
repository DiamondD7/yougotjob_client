import React from "react";

import "../../styles/recordsstyles.css";
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
        </div>
      </div>
    </div>
  );
};

export default Records;
