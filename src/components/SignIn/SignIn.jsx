import React, { useEffect, useState } from "react";
import {
  AddHealthPractitionerUser,
  GetaHealthPractitioner,
  AddTokens,
  AddTimePreference,
  CheckRegistration,
  CheckPassword,
  AddPatient,
  CheckPatientPassword,
  AddPatientDateTime,
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
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [nhi, setNhi] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchedPw, setMatchedPw] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [emailNhiError, setEmailNhiError] = useState(false);

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
    const role = "Patient";
    fetch(AddPatient, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        NHI: nhi,
        Role: role,
        FullName: fullName,
        EmailAddress: email,
        Password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status !== false) {
          handlePatientDateTime(res.returnStatus.id);
          setPatientOption(false);
          setEmailNhiError(false);
        } else {
          setEmailNhiError(true);
        }
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
  return (
    <div>
      <div className="signupform-options-container__wrapper">
        <h1 style={{ textAlign: "center" }}>Patient Sign up</h1>
        <br />
        <form className="signup-form" onSubmit={handleAddPatient}>
          <p
            className={
              emailNhiError === true ? "emailtaken-error" : "error-default"
            }
          >
            Email/NHI already registered
          </p>
          <input
            className="signin-signup-form__input"
            type="text"
            placeholder="NHI"
            onChange={(e) => setNhi(e.target.value)}
          />
          <input
            className="signin-signup-form__input"
            type="text"
            placeholder="Full name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            required
            className="signin-signup-form__input"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="signin-signup-form__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Confirm password"
            className="signin-signup-form__input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p
            className={validPw === false ? "pwd-validate-error" : "pwd-default"}
          >
            8 to 24 characters. Must include uppercase and lowercase letters, a
            number and a special character. <br />
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
              By signing up to create an account: I accept Terms of Use and
              Privacy Policy
            </p>
          </div>
          <br />
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
        </form>
      </div>
    </div>
  );
};

const GeneralPracitionerSignIn = ({ localData, today }) => {
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
          Role: "Practitioner",
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
            generateJwtTokens(data.returnStatus.userDetails);
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

  const generateJwtTokens = (healthPractitioners) => {
    fetch(AddTokens, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(healthPractitioners),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <div className="signin__wrapper">
        <div className="logo"></div>

        <div className="signinform-container__wrapper">
          <h1>General Pracitioner</h1>
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
                <button
                  className="signup-back__btn"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  back
                </button>
              </form>

              <p>Contact</p>
              <p className="contact-number__text">0800-5553-4340</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PatientSignIn = ({ localData, today }) => {
  const [signinEmailAddress, setSigninEmailAddress] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);

  const navigate = useNavigate();
  const handleCheckPass = (e) => {
    e.preventDefault();
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
          Password: signinPassword,
          NHI: "",
          FullName: "",
          HomeAddress: "",
          Role: "",
          DOB: today,
          EmailRecovery: "",
          MobileNumber: "",
          Nationality: "",
          Height: null,
          Weight: null,
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

  return (
    <div>
      <div className="signin__wrapper">
        <div className="logo"></div>

        <div className="signinform-container__wrapper">
          <h1>Patient</h1>
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
                <button
                  className="signup-back__btn"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  back
                </button>
              </form>

              <p>Contact</p>
              <p className="contact-number__text">0800-5553-4340</p>
            </div>
          )}
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
      });
  };

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
            handleAddInitialTimePref(data.returnStatus.id);
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

  const [signInOption, setSignInOption] = useState("");
  const [optionClicked, setOptionClicked] = useState(false);
  const [component, setComponent] = useState("");
  const handleSigninOption = (role) => {
    if (role === "General Practitioner") {
      setOptionClicked(true);
      setComponent("General Pracitioner");
    } else if (role === "Patient") {
      setOptionClicked(true);
      setComponent("Patient");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("id", 0); //reset id in the session
    sessionStorage.setItem("role", undefined);
  }, []);
  return (
    <div>
      <div className="signin__wrapper">
        <div className="logo"></div>

        {optionClicked === true ? (
          <div>
            {component === "General Pracitioner" && (
              <GeneralPracitionerSignIn localData={localData} today={today} />
            )}

            {component === "Patient" && (
              <PatientSignIn localData={localData} today={today} />
            )}
          </div>
        ) : (
          <div>
            {signupOptionsClicked === false ? (
              <div className="signinas-form__wrapper">
                <h1>Sign in as:</h1>
                <select
                  className="select-option__wrapper"
                  onChange={(e) => setSignInOption(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value=""></option>
                  <option value="Patient">Patient</option>
                  <option value="General Practitioner">
                    General Practitioner
                  </option>
                  <option value="Nurses">Nurses</option>
                  <option value="Therapist">Therapist</option>
                </select>
                <br />
                <button
                  className="signinas-btn"
                  onClick={() => handleSigninOption(signInOption)}
                >
                  Confirm
                </button>

                <br />
                <br />
                <br />
                <p>or</p>
                <br />
                <h1>No account?</h1>
                <br />
                <div style={{ textAlign: "center" }}>
                  <button
                    className="signin-signup__btn"
                    onClick={() => setSignupOptionsClicked(true)}
                  >
                    Sign up here
                  </button>
                </div>
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
                            onChange={(e) =>
                              setRegistrationNumber(e.target.value)
                            }
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
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <p className="termsofuse__text">
                            By signing up to create an account: I accept Terms
                            of Use and Privacy Policy
                          </p>
                        </div>
                        <br />
                        <br />
                        <button
                          className="signup-signin-submit__btn"
                          type="submit"
                        >
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
        )}
      </div>
    </div>
  );
};

export default SignIn;
