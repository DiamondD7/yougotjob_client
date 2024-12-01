import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";
import {
  GetATimePreference,
  UpdateWorkPreference,
} from "../../assets/js/serverApi";
import { useNavigate } from "react-router-dom";

import "../../styles/homestyles.css";
const EndWelcome = () => {
  const handleModalClose = () => {
    sessionStorage.setItem("firstTime", "false");
    window.location.reload();
  };
  return (
    <div>
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
  const [workPref, setWorkPref] = useState("");
  const [next, setNext] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  const handleFormSubmit = async (retry = true) => {
    const id = parseInt(sessionStorage.getItem("id"));

    try {
      const response = await fetch(UpdateWorkPreference, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Id: id,
          WorkPreference: workPref,
        }),
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
        return handleFormSubmit(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setNext(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {next === false ? (
        <div>
          <h2>Set you work preference</h2>
          <p>Let your patients know how you work!</p>
          <p>Choose your availability:</p>
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
          <p>Your transparency makes all the difference!</p>
          <br />
          <form onSubmit={formSubmit}>
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
            <br />
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
};

const InitialSettings = () => {
  const [next, setNext] = useState(false);

  return (
    <div>
      {next === false ? (
        <div>
          <h2>Get Started with Hauora!</h2>
          <ul className="initial-settings-ul__wrapper">
            <li>
              Create Your Profile: Visit your profile to add your name, profile
              picture, and any details to personalize your experience.
            </li>
            <li>
              Adjust Preferences: Visit the settings to configure work
              preference, personal settings, payments, or other options to suit
              your needs.
            </li>
            <li>
              Connect Your Account (Optional): Link any necessary accounts for a
              seamless experience.
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
        <SettingsPreference />
      )}
    </div>
  );
};

const InitialMessage = () => {
  const [next, setNext] = useState(false);

  return (
    <div className="welcome-modal__wrapper">
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
        <InitialSettings />
      )}
    </div>
  );
};

const GeneralPractioner = () => {
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
          {firstLogged === "true" ? <InitialMessage /> : ""}
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

export default GeneralPractioner;
