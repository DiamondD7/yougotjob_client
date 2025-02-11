import React from "react";
import { CheckCircle } from "@phosphor-icons/react";

const SuccessfulSignUp = () => {
  return (
    <div>
      <div style={{ marginTop: "200px", textAlign: "center" }}>
        <CheckCircle size={62} weight="fill" color="#9dcd5a" />

        <p style={{ color: "rgba(0,0,0,0.3)", fontWeight: "bold" }}>
          Successful Login
        </p>

        <br />
        <br />
        <button
          className="success-signup__btn"
          onClick={() => {
            window.location.reload();
          }}
        >
          Click here to go back to the log in page
        </button>
      </div>
    </div>
  );
};

export default SuccessfulSignUp;
