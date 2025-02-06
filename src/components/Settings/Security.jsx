import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetaHealthPractitioner,
  UpdateHealthPractitionerData,
} from "../../assets/js/serverApi";
import { CheckCircle } from "@phosphor-icons/react";

import "../../styles/securitystyles.css";
const TwoFactorAuth = ({ userData, navigate }) => {
  const [editEmailRec, setEditEmailRec] = useState(false);
  const [emailrec, setEmailRec] = useState("");

  const handleUpdateEmail = async (retry = true) => {
    const id = parseInt(sessionStorage.getItem("id"));

    try {
      const response = await fetch(UpdateHealthPractitionerData, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: id,
          EmailRecovery: emailrec,
        }),
      });

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleUpdateEmail(false);
      }

      if (!response.ok) {
        throw new Error(`HTTP ERROR: status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(`Error caught: ${err.message}`);
    }
  };
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>
        Two-factor Authentication
      </h3>
      <div className="security-settings__wrapper">
        <div>
          <p className="security-settings-textheading__text">
            Two-factor authentication is a feature that adds an extra layer of
            protection to your account. Hauora uses 2FA for our users, you will
            need to enter your password and then a code sent to your email.
          </p>
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <div>
            <p className="security-settings-emailrecovery__text">
              Email Address
            </p>
            <p className="security-settings-emaildetail__text">
              {userData.emailAddress}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div>
            <p className="security-settings-emailrecovery__text">
              Email Recovery
            </p>

            {editEmailRec === false ? (
              <p className="security-settings-emaildetail__text">
                {userData.emailRecovery}
              </p>
            ) : (
              <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmailRec(e.target.value)}
              />
            )}
          </div>
          <div>
            <button
              className="security-settings-setup__btn"
              onClick={() => setEditEmailRec(!editEmailRec)}
            >
              {editEmailRec === false ? "Setup" : "Cancel"}
            </button>
            {editEmailRec === true ? (
              <button
                className="security-settings-setup__btn"
                onClick={handleUpdateEmail}
              >
                {editEmailRec === false ? "Setup" : "Done"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordChange = ({ navigate }) => {
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [activeChangePassword, setActiveChangePassword] = useState(false);

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [validPwMatch, setValidPwdMatch] = useState(true);
  const [errorPw, setErrorPw] = useState(false);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userPassData, setUserPassData] = useState({
    UserPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    const isPwdValid = PWD_REGEX.test(userPassData.NewPassword);
    if (
      userPassData.NewPassword !== userPassData.ConfirmPassword ||
      userPassData.ConfirmPassword === "" ||
      userPassData.UserPassword === "" ||
      !isPwdValid
    ) {
      setValidPwdMatch(false);
    } else {
      setValidPwdMatch(true);
    }
  }, [
    userPassData.NewPassword,
    userPassData.ConfirmPassword,
    userPassData.UserPassword,
  ]);

  const handleChangePassword = async (retry = true) => {
    const id = parseInt(sessionStorage.getItem("id"));
    const isPwdValid = PWD_REGEX.test(userPassData.NewPassword);
    if (!validPwMatch) {
      console.log("Password do not match");
      return;
    }
    if (!isPwdValid) {
      setErrorPw(true);
      return;
    }

    try {
      const response = await fetch(UpdateHealthPractitionerData, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: id,
          UserPassword: userPassData.UserPassword,
          NewPassword: userPassData.NewPassword,
        }),
      });

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleChangePassword(false);
      }

      if (response.status === 400) {
        console.warn("400 detected");

        const data = await response.json();
        setShowErrorMsg(true);
        setErrorMessage(data.returnStatus.message);
      }

      if (!response.ok) {
        throw new Error(`HTTP ERROR: status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setPasswordChangeSuccess(true); //this is for the success message
      handleOpenCloseChangePw(); //close the update form
    } catch (err) {
      console.log(`Error caught: ${err.message}`);
    }
  };

  const handleOnChange = (e) => {
    setUserPassData({
      ...userPassData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenCloseChangePw = (e) => {
    e.preventDefault();
    setActiveChangePassword(false);
    setShowErrorMsg(false);
    setErrorMessage("");
  };

  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Password</h3>
      <div className="security-settings__wrapper">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p className="security-password__text">Change Password</p>
            <p className="security-password-textheading__text">
              Changing your password regularly is an important way to keep your
              account secure. When you update your password, make sure it’s
              strong by using a mix of letters, numbers, and special characters.
              Avoid using easily guessable information like common words or your
              name.
            </p>
            {activeChangePassword === false ? (
              <div>
                <button
                  className="security-password-change__btn"
                  onClick={() => setActiveChangePassword(true)}
                >
                  Update
                </button>
                {passwordChangeSuccess === true ? (
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "50px" }}
                  >
                    <CheckCircle size={15} color="limegreen" />
                    <p
                      style={{
                        fontSize: "12px",
                        color: "limegreen",
                      }}
                    >
                      Password changed successful
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div>
                {showErrorMsg === true ? (
                  <p className="security-password-error__text">
                    {errorMessage}
                  </p>
                ) : (
                  ""
                )}
                <br />
                <p className="security-password-input__text">
                  Current Password
                </p>
                <input
                  type="password"
                  className="security-password-input"
                  name="UserPassword"
                  onChange={(e) => handleOnChange(e)}
                />
                <p className="security-password-input__text">New Password</p>
                <input
                  type="password"
                  className={`security-password-input ${
                    validPwMatch === true ? "" : "inputError"
                  }`}
                  name="NewPassword"
                  onChange={(e) => handleOnChange(e)}
                />
                <p className="security-password-input__text">
                  Confirm Password
                </p>
                <input
                  type="password"
                  className={`security-password-input ${
                    validPwMatch === true ? "" : "inputError"
                  }`}
                  name="ConfirmPassword"
                  onChange={(e) => handleOnChange(e)}
                />
                <br />
                <button
                  className="security-password-cancelchange__btn"
                  onClick={(e) => handleOpenCloseChangePw(e)}
                >
                  Cancel
                </button>
                <button
                  className={`security-password-change__btn ${
                    validPwMatch === true ? "" : "disabledBtn"
                  }`}
                  onClick={handleChangePassword}
                  disabled={validPwMatch === true ? false : true}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          <div className="security-password-rules__wrapper">
            <p className="security-password__text">Rules for Password</p>
            <p className="security-password-rules__text">
              To create a new password, you have to meet all of the following
              requirements:
            </p>
            <ul className="security-password-rules-lists">
              <li>Minimum of 8 characters</li>
              <li>At least one number</li>
              <li>At least one special character</li>
              <li>Can not be the same as the previous</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Security = () => {
  const id = parseInt(sessionStorage.getItem("id"));
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    handleFetchUserData();
  }, []);

  const handleFetchUserData = async (retry = true) => {
    try {
      const response = await fetch(`${GetaHealthPractitioner}/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("Detected a 302, redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        // Retry the request once if a 401 status is detected
        console.warn("401 detected, retrying request...");
        return handleFetchUserData(false);
      }

      if (!response.ok) {
        throw new Error(`HTTP error: status ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.log("Error fetching data:", err.message);
    }
  };

  return (
    <div>
      <TwoFactorAuth userData={userData} navigate={navigate} />
      <br />
      <br />
      <PasswordChange navigate={navigate} />
    </div>
  );
};

export default Security;
