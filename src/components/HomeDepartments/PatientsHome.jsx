import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";
import {
  GetAPatientDateTime,
  AdminUploadFile,
  AddPatientVerification,
  GetPatient,
} from "../../assets/js/serverApi";
import { useNavigate } from "react-router-dom";
import { X } from "@phosphor-icons/react";

import "../../styles/homestyles.css";
const EndWelcome = () => {
  const handleModalClose = () => {
    sessionStorage.setItem("firstTime", "false");
    window.location.reload();
  };
  return (
    <div style={{ zIndex: "10" }}>
      <div>
        <h2>Thank You for Getting Started!</h2>
        <p>
          We appreciate you taking the time to read the welcome steps and set up
          your preferences. These small actions make a big difference in
          creating a seamless experience for you.
        </p>
        <br />
        <p>
          Your setup is almost complete, and you're almost ready to make the
          most of Hauora. If you need assistance or have feedback, we’re just a
          message away!
        </p>
        <br />
        <p>Thank you for being part of our journey. 😊 — Aaron Sierra</p>
      </div>
      <br />
      <button className="welcome-btn" onClick={handleModalClose}>
        Next
      </button>
    </div>
  );
};

const SettingsPreference = ({ currentUser }) => {
  const [next, setNext] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    // Get the current files selected by the user
    const newFiles = event.target.files;

    // Convert the FileList to an array and append it to the existing files
    setFiles((prevFiles) => {
      return [...prevFiles, ...Array.from(newFiles)];
    });
  };

  const handleFileUploadEvent = (e) => {
    const id = parseInt(sessionStorage.getItem("id"));
    e.preventDefault();
    handleAddVerification(id);
  };

  const handleAddVerification = async (id) => {
    try {
      const response = await fetch(AddPatientVerification, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PatientId: id,
          PatientName: currentUser.fullName,
        }),
      });

      if (!response.ok) {
        throw new Error("Error uploading files");
      }

      const data = await response.json();
      console.log(data);
      handleFilesUpload(data.returnStatus.verificationId);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleFilesUpload = async (id) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(`${AdminUploadFile}/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading files");
      }

      const data = await response.json();
      console.log(data);
      setNext(true);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div>
      {next === false ? (
        <div>
          <h3 style={{ marginBottom: "5px" }}>
            Settings Preference: Identity Check
          </h3>
          <p>
            To ensure the security and integrity of our platform, we need to
            verify your identity. Please upload a valid government-issued
            document, such as your passport, driver’s license, or another
            official ID. This verification helps us protect your account and
            maintain compliance with healthcare regulations. Your information
            will be handled securely and confidentially. Please provide the
            document(s) below:
          </p>

          <form style={{ marginTop: "5px" }} onSubmit={handleFileUploadEvent}>
            <input type="file" multiple onChange={handleFileChange} />
            {files?.map((items, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  width: "230px",
                }}
              >
                <p style={{ fontSize: "12px" }}>{items.name}</p>
                <button
                  type="button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setFiles((prev) => {
                      const updatedFiles = [...prev]; // Create a new array (spread operator)
                      updatedFiles.splice(index, 1); // Remove the file at the given index
                      return updatedFiles; // Return the new array
                    });
                  }}
                >
                  <X size={12} color="red" />
                </button>
              </div>
            ))}
            <br />
            <br />
            <button
              className={`welcome-btn ${
                files.length === 0 ? "btnDisabled" : ""
              }`}
              disabled={files.length === 0 ? true : false}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <EndWelcome />
      )}
    </div>
  );
};

const InitialSettings = ({ currentUser }) => {
  const [next, setNext] = useState(false);

  return (
    <div style={{ zIndex: "10" }}>
      {next === false ? (
        <div>
          <h2>Get Started with Hauora!</h2>
          <ul className="initial-settings-ul__wrapper">
            <li>
              Create Your Profile: Visit your profile to add your name and any
              details to personalize your experience.
            </li>
            <li>
              Adjust Preferences: Visit the settings to configure personal
              settings, payments, or other options to suit your needs.
            </li>
          </ul>
          <p>
            Once you’re done, you’re all set to explore Hauora! Let us know if
            you need any help along the way.
          </p>
          <br />
          <button className="welcome-btn" onClick={() => setNext(true)}>
            Next
          </button>
        </div>
      ) : (
        <SettingsPreference currentUser={currentUser} />
      )}
    </div>
  );
};

const InitialMessage = ({ currentUser }) => {
  const [next, setNext] = useState(false);

  return (
    <div style={{ zIndex: "10" }} className="welcome-modal__wrapper">
      {next === false ? (
        <div>
          <div>
            <h2>Welcome to Hauora {currentUser.fullName}</h2>
          </div>
          <br />
          <p>
            Thank you for being one of our early users! Your support means the
            world to us as we launch our MVP. This is just the beginning, and
            we’re excited to grow with your feedback and ideas.
          </p>
          <br />
          <p>
            If you encounter any issues or have suggestions, don’t hesitate to
            share — your input will help shape the future of Hauora.
          </p>
          <br />
          <p>Let’s build something amazing together! 🚀 — Aaron Sierra</p>
          <br />
          <button className="welcome-btn" onClick={() => setNext(true)}>
            Next
          </button>
        </div>
      ) : (
        <InitialSettings currentUser={currentUser} />
      )}
    </div>
  );
};

const PatientsHome = ({ currentUser }) => {
  const [displayed, setDisplayed] = useState("dashboard");
  const [dateSettings, setDateSettings] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [editChanges, setEditChanges] = useState(false);
  const firstLogged = sessionStorage.getItem("firstTime");

  const [onBoardingClicked, setOnBoardingClicked] = useState(false);
  const [userCurrrentOnBoardingStage, setUserCurrentOnBoardingStage] =
    useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetAPatientDateTime}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDateSettings(res.returnStatus.data); //setting data of the user's date preference to use in the Nav component
        setLoadData(true); //setting to true when date settings data is loaded so that it wont compromised the moment() in the Nav to show the date/time
        setEditChanges(false); //setting edit change to false once the useEffect finishes running
      });
  }, [editChanges]);

  useEffect(() => {
    handleFetchUser();
  }, [displayed, onBoardingClicked]);

  const handleFetchUser = async (retry = true) => {
    try {
      const userId = sessionStorage.getItem("id");
      const response = await fetch(`${GetPatient}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 302) {
        //302 is redericting to sign in screen because refresh token and jwt are expired.
        console.warn("302 detected, redirecting...");
        // Redirect to the new path
        navigate("/");
        return; // Exit the function to prevent further execution
      }

      if (response.status === 401 && retry) {
        // Retry the request once if a 401 status is detected
        console.warn("401 detected, retrying request...");
        return handleFetchUser(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserCurrentOnBoardingStage(data.onboardingStage);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      {firstLogged === "true" ? <div className="overlay"></div> : ""}
      {loadData === true ? (
        <div className="main-display__wrapper">
          <>
            <Nav setDisplayed={setDisplayed} dateSettings={dateSettings} />
          </>
          {firstLogged === "true" ? (
            <InitialMessage currentUser={currentUser} />
          ) : (
            ""
          )}
          <>
            <Display
              displayed={displayed}
              setEditChanges={setEditChanges}
              userCurrrentOnBoardingStage={userCurrrentOnBoardingStage}
              onBoardingClicked={onBoardingClicked}
              setOnBoardingClicked={setOnBoardingClicked}
            />
            {/*setEditChanges will change the time on the Nav from changing it in the Settings/Account*/}
          </>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PatientsHome;
