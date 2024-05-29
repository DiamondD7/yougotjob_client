import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/signinstyles.css";
const SignIn = () => {
  const [signUpClicked, setSignUpClicked] = useState(false);

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
          <form>
            <div>
              <input type="text" placeholder="Registration Number" />
              <input type="text" placeholder="Full Name" />
            </div>
            <input type="text" placeholder="Email" />
            <br />
            <input type="password" placeholder="Password" />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p className="termsofuse__text">
                By signing up to create an account: I accept Terms of Use and
                Privacy Policy
              </p>
            </div>
            <br />
            <br />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
