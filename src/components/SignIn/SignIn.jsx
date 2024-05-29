import React, { useEffect, useState } from "react";
import { AddHealthPractitionerUser } from "../../assets/js/serverApi";

import "../../styles/signinstyles.css";
const SignIn = () => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  var today = new Date();
  const HandlingSignUp = (e) => {
    e.preventDefault();
    fetch(AddHealthPractitionerUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        RegistrationNumber: registrationNumber,
        FullName: fullName,
        EmailAddress: emailAddress,
        Role: "Practitioner",
        UserPassword: password,
        DOB: today,
        EmailRecovery: "",
        Mobile: "",
        MobileRecovery: "",
        Certifications: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="signin__wrapper">
      <div className="logo"></div>
      {signUpClicked === false ? (
        <div className="signinform-container__wrapper">
          <h1>Sign in</h1>
          <form>
            <input type="text" placeholder="Username" />
            <br />
            <input type="password" placeholder="Password" />
            <br />
            <button>Submit</button>
          </form>
          <p>or</p>
          <br />
          <h1>No account?</h1>
          <div style={{ textAlign: "center" }}>
            <button
              className="signin-signup__btn"
              onClick={() => setSignUpClicked(true)}
            >
              Sign up here
            </button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <p>Contact</p>
          <p className="contact-number__text">0800-5553-4340</p>
        </div>
      ) : (
        <div className="signinform-container__wrapper">
          <h1>Sign up</h1>
          <form onSubmit={HandlingSignUp}>
            <div>
              <input
                type="text"
                placeholder="Registration Number"
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="termsofuse__text">
                By signing up to create an account: I accept Terms of Use and
                Privacy Policy
              </p>
            </div>
            <br />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
