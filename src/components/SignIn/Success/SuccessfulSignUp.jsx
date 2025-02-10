import React from "react";
import { CheckCircle } from "@phosphor-icons/react";

const SuccessfulSignUp = () => {
  return (
    <div>
      <div style={{ marginTop: "200px", textAlign: "center" }}>
        <CheckCircle size={62} weight="fill" color="#9dcd5a" />

        <p style={{ color: "rgba(0,0,0,0.3)", fontWeight: "bold" }}>
          Successful Payment
        </p>
        <br />
        <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.3)" }}>
          You will be redirected back to the home page shortly
        </p>
        <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.3)" }}>
          or click here to return to home page
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
