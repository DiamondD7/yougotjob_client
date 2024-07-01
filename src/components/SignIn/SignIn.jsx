import React, { useEffect, useState } from "react";
import {
  AddHealthPractitionerUser,
  GetaHealthPractitioner,
  CheckRegistration,
  CheckPassword,
} from "../../assets/js/serverApi";
import { Link, useNavigate } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";

import "../../styles/signinstyles.css";

const SignUpOptions = ({
  setSignupOptionsClicked,
  setPatientOption,
  setHealthPractitionerOption,
}) => {
  return (
    <div className="signin__wrapper">
      <div className="signupform-options-container__wrapper">
        <h2 className="signupas-title">Sign up as</h2>
        <div className="signup-options__wrapper">
          <button
            className="signup-options__btns"
            onClick={() => setPatientOption(true)}
          >
            Patient
          </button>
          <button
            className="signup-options__btns"
            onClick={() => setHealthPractitionerOption(true)}
          >
            General Practitioner
          </button>
          <button className="signup-options__btns">Nurse</button>
          <button className="signup-options__btns">Therapist</button>
          <button className="signup-options__btns">Audiologist</button>
          <button className="signup-options__btns">Acupuncturist</button>
          <button className="signup-options__btns">Chiropractor</button>
          <button className="signup-options__btns">Midwife</button>
          <button className="signup-options__btns">Nutritionists</button>
          <button className="signup-options__btns">Health Coaches</button>
          <button className="signup-options__btns">Personal Trainers</button>
          <button className="signup-options__btns">Pilates Instructors</button>
        </div>
        <button
          className="signup-options-back__btn"
          onClick={() => setSignupOptionsClicked(false)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const PatientSignUp = ({ setPatientOption }) => {
  return (
    <div>
      <div className="signupform-options-container__wrapper">
        <h1 style={{ textAlign: "center" }}>Patient Sign up</h1>
        <br />
        <form className="signup-form">
          <input
            className="signin-signup-form__input"
            type="text"
            placeholder="NHI"
          />
          <input
            className="signin-signup-form__input"
            type="text"
            placeholder="Full name"
          />
          <input
            required
            className="signin-signup-form__input"
            type="text"
            placeholder="Email"
          />
          <input
            required
            className="signin-signup-form__input"
            type="password"
            placeholder="Password"
          />
          <input
            required
            type="password"
            placeholder="Confirm password"
            className="signin-signup-form__input"
          />
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p className="termsofuse__text">
            By signing up to create an account: I accept Terms of Use and
            Privacy Policy
          </p>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button className="signup-signin-submit__btn" type="submit">
            Submit
          </button>
          <button
            className="signup-back__btn"
            onClick={() => setPatientOption(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const SignIn = ({ localData }) => {
  // SIGNUP-OPTIONS
  const [patientOption, setPatientOption] = useState(false);
  const [healthPractitionerOption, setHealthPractitionerOption] =
    useState(false);
  // SIGNUP-OPTIONS

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signupOptionsClicked, setSignupOptionsClicked] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validPwdMatch, setValidPwdMatch] = useState(true);
  const [validPwd, setValidPwd] = useState("");

  const [errorSignupMessage, setErrorSignupMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isErrorRegistration, setIsErrorRegistration] = useState(false);
  const [errorRegistrationMessage, setErrorRegistrationMessage] =
    useState(false);
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [isErrrorPwd, setIsErrorPwd] = useState(false);
  var today = new Date();

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    if (PWD_REGEX.test(password) === true) {
      setIsErrorPwd(false);
    }
    const match = password === matchPwd;
    setValidPwdMatch(match);
  }, [password, matchPwd]);

  const handlingSignUp = (e) => {
    e.preventDefault();
    const isPwdValid = PWD_REGEX.test(password);
    if (!validPwdMatch) {
      console.log("Password do not match");
      return;
    }
    if (!isPwdValid) {
      setIsErrorPwd(true);
      return;
    }
    setIsLoadingSignUp(true);
    setIsErrorRegistration(false);

    setTimeout(() => {
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
          setIsLoadingSignUp(false);
          if (data.returnStatus.status === false) {
            setIsError(true); //setting error to be true
            setErrorSignupMessage(data.returnStatus.message); //error message for the client to see
          } else {
            console.log(data); //DELETE
            handleBackButton(); //called to restart values
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  };

  const handlingCheckRegistration = (e) => {
    e.preventDefault();
    setIsError(false);
    fetch(CheckRegistration, {
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
        setIsLoadingSignUp(false);
        if (data.returnStatus.status === false) {
          setIsErrorRegistration(true); //setting error to be true
          setErrorRegistrationMessage(data.returnStatus.message); //error message for the client to see
        } else {
          console.log(data); //DELETE
          handlingSignUp(e);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackButton = () => {
    //handlingBackButton when going back
    //and called this in the handlingSignUp to restart all values
    setHealthPractitionerOption(false);
    setIsError(false);
    setIsErrorRegistration(false);
    setIsErrorPwd(false);
    setFullName("");
    setRegistrationNumber("");
    setEmailAddress("");
    setPassword("");
    setMatchPwd("");
  };

  // ------------------------------------------------------------------------------

  const [signinEmailAddress, setSigninEmailAddress] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);

  const navigate = useNavigate();
  const handleCheckPass = (e) => {
    e.preventDefault();
    setIsLoadingSignIn(true);
    setTimeout(() => {
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
          HomeAddress: "",
          Role: "",
          DOB: today,
          EmailRecovery: "",
          Mobile: "",
          MobileRecovery: "",
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
            navigate("/home");
          }
          setIsLoadingSignIn(false);
        })
        .catch((err) => {
          console.log(err); //error
        });
    }, 3000);
  };

  useEffect(() => {
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("id", 0); //reset id in the session
  }, []);
  return (
    <div className="signin__wrapper">
      <div className="logo"></div>
      {signupOptionsClicked === false ? (
        <div className="signinform-container__wrapper">
          <h1>Sign in</h1>
          {isLoadingSignIn === true ? (
            <div>
              <CircleNotch
                size={26}
                color="#202020"
                className={"loading-icon"}
              />
            </div>
          ) : (
            <div>
              <form>
                {errorMessage && (
                  <p className="signinform-errormessage__text">
                    {errorMessage}
                  </p>
                )}
                <input
                  className="signin-signup-form__input"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setSigninEmailAddress(e.target.value)}
                />
                <br />
                <input
                  className="signin-signup-form__input"
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
                  onClick={() => setSignupOptionsClicked(true)}
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
          )}
        </div>
      ) : (
        <div>
          <SignUpOptions
            setSignupOptionsClicked={setSignupOptionsClicked}
            setPatientOption={setPatientOption}
            setHealthPractitionerOption={setHealthPractitionerOption}
          />
          {patientOption === true ? (
            <PatientSignUp setPatientOption={setPatientOption} />
          ) : (
            ""
          )}

          {healthPractitionerOption === true ? (
            <div className="signinform-container__wrapper">
              <h1>Sign up</h1>
              {isError === true ? (
                <p className="signinform-errormessage__text">
                  {errorSignupMessage}
                </p>
              ) : (
                ""
              )}
              {isErrorRegistration === true ? (
                <p className="signinform-errormessage__text">
                  {errorRegistrationMessage}
                </p>
              ) : (
                ""
              )}
              {isLoadingSignUp === true ? (
                <div>
                  <CircleNotch
                    size={26}
                    color="#202020"
                    className={"loading-icon"}
                  />
                </div>
              ) : (
                <form onSubmit={handlingCheckRegistration}>
                  <div>
                    <input
                      type="text"
                      placeholder="Registration Number"
                      value={registrationNumber}
                      className="signin-signup-form__input"
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      className="signin-signup-form__input"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Email"
                    value={emailAddress}
                    className="signin-signup-form__input"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <br />
                  <div>
                    {isErrrorPwd === true ? (
                      <div className="passworderrornotvalid__wrapper">
                        <p>password is not valid</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      required
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className={`signin-signup-form__input ${
                        validPwd === false && password.length !== 0
                          ? "notvalidpwd"
                          : ""
                      }`}
                    />
                  </div>
                  <input
                    required
                    type="password"
                    placeholder="Confirm password"
                    className="signin-signup-form__input"
                    onChange={(e) => setMatchPwd(e.target.value)}
                  />
                  {validPwdMatch === false && matchPwd.length !== 0 ? (
                    <div className="password-notmatch__wrapper">
                      <p>Password do not match !</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p className="termsofuse__text">
                      By signing up to create an account: I accept Terms of Use
                      and Privacy Policy
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
                    onClick={handleBackButton}
                  >
                    Back
                  </button>
                </form>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default SignIn;
