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
      </div>
    </div>
  );
};

export default Records;
