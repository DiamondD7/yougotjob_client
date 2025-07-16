import React, { useEffect, useState } from "react";
import {
  AddHealthPractitionerUser,
  GetaHealthPractitioner,
  AddStripeAccount,
  AddTokens,
  AddTimePreference,
  CheckRegistration,
  CheckPassword,
  AddPatient,
  CheckPatientPassword,
  AddPatientDateTime,
  PatientToken,
  CheckGoogleEmail,
  EmailTwoFactorAuth,
  VerifyTwoFactorAuth,
  VerifyTwoFactorAuthPatient,
  EmailTwoFactorAuthPatient,
} from "../../assets/js/serverApi";
import PatientLogo from "../../assets/img/patientLogo.png";
import PractitionerLogo from "../../assets/img/practitionerLogo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  CircleNotch,
  LockKey,
  ArrowElbowRightDown,
} from "@phosphor-icons/react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GoogleSignUpPatient from "./GoogleSignUpPatient";
import GoogleSignUp from "./GoogleSignUp";

import "../../styles/signinstyles.css";
import SuccessfulSignUp from "./Success/SuccessfulSignUp";

const SignUpOptions = ({
  setSignupOptionsClicked,
  setPatientOption,
  setHealthPractitionerOption,
}) => {
  return (
    <div className="signin__wrapper">
      <div className="signupform-options-container__wrapper">
        <div className="signup-options__wrapper">
          {/* <div className="signup-options__btns">
            <p style={{ fontSize: "12px" }}>Patient</p>
            <button onClick={() => setPatientOption(true)}>
              <img src={PatientLogo} alt="patientLogo" />
            </button>
          </div>
          <div className="signup-options__btns">
            <p style={{ fontSize: "12px" }}>Practitioner</p>
            <button onClick={() => setHealthPractitionerOption("Practitioner")}>
              <img src={PractitionerLogo} alt="patientLogo" />
            </button>
          </div> */}

          <p style={{ fontSize: "12px" }}>
            <strong>Choose a role to create an account.</strong> <br /> <br />
            As a patient, you can book appointments with health practitioners.{" "}
            <br />
            As a health practitioner, you can manage your appointments and
            patients.
          </p>
          <br />
          <br />
          <div>
            <button
              className="signup-options__btn"
              onClick={() => setPatientOption(true)}
            >
              Patient
            </button>
          </div>
          <br />
          <div>
            <button
              className="signup-options__btn"
              onClick={() => setHealthPractitionerOption("Practitioner")}
            >
              Practitioner
            </button>
          </div>
          {/* <button
            className="signup-options__btns"
            onClick={() => setHealthPractitionerOption("Nurse")}
          >
            Nurse
          </button> */}
          {/* <button className="signup-options__btns">Therapist</button>
          <button className="signup-options__btns">Audiologist</button>
          <button className="signup-options__btns">Acupuncturist</button>
          <button className="signup-options__btns">Chiropractor</button>
          <button className="signup-options__btns">Midwife</button>
          <button className="signup-options__btns">Nutritionists</button>
          <button className="signup-options__btns">Health Coaches</button>
          <button className="signup-options__btns">Personal Trainers</button>
          <button className="signup-options__btns">Pilates Instructors</button> */}
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

const PatientSignUp = ({ setPatientOption, setSuccessfulSignUp }) => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  // const [nhi, setNhi] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [authProvider, setAuthProvider] = useState("local");
  const [fullName, setFullName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchedPw, setMatchedPw] = useState(false);
  const [validPw, setValidPw] = useState(false);
  // const [emailNhiError, setEmailNhiError] = useState(false);
  const [signupWithGoogle, setSignUpWithGoogle] = useState(false);

  const [error, setError] = useState("");
  const handlePatientDateTime = (id) => {
    fetch(AddPatientDateTime, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        PatientId: id,
        Country: "New Zealand",
        DateFormat: "DD/MM/YYYY",
        TimeFormat: "hh:mm A",
        TimeZone: "Pacific/Auckland",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    fetch(AddPatient, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        GoogleId: googleId,
        AuthProvider: authProvider,
        DepartmentRole: "Patient",
        FullName: fullName,
        GivenName: givenName,
        FamilyName: familyName,
        EmailAddress: email,
        UserPassword: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status !== false) {
          handlePatientDateTime(res.returnStatus.id);
          setPatientOption(false);
          setSuccessfulSignUp(true);
          // setEmailNhiError(false);
        }
        // else if (res.returnStatus.code === "400") {
        //   console.log("error");
        //   setError("Error: Email/NHI already taken");
        // } else {
        //   setEmailNhiError(true);
        // }
      });
  };

  useEffect(() => {
    const match = PWD_REGEX.test(password);
    if (password !== confirmPassword || password.length <= 0) {
      setMatchedPw(false);
    } else {
      setMatchedPw(true);
    }

    if (match === false) {
      setValidPw(false);
    } else {
      setValidPw(true);
    }
  }, [password, confirmPassword]);

  const handleGoogleSignUp = (res) => {
    const decoded = jwtDecode(res.credential);
    setSignUpWithGoogle(true);

    fetch(AddPatient, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        GoogleId: decoded.sub,
        AuthProvider: "google",
        DepartmentRole: "Patient",
        FullName: decoded.name,
        GivenName: decoded.given_name,
        FamilyName: decoded.family_name,
        EmailAddress: decoded.email,
        UserPassword: "",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status !== false) {
          handlePatientDateTime(res.returnStatus.id);
          setPatientOption(false);
          setSuccessfulSignUp(true);
          // setEmailNhiError(false);
        } else if (
          res.returnStatus.code === "400" ||
          res.returnStatus.status === false
        ) {
          console.log("error");
          setError("Error: Email/NHI already taken");
        }
        //else {
        //   setEmailNhiError(true);
        // }
      });
  };

  return (
    <div>
      <div className="signinform-container__wrapper">
        <h1 style={{ textAlign: "center" }}>Patient Sign up</h1>
        <form className="signup-form" onSubmit={handleAddPatient}>
          <div>
            {error && (
              <p className="emailtaken-error">Email already registered</p>
            )}

            {/* <input
                className="signin-signup-form__input"
                type="text"
                placeholder="NHI"
                onChange={(e) => setNhi(e.target.value)}
              /> */}
            <input
              className="signup-form__input"
              type="text"
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              required
              className="signup-form__input"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              className="signup-form__input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Confirm password"
              className="signup-form__input"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p
              className={
                validPw === false ? "pwd-validate-error" : "pwd-default"
              }
            >
              8 to 24 characters. Must include uppercase and lowercase letters,
              a number and a special character. <br />
              Allowed special characters: ! @ # $ %
            </p>
            <p
              className={
                password !== confirmPassword ? "pwd-donotmatch" : "pwd-default"
              }
            >
              Password do not match!
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p className="termsofuse__text">
                By signing up to create an account: I accept{" "}
                <Link
                  to="/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className="signup-signin-submit__btn"
                style={
                  matchedPw === false
                    ? {
                        cursor: "default",
                        backgroundColor: "transparent",
                        color: "rgba(0,0,0,0.5)",
                      }
                    : { cursor: "pointer" }
                }
                disabled={matchedPw === false ? true : false}
                type="submit"
              >
                Submit
              </button>
              <button
                className="signup-back__btn"
                onClick={() => setPatientOption(false)}
              >
                Back
              </button>
            </div>
            <p>Or</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <GoogleLogin
                  onSuccess={handleGoogleSignUp}
                  onError={(err) => console.log(err)}
                  text="signup_with"
                  width="330px"
                  shape="pill"
                />
              </GoogleOAuthProvider>
            </div>
          </div>
          {/* <button className="signup-signin-submit__btn" type="submit">
            Submit
          </button>
          <button
            className="signup-back__btn"
            onClick={() => setPatientOption(false)}
          >
            Back
          </button> */}
        </form>
      </div>
    </div>
  );
};

