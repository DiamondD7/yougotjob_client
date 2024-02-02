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
      <h1>Hello</h1>
    </div>
  );
};

export default FullResult;
