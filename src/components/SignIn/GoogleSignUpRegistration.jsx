import React from "react";

const GoogleSignUp = ({
  emailAddress,
  setRegistrationNumber,
  registrationNumber,
}) => {
  return (
    <div>
      <div className="signup-google__wrapper ">
        <p>
          Please provide your Registration Number for verification. Your
          registration number will be verfied by our team, an email with the
          result of the validation will be sent to your email address{" "}
          <strong>{emailAddress}</strong>
        </p>
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          className="signin-signup-form__input"
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GoogleSignUp;
