import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";
import {
  GetATimePreference,
  UpdateHealthPractitionerData,
  AddPractitionerToVerify,
  PracAdminUploadFile,
} from "../../assets/js/serverApi";
import { X } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

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
          We appreciate you taking the time to complete the welcome steps and
          set up your preferences. These small actions make a big difference in
          creating a seamless experience for you and your patients.
        </p>
        <br />
        <p>
          Your setup is now complete, and you're ready to make the most of
          Hauora. If you need assistance or have feedback, we’re just a message
          away!
        </p>
        <br />
        <p>Thank you for being part of our journey. 😊 — Aaron Sierra</p>
      </div>
      <br />
      <br />
      <button className="welcome-btn" onClick={handleModalClose}>
        Next
      </button>
    </div>
  );
};

const SettingsPreference = () => {
  const navigate = useNavigate();
  const [workPref, setWorkPref] = useState("");
  const [healthRole, setHealthRole] = useState("");
  const [next, setNext] = useState(false);

  const formSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(); //update work preference
  };

  const handleFormSubmit = async (retry = true) => {
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
          Role: healthRole,
          WorkPreference: workPref,
        }),
      });

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleFormSubmit(false);
      }

      if (response.status === 400) {
        console.warn("400 detected");
      }

      if (!response.ok) {
        throw new Error(`HTTP ERROR: status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setNext(true);
    } catch (err) {
      console.log(`Error caught: ${err.message}`);
    }
  };

  return (
    <div style={{ zIndex: "10" }}>
      {next === false ? (
        <div>
          <h4>Set you work preference & specific role</h4>
          <p style={{ fontSize: "12px" }}>
            Let your patients know how you work!
          </p>
          <p style={{ fontSize: "12px" }}>Choose your availability:</p>
          <ul className="settings-preference-ul__wrapper">
            <li>
              <strong>Online</strong>: Virtual consultations only.
            </li>
            <li>
              <strong>Onsite</strong>: In-person appointments at your location.
            </li>
            <li>
              <strong>Flexible</strong>: A mix of online and onsite options.
            </li>
          </ul>

          <p style={{ fontSize: "12px" }}>
            Let your patients know how you work!
          </p>
          <p style={{ fontSize: "12px" }}>&</p>
          <p style={{ fontSize: "12px" }}>Choose your health role</p>

          <p style={{ fontSize: "12px" }}>
            Your transparency makes all the difference!
          </p>
          <br />
          <form onSubmit={formSubmit}>
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                className="form-select__wrapper"
                onChange={(e) => setHealthRole(e.target.value)}
              >
                <option value="">Specific health role</option>
                <option value=""></option>
                <option value="General Practitioner">
                  General Practitioner
                </option>
                <option value="Nurse">Nurse</option>
                <option value="Therapist">Therapist</option>
              </select>

              <select
                className="form-select__wrapper"
                onChange={(e) => setWorkPref(e.target.value)}
              >
                <option value="">Choose Work Preference</option>
                <option value=""></option>
                <option value="online">Online</option>
                <option value="on-site">On-site</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <button className="welcome-btn" type="submit">
              Next
            </button>
          </form>
        </div>
      ) : (
        <EndWelcome />
      )}
    </div>
  );
}; //MAYBE DELETE THIS LATER.

const SupportingDocuments = ({ currentUser }) => {
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
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
    handleAddVerification(id);
  };

  const handleAddVerification = async (id) => {
    try {
      const response = await fetch(AddPractitionerToVerify, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PractitionerId: id,
          PractitionerName: currentUser.fullName,
          RegistrationId: currentUser.registrationNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Error uploading files");
      }

      const data = await response.json();
      console.log(data);
      handleFilesUpload(data.returnStatus.verifiedPracId);
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
      const response = await fetch(`${PracAdminUploadFile}/${id}`, {
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
        <>
          <h3 style={{ marginBottom: "5px" }}>Supporting Documents</h3>

          <p>
            To complete your registration and begin using the platform, please
            upload the required supporting documents. <br /> <br />
            This includes verification of your identity and proof of your
            current New Zealand medical registration. By submitting these
            documents, you confirm that all information provided is true,
            accurate, and valid to the best of your knowledge.
          </p>
          <br />
          <form onSubmit={handleFileUploadEvent}>
            <input type="file" multiple onChange={handleFileChange} />
            <br />
            <br />
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
            <button
              style={{ marginRight: "10px" }}
              className={`welcome-btn ${
                files.length === 0 ? "btnDisabled" : ""
              }`}
              disabled={files.length === 0 ? true : false}
              type="submit"
            >
              Submit
            </button>
            <label style={{ fontSize: "12px" }}>
              Submit {files.length} selected document
              {files.length === 1 ? "" : "s"}
            </label>
          </form>
        </>
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
              Create Your Profile: Visit your profile to add your name, and any
              details to personalise your experience.
            </li>
            <li>
              Adjust Preferences: Visit the settings to configure work
              preference, personal settings, payments, or other options to suit
              your needs.
            </li>
            <li>
              Documents: You can find key details and helpful resources by
              heading over to the Document page.
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
        <SupportingDocuments currentUser={currentUser} />
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
            <h2>Welcome to Hauora</h2>
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

const PractionerHome = ({ currentUser }) => {
  const [displayed, setDisplayed] = useState("dashboard");
  const [dateSettings, setDateSettings] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [editChanges, setEditChanges] = useState(false);
  const firstLogged = sessionStorage.getItem("firstTime");

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetATimePreference}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDateSettings(res.returnStatus.data); //setting data of the user's date preference to use in the Nav component
        setLoadData(true); //setting to true when date settings data is loaded so that it wont compromised the moment() in the Nav to show the date/time
        setEditChanges(false); //setting edit change to false once the useEffect finishes running
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editChanges]);

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
            <Display displayed={displayed} setEditChanges={setEditChanges} />
            {/*setEditChanges will change the time on the Nav from changing it in the Settings/Account*/}
          </>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PractionerHome;
