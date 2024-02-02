import React from "react";

const FullResult = ({ setOpenResult }) => {
  return (
    <div>
      <button
        className="fullres-back__btn"
        onClick={() => setOpenResult(false)}
      >
        back
      </button>
      <div className="fullres-profile__wrapper">
        <h3>Johnson Martin Leaso Henderson</h3>
        <p>DOB: 2 November 1998</p>
        <p>Age: 35</p>
        <p>Nationality: Mexican</p>
        <p>Height: 166cm</p>
        <p>Weight: 75kg</p>
      </div>
    </div>
  );
};

export default FullResult;
