import React from "react";

const GoogleSignUpPatient = ({ email, nhi, setNhi }) => {
  return (
    <div>
      <h1>THIS COMPONENT IS NOT RENDERED NOR USED</h1>
      <div className="signup-google__wrapper ">
        <p>
          Please provide your NHI number for verification. Your NHI number will
          be verfied by our team, an email with the result of the validation
          will be sent to your email address <strong>{email}</strong>
        </p>
        <br />
        <input
          type="text"
          placeholder="NHI"
          value={nhi}
          className="signin-signup-form__input"
          onChange={(e) => setNhi(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GoogleSignUpPatient;
