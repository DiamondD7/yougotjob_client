import React, { useEffect, useState } from "react";
import {
  AddHealthPractitionerUser,
  GetaHealthPractitioner,
  CheckPassword,
} from "../../assets/js/serverApi";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/signinstyles.css";
const SignIn = ({ localData }) => {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorSignupMessage, setErrorSignupMessage] = useState("");
  const [isError, setIsError] = useState(false);

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
        if (data.returnStatus.status === false) {
          setIsError(true); //setting error to be true
          setErrorSignupMessage(data.returnStatus.message); //error message for the client to see
        } else {
          console.log(data);
          validateError(); //calling function to set the error back to false once the user succeeded
          setSignUpClicked(false); //going back to the sign in container after successfully signing up
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateError = () => {
    setIsError(false);
  };

  const [signinEmailAddress, setSigninEmailAddress] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (checkedPassword === true) {
      fetch(`${GetaHealthPractitioner}/${sessionStorage.getItem("id")}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data); //get the logged in user's data here.
        });
    }
  }, [checkedPassword]);

  const navigate = useNavigate();
  const handleCheckPass = (e) => {
    e.preventDefault();
    fetch(CheckPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        EmailAddress: signinEmailAddress,
        UserPassword: signinPassword,
        RegistrationNumber: "",
        FullName: "",
        Role: "",
        DOB: today,
        EmailRecovery: "",
        Mobile: "",
        MobileRecovery: "",
        Certifications: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.returnStatus.status === false) {
          //checking if the status from the error is false or true
          console.log(data.returnStatus.message); //error message
          setErrorMessage(data.returnStatus.message);
        } else {
          localData(data); //setData and auth
          setCheckedPassword(true);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err); //error
      });
  };

  useEffect(() => {
    sessionStorage.setItem("id", 0); //reset id in the session
  }, []);
  return (
    <div className="signin__wrapper">
      <div className="logo"></div>
      {signUpClicked === false ? (
        <div className="signinform-container__wrapper">
          <h1>Sign in</h1>
          <form>
            {errorMessage && (
              <p className="signinform-errormessage__text">{errorMessage}</p>
            )}
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setSigninEmailAddress(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setSigninPassword(e.target.value)}
            />
            <br />
            <Link
              className="signin-submit__btn"
              onClick={handleCheckPass}
              to="/home"
            >
              Submit
            </Link>
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
          {isError === true ? (
            <p className="signinform-errormessage__text">
              {errorSignupMessage}
            </p>
          ) : (
            ""
          )}
          <form onSubmit={(e) => HandlingSignUp(e)}>
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
            <button className="signup-signin-submit__btn" type="submit">
              Submit
            </button>
            <br />
            <button
              className="signup-back__btn"
              onClick={() => setSignUpClicked(false)}
            >
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
