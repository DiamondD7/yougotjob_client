import React from "react";

import "../../styles/signinstyles.css";
const SignIn = () => {
  return (
    <div className="signin__wrapper">
      <div className="logo"></div>
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
        <h2>
          Set up your personalized account by providing all your information
          through your doctor
        </h2>
        <br />
        <br />
        <br />
        <br />
        <p>Contact</p>
        <p className="contact-number__text">0800-5553-4340</p>
      </div>
    </div>
  );
};

export default SignIn;