const PracitionerSignIn = ({ localData, today, setSignInOption }) => {
  const [signinEmailAddress, setSigninEmailAddress] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signInGoogleId, setSignInGoogleId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [isUnAuthorized, setIsUnAuthorized] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  //handle for the submit button in the <form>
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCheckPass();
  };

  //function for httprequest to check password. both google auth and local auth uses this function
  const handleCheckPass = () => {
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
          GoogleId: signInGoogleId,
          RegistrationNumber: "",
          FullName: "",
          HomeAddress: "",
          Role: "Practitioner",
          DOB: today,
          EmailRecovery: "",
          Mobile: "",
          MobileRecovery: "",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.returnStatus.status === false) {
            //checking if the status from the error is false or true
            console.log(data.returnStatus.message); //error message
            setErrorMessage(data.returnStatus.message);
          } else {
            if (data.returnStatus.userDetails) {
              //if the user signs up using google
              generateJwtTokens(data.returnStatus.userDetails);
              localData(data);
              navigate("/home");
            } else {
              //else if the user signs up using local sign in
              handleTwoFactorAuth();
              setOpenAuthForm(true);
            }
          }
          setIsLoadingSignIn(false);
        })
        .catch((err) => {
          console.log(err); //error
        });
    }, 3000);
  };

  //generate tokens after checking the password/email of the user.
  const generateJwtTokens = (healthPractitioners) => {
    fetch(AddTokens, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include", // Ensure cookies are included in the request if necessary
      body: JSON.stringify(healthPractitioners),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status === true) {
          navigate("/home");
        }
      });
  };

  const handleTwoFactorAuth = () => {
    fetch(EmailTwoFactorAuth, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signinEmailAddress),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const handleTwoFactorAuthVerify = (e) => {
    e.preventDefault();
    fetch(VerifyTwoFactorAuth, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        EmailAddress: signinEmailAddress,
        UserTwoFactorAuth: {
          Code: code,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status === false) {
          setIsUnAuthorized(true);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          generateJwtTokens(res.returnStatus.userDetails);
          localData(res); //setData and auth
        }
      });
  };

  //function for setting the values when user logs in using google
  const googleLogin = async (res) => {
    const decoded = jwtDecode(res.credential);
    setSigninEmailAddress(decoded.email);
    setSignInGoogleId(decoded.sub);
    setSigninPassword("");
  };

  //calling this after the googleLogin() set values are set due to asynchronous nature of react
  useEffect(() => {
    if (signInGoogleId) {
      handleCheckPass();
    }
  }, [signInGoogleId]);

  return (
    <div>
      <div>
        {/* className="signin__wrapper" */}
        {/* <div className="logo"></div> */}

        <div>
          {/*  className="signinform-container__wrapper" */}
          <h3>Login: Practitioner</h3>
          {openAuthForm ? (
            <div>
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <LockKey size={32} weight="fill" color="rgba(0,0,0,0.2)" />
                <h3>Two Factor Authentication</h3>
                <label style={{ fontSize: "12px" }}>
                  A verification code is sent to your email. This code will be
                  valid for only 30 seconds. <br />
                  Do not forget to check your spam folder
                </label>
              </div>
              <br />
              <div style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="verification-code__input"
                  placeholder="Type your code here..."
                  onChange={(e) => setCode(e.target.value)}
                />
                <br />
                <Link
                  className="signin-submit__link"
                  onClick={handleTwoFactorAuthVerify}
                  to="/home"
                >
                  Verify
                </Link>
              </div>
              <br />
              {isUnAuthorized && (
                <p style={{ color: "red" }}>
                  Unauthorized. You can try again, you will be redirected back
                  to the log-in screen in a few seconds.
                </p>
              )}
            </div>
          ) : (
            <div>
              {isLoadingSignIn === true ? (
                <div className="signinform-loading__wrapper">
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
                    <input
                      className="signin-signup-form__input"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setSigninPassword(e.target.value)}
                    />
                    <div>
                      <button
                        className="signin-submit__btn"
                        onClick={handleFormSubmit}
                      >
                        Submit
                      </button>
                      {/* <Link
                    className="signin-submit__btn"
                    onClick={handleFormSubmit}
                    to="/home"
                  >
                    Submit
                  </Link> */}
                      <button
                        className="signin-back__btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setSignInOption("Patient");
                        }}
                      >
                        back to patient login
                      </button>
                    </div>
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "55px",
                        fontSize: "12px",
                      }}
                    >
                      Or
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                      }}
                    >
                      <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
                        <GoogleLogin
                          onSuccess={googleLogin}
                          onError={(err) => console.log(err)}
                          text="signin_with"
                          width="280px"
                          shape="pill"
                        />
                      </GoogleOAuthProvider>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PatientSignIn = ({ localData, today, setSignInOption }) => {
  const [signinEmailAddress, setSigninEmailAddress] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);

  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [isUnAuthorized, setIsUnAuthorized] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  //handle the form submit
  const handleFormData = (e) => {
    e.preventDefault();
    handleCheckPass();
  };

  //this function is both used by local sign in and google auth
  const handleCheckPass = () => {
    setIsLoadingSignIn(true);
    setTimeout(() => {
      fetch(CheckPatientPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          EmailAddress: signinEmailAddress,
          UserPassword: signinPassword,
          // NHI: "",
          DepartmentRole: "Patient",
          GoogleId: googleId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.returnStatus.status === false) {
            //checking if the status from the error is false or true
            console.log(data.returnStatus.message); //error message
            setErrorMessage(data.returnStatus.message);
          } else {
            if (data.returnStatus.userDetails) {
              //if the user signs up using google
              generateJwtTokens(data.returnStatus.userDetails);
              localData(data);
              navigate("/home");
            } else {
              //else if the user signs up using local sign in
              handleTwoFactorAuth();
              setOpenAuthForm(true);
            }
          }
          setIsLoadingSignIn(false);
        })
        .catch((err) => {
          console.log(err); //error
        });
    }, 3000);
  };

  //generate tokens after checking the password/email of the user.
  const generateJwtTokens = (patients) => {
    fetch(PatientToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include", // Ensure cookies are included in the request if necessary
      body: JSON.stringify(patients),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status === true) {
          navigate("/home");
        }
      });
  };

  const handleTwoFactorAuth = () => {
    fetch(EmailTwoFactorAuthPatient, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signinEmailAddress),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const handleTwoFactorAuthVerify = (e) => {
    e.preventDefault();
    fetch(VerifyTwoFactorAuthPatient, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        EmailAddress: signinEmailAddress,
        UserTwoFactorAuth: {
          Code: code,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status === false) {
          setIsUnAuthorized(true);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          generateJwtTokens(res.returnStatus.userDetails);
          localData(res); //setData and auth
        }
      });
  };

  //setting values for these to be used to validate in the useEffect below.
  const googleAuthSignIn = async (res) => {
    const decoded = jwtDecode(res.credential);
    setGoogleId(decoded.sub);
    setSigninEmailAddress(decoded.email);
    setSigninPassword("");
  };

  //gets called when googleId's value changes and calls handleCheckPass to validate the user
  useEffect(() => {
    if (googleId) {
      handleCheckPass();
    }
  }, [googleId]);

  return (
    <div>
      <div>
        {/* className="signin__wrapper" */}

        {/* <div className="logo"></div> */}

        <div>
          {/* className="signinform-container__wrapper" */}
          <h3> Login: Patient</h3>
          <br />

          {openAuthForm ? (
            <div>
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <LockKey size={32} weight="fill" color="rgba(0,0,0,0.2)" />
                <h3>Two Factor Authentication</h3>
                <label style={{ fontSize: "12px" }}>
                  A verification code is sent to your email. This code will be
                  valid for only 30 seconds. <br />
                  Do not forget to check your spam folder
                </label>
              </div>
              <br />
              <div style={{ textAlign: "center" }}>
                <input
                  type="text"
                  className="verification-code__input"
                  placeholder="Type your code here..."
                  onChange={(e) => setCode(e.target.value)}
                />
                <br />
                <Link
                  className="signin-submit__btn"
                  onClick={handleTwoFactorAuthVerify}
                  to="/home"
                >
                  Verify
                </Link>
              </div>
              <br />
              {isUnAuthorized && (
                <p style={{ color: "red" }}>
                  Unauthorized. You can try again, you will be redirected back
                  to the log-in screen in a few seconds.
                </p>
              )}
            </div>
          ) : (
            <div>
              {isLoadingSignIn === true ? (
                <div className="signinform-loading__wrapper">
                  <CircleNotch
                    size={30}
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
                    <button
                      className="signin-submit__btn"
                      onClick={handleFormData}
                    >
                      Submit
                    </button>

                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "55px",
                        fontSize: "12px",
                      }}
                    >
                      Or
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                      }}
                    >
                      <GoogleOAuthProvider
                        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      >
                        <GoogleLogin
                          onSuccess={googleAuthSignIn}
                          onError={(err) => console.log(err)}
                          text="signin_with"
                          width="280px"
                          shape="pill"
                        />
                      </GoogleOAuthProvider>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                      <p style={{ fontSize: "12px" }}>
                        Are you a Practitioner?{" "}
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            textDecoration: "underline",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setSignInOption("Practitioner");
                          }}
                        >
                          Login here
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SignUpOpt = ({
  healthPractitionerOption,
  setHealthPractitionerOption,
}) => {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [authProvider, setAuthProvider] = useState("");
  const [fullName, setFullName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validPwdMatch, setValidPwdMatch] = useState(true);
  const [validPwd, setValidPwd] = useState("");
  const [googleSignUp, setGoogleSignUp] = useState(false);

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

  const handlingCheckRegistration = (e) => {
    e.preventDefault();

    const data = {
      RegistrationNumber: registrationNumber,
      GoogleId: googleId || "",
      AuthProvider: authProvider || "local",
      FullName: fullName,
      GivenName: givenName || "",
      FamilyName: familyName || "",
      EmailAddress: emailAddress,
      Role: "General Practitioner",
      DepartmentRole: healthPractitionerOption,
      WorkPreference: "online",
      UserPassword: password || "",
      DOB: today, //change the logic here to get the age
      RegisteredOn: today,
      EmailRecovery: "",
      Mobile: "",
      MobileRecovery: "",
      Certifications: [],
    };
    setIsError(false);
    fetch(CheckRegistration, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoadingSignUp(false);
        if (res.returnStatus.status === false) {
          setIsErrorRegistration(true); //setting error to be true
          setErrorRegistrationMessage(res.returnStatus.message); //error message for the client to see
        } else {
          setErrorRegistrationMessage("");
          console.log(res); //DELETE
          handlingSignUp(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlingSignUp = (data) => {
    if (!googleSignUp) {
      const isPwdValid = PWD_REGEX.test(password);
      if (!validPwdMatch) {
        console.log("Password do not match");
        return;
      }
      if (!isPwdValid) {
        setIsErrorPwd(true);
        return;
      }
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
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsLoadingSignUp(false);
          if (res.returnStatus.status === false) {
            setIsError(true); //setting error to be true
            setErrorSignupMessage(res.returnStatus.message); //error message for the client to see
          } else {
            console.log(res); //DELETE

            handleAddStripeAccount(res.returnStatus.id); //add stripe account
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  };

  const handleAddStripeAccount = async (id) => {
    try {
      const response = await fetch(AddStripeAccount, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Stripe account added successfully:", data);
      handleAddInitialTimePref(id);
    } catch (error) {
      console.error("Error adding Stripe account:", error);
    }
  };

  const handleAddInitialTimePref = (id) => {
    fetch(AddTimePreference, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        PractitionerId: id,
        Country: "New Zealand",
        DateFormat: "DD/MM/YYYY",
        TimeFormat: "hh:mm A",
        TimeZone: "Pacific/Auckland",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload(); //relod to the signin screen
      });
  };

  //checks email if email already taken
  const handleCheckGoogleEmail = (email) => {
    fetch(CheckGoogleEmail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        EmailAddress: email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.returnStatus.status === false) {
          setGoogleSignUp(false);
          setEmailAddress("");
          setFullName("");
          setIsError(true); //setting error to be true
          setErrorSignupMessage(res.returnStatus.message); //error handling
        } else {
          setIsError(false); //setting error to be true
          setErrorSignupMessage("");
        }
        console.log(res);
      });
  };

  const signupWithGoogle = (res) => {
    const decoded = jwtDecode(res.credential);
    setGoogleSignUp(true);
    setFullName(decoded.name);
    setEmailAddress(decoded.email);
    setGoogleId(decoded.sub);
    setGivenName(decoded.givenName);
    setFamilyName(decoded.familyName);
    setAuthProvider("google");

    //checks if the email is already in use.
    handleCheckGoogleEmail(decoded.email);
  };

  return (
    <div className="signinform-container__wrapper">
      <h1>Sign up as {healthPractitionerOption}</h1>
      {isError === true ? (
        <p className="signinform-errormessage__text">{errorSignupMessage}</p>
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
          <CircleNotch size={26} color="#202020" className={"loading-icon"} />
        </div>
      ) : (
        <form onSubmit={handlingCheckRegistration}>
          {googleSignUp === false ? (
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Registration Number"
                  value={registrationNumber}
                  className="signup-form__input"
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  className="signup-form__input"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <input
                required
                type="text"
                placeholder="Email"
                value={emailAddress}
                className="signup-form__input"
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
                  className={`signup-form__input ${
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
                className="signup-form__input"
                onChange={(e) => setMatchPwd(e.target.value)}
              />
              {validPwdMatch === false && matchPwd.length !== 0 ? (
                <div className="password-notmatch__wrapper">
                  <p>Password do not match !</p>
                </div>
              ) : (
                ""
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p className="termsofuse__text">
                  By signing up to create an account: I accept{" "}
                  <Link
                    to="/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <button className="signup-submit__btn" type="submit">
                Submit
              </button>
              <button
                className="signup-back__btn"
                onClick={() => setHealthPractitionerOption("")}
              >
                Back
              </button>

              <p>Or</p>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={signupWithGoogle}
                    onError={(err) => console.log(err)}
                    text="signup_with"
                    width="330px"
                    shape="pill"
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          ) : (
            <>
              <GoogleSignUp
                emailAddress={emailAddress}
                setRegistrationNumber={setRegistrationNumber}
                registrationNumber={registrationNumber}
              />
              <button className="signup-signin-submit__btn" type="submit">
                Submit
              </button>
              <button
                className="signup-back__btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Back
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

const SignInPage = ({
  localData,
  today,
  setSignupOptionsClicked,
  setSignInOption,
  signInOption,
}) => {
  const [loading, setLoading] = useState(false);

  const handleJoinUsRegisterBtn = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSignupOptionsClicked(true);
    }, 2000);
  };
  return (
    <div>
      <div className="signinas-form-container__wrapper">
        <div className="signinas-form__wrapper">
          <div className="signinas-form-leftSide__wrapper">
            <h1>Glad You’re Here. Let’s Get You Started.</h1>
            <p>
              Empowering you to take control of your health. Safe, smart, and
              stress-free healthcare—at your fingertips.
            </p>

            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  Don't have an account?{" "}
                  <ArrowElbowRightDown size={16} color="#f3f3f3" />
                </p>

                <button
                  className="signinas-form-joinushere__btn"
                  onClick={(e) => handleJoinUsRegisterBtn(e)}
                >
                  {loading === false ? (
                    <>Join us here</>
                  ) : (
                    <CircleNotch
                      size={12}
                      color="#202020"
                      className={"btn-loading__icon"}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="signinas-form-rightSide__wrapper">
            {signInOption === "Patient" ? (
              <PatientSignIn
                localData={localData}
                today={today}
                setSignInOption={setSignInOption}
              />
            ) : (
              <PracitionerSignIn
                localData={localData}
                today={today}
                setSignInOption={setSignInOption}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SignIn = ({ localData }) => {
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  // SIGNUP-OPTIONS
  const [patientOption, setPatientOption] = useState(false);
  const [healthPractitionerOption, setHealthPractitionerOption] = useState("");
  // SIGNUP-OPTIONS
  const [signupOptionsClicked, setSignupOptionsClicked] = useState(false);

  var today = new Date();

  // ------------------------------------------------------------------------------

  const [signInOption, setSignInOption] = useState("Patient");

  useEffect(() => {
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("id", 0); //reset id in the session
    sessionStorage.setItem("role", undefined);
  }, []);

  return (
    <div>
      {successfulSignUp === true ? (
        <SuccessfulSignUp />
      ) : (
        <div className="signin__wrapper">
          <div className="logo"></div>

          <div>
            <div>
              {signupOptionsClicked === false ? (
                // <div className="signinas-form__wrapper">
                //   <h3>Sign in as</h3>
                //   <select
                //     className="select-option__wrapper"
                //     onChange={(e) => setSignInOption(e.target.value)}
                //   >
                //     <option value="">Choose...</option>
                //     <option value=""></option>
                //     <option value="Patient">Patient</option>
                //     <option value="Practitioner">Practitioner</option>
                //     {/* <option value="Nurse">Nurses</option>
                // <option value="Therapist">Therapist</option> */}
                //   </select>
                //   <br />
                //   <button
                //     className="signinas-btn"
                //     onClick={() => handleSigninOption(signInOption)}
                //   >
                //     Confirm
                //   </button>

                //   <br />
                //   <br />
                //   <br />
                //   <p>or</p>
                //   <br />
                //   <h1>No account?</h1>
                //   <br />
                //   <div style={{ textAlign: "center" }}>
                //     <button
                //       className="signin-signup__btn"
                //       onClick={() => setSignupOptionsClicked(true)}
                //     >
                //       Sign up here
                //     </button>
                //   </div>
                // </div>
                <SignInPage
                  localData={localData}
                  today={today}
                  setSignupOptionsClicked={setSignupOptionsClicked}
                  setSignInOption={setSignInOption}
                  signInOption={signInOption}
                />
              ) : (
                <div>
                  {patientOption === false &&
                  healthPractitionerOption === "" ? (
                    <SignUpOptions
                      setSignupOptionsClicked={setSignupOptionsClicked}
                      setPatientOption={setPatientOption}
                      setHealthPractitionerOption={setHealthPractitionerOption}
                    />
                  ) : (
                    ""
                  )}

                  {patientOption === true ? (
                    <PatientSignUp
                      setPatientOption={setPatientOption}
                      setSuccessfulSignUp={setSuccessfulSignUp}
                    />
                  ) : (
                    ""
                  )}
                  {healthPractitionerOption && (
                    <SignUpOpt
                      healthPractitionerOption={healthPractitionerOption}
                      setHealthPractitionerOption={setHealthPractitionerOption}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
