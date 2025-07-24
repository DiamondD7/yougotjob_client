import React, { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import Patients from "../Patients/Patients";
import Communication from "../Communication/Communication";
import Results from "../Results/Results";
import PhysicianProfile from "../ProfileDepartment/PhysicianProfile";
import Dashboard from "../Dashboard/Dashboard";
import Learning from "../Learning/Learning";
import Documents from "../Documents/Documents";
import Records from "../Records/Records";

import Settings from "../Settings/Settings";
import DashboardPatient from "../Dashboard/DashboardPatient";
import LabResults from "../PatientNAVS/LabResults";
import TestResults from "../PatientNAVS/TestResults";
import Immunisation from "../PatientNAVS/Immunisation";
import Prescriptions from "../GPNavs/Prescriptions";
import Appointment from "../PatientNAVS/Appointment";
import Jobs from "../Jobs/Jobs";
import Schedules from "../PatientNAVS/Schedules";
import PatientProfile from "../ProfileDepartment/PatientProfile";
import InProgress from "./InProgress";
import Feedback from "../Feedback/Feedback";

import OnboardingWelcomeImg from "../../assets/img/PatientOnboarding/onboarding-welcome.png";
import OnboardingProfileImg from "../../assets/img/PatientOnboarding/onboarding-profile.png";
import OnboardingTipsImg from "../../assets/img/PatientOnboarding/onboarding-tips.png";
import OnboardingTipsDashboard from "../../assets/img/PatientOnboarding/onboarding-tips-dashboard.png";
import OnboardingTipsSchedules from "../../assets/img/PatientOnboarding/onboarding-tips-schedules.png";
import OnboardingTipsAppointment from "../../assets/img/PatientOnboarding/onboarding-tips-appointment.png";
import OnboardingTipsFeedback from "../../assets/img/PatientOnboarding/onboarding-tips-feedback.png";
import OnboardingSettingsImg from "../../assets/img/PatientOnboarding/onboarding-settings.png";

import { useNavigate } from "react-router-dom";
import { GetPatient, UpdatePatient } from "../../assets/js/serverApi";
import { Bird, CaretRight, X, CircleNotch } from "@phosphor-icons/react";

import "../../styles/displaystyles.css";
const OnBoardingDisplay = ({
  setOnBoardingClicked,
  userCurrrentOnBoardingStage,
}) => {
  const [userData, setUserData] = useState([]);
  const [stage, setStage] = useState(userCurrrentOnBoardingStage || 1);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserData();
  }, []);

  const handleGetUserData = async (retry = true) => {
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
        return handleGetUserData(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleOnBoardingReady = (e, num) => {
    e.preventDefault();
    setStage(num);
  };

  const Stage1 = ({ handleOnBoardingReady }) => {
    return (
      <div>
        <img src={OnboardingWelcomeImg} alt="welcome-onboarding" width="250" />
        <h1>Welcome, {userData.givenName || userData.fullName} </h1>
        <p>Let's show you how to get the most out of Hauora</p>
        <br />
        <p>
          In just a few steps, we’ll guide you through setting up your profile,
          booking your first appointment, and accessing your health info. Ready?
        </p>
        <br />
        <button
          className="onboarding-welcome-ready__btn"
          onClick={(e) => handleOnBoardingReady(e, "2")}
        >
          Ready!
        </button>
      </div>
    );
  };

  const Stage2 = ({ handleOnBoardingReady, userDataId }) => {
    const [loading, setLoading] = useState(false);
    const [userInputData, setUserInputData] = useState({
      height: "",
      weight: "",
      birthday: "",
      phoneNum: "",
    });
    const bmi =
      Math.round(
        (userInputData.weight / (userInputData.height * userInputData.height)) *
          10000 *
          10
      ) / 10;

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserInputData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleUpdateProfile = async (retry = true) => {
      try {
        setLoading(true);
        const response = await fetch(UpdatePatient, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Id: userDataId,
            MobileNumber: userInputData.phoneNum || "",
            Weight: userInputData.weight || "",
            Height: userInputData.height || "",
            Dob: userInputData.birthday || "",
            OnboardingStage: "3", //going to step 3.
          }),
        });

        if (response.status === 302) {
          console.warn("301 detected, redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected, retrying request...");
          return handleUpdateProfile(false);
        }

        if (!response.ok) {
          throw new Error(`HTTP ERROR: status ${response.status}`);
        }

        const data = await response.json();
        console.log("Profile updated successfully:", data);

        setTimeout(() => {
          setLoading(false);
          setStage("3");
          handleOnBoardingReady("3");
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const handleUpdateForSkip = async (retry = true) => {
      try {
        setLoading(true);
        const response = await fetch(UpdatePatient, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Id: userDataId,
            OnboardingStage: "3", //going to step 3.
          }),
        });

        if (response.status === 302) {
          console.warn("301 detected, redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected, retrying request...");
          return handleUpdateForSkip(false);
        }

        if (!response.ok) {
          throw new Error(`HTTP ERROR: status ${response.status}`);
        }

        const data = await response.json();
        console.log("Profile skipped successfully:", data);

        setTimeout(() => {
          setLoading(false);
          setStage("3");
          handleOnBoardingReady("3");
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const handleSkip = (e) => {
      e.preventDefault();
      handleUpdateForSkip();
    };

    return (
      <div>
        <img src={OnboardingProfileImg} alt="profile-onboarding" width="250" />
        <h1>Set up your profile</h1>
        <p>Your health journey starts with your details.</p>
        <br />
        <p>
          Your details are kept private and secure — always encrypted and stored
          safely.
        </p>

        {loading === true ? (
          <CircleNotch
            size={30}
            color="#202020"
            className={"onboarding-loading-icon"}
          />
        ) : (
          <form
            className="onboarding-profile__form"
            onSubmit={handleUpdateProfile}
          >
            <p
              style={{ fontSize: "12px", textAlign: "left", marginTop: "20px" }}
            >
              Birthday
            </p>
            <input
              className="onboarding-profile-full__input"
              name="birthday"
              onChange={handleInputChange}
              type="date"
              placeholder="Bday"
            />
            <input
              className="onboarding-profile-full__input"
              name="phoneNum"
              onChange={handleInputChange}
              type="text"
              placeholder="Phone num"
            />

            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <input
                className="onboarding-profile-half__input"
                name="height"
                type="text"
                placeholder="Height in cm"
                onChange={handleInputChange}
              />
              <input
                className="onboarding-profile-half__input"
                name="weight"
                type="text"
                placeholder="Weight in kg"
                onChange={handleInputChange}
              />
            </div>

            <input
              className="onboarding-profile-full__input"
              value={bmi || "0"}
              type="text"
              placeholder="BMI"
              disabled
            />

            <button
              className="onboarding-general-skip__btn"
              onClick={(e) => handleSkip(e)}
            >
              Skip
            </button>
            <button type="submit" className="onboarding-general__btn">
              Save
            </button>
          </form>
        )}
      </div>
    );
  };

  const Stage3 = ({ handleOnBoardingReady, userDataId }) => {
    const [loading, setLoading] = useState(false);

    const handleUpdateForSkip = async (retry = true) => {
      try {
        setLoading(true);
        const response = await fetch(UpdatePatient, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Id: userDataId,
            OnboardingStage: "5", //going to step 5.
          }),
        });

        if (response.status === 302) {
          console.warn("301 detected, redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected, retrying request...");
          return handleUpdateForSkip(false);
        }

        if (!response.ok) {
          throw new Error(`HTTP ERROR: status ${response.status}`);
        }

        const data = await response.json();
        console.log("Profile skipped successfully:", data);

        setTimeout(() => {
          setLoading(false);
          setStage("5"); // Set stage to 5 to indicate onboarding is complete, skipped stage 4 because there is no stage 4.
          handleOnBoardingReady("5");
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const handleSkip = (e) => {
      e.preventDefault();
      handleUpdateForSkip();
    };

    return (
      <div>
        <img src={OnboardingTipsImg} alt="tips-onboarding" width="250" />
        <h1>How everything works</h1>
        <p>A quick peek into the features you’ll be using.</p>
        <br />
        <p>
          Next, you’ll see quick previews of how to navigate the app — booking,
          calling, chatting, and more.
        </p>

        <br />
        <br />
        <button
          className="onboarding-welcome-ready__btn"
          onClick={(e) => handleOnBoardingReady(e, "4")}
        >
          Show me around
        </button>
        <br />
        <button
          style={{
            marginTop: "10px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "5px 20px",
          }}
          onClick={(e) => handleSkip(e)}
        >
          {loading === false ? (
            "Skip this step"
          ) : (
            <CircleNotch
              size={20}
              color="#202020"
              className={"btn-loading__icon"}
            />
          )}
        </button>
      </div>
    );
  };

  //this is not the REAL stage 4
  const Stage4 = ({ handleOnBoardingReady, userDataId }) => {
    const [next, setNext] = useState(1);

    const DashboardStage = () => {
      return (
        <>
          <img
            src={OnboardingTipsDashboard}
            alt="tips-dashboard-onboarding"
            width="250"
          />
          <h1>Dashboard overview</h1>
          <p>
            This is your central hub. From here, you can access appointments,
            messages, records, and account settings
          </p>
          <br />
          <p>
            However, due to this being early-access, there are some features
            that are not implemented yet
          </p>

          <p>eg. The bottom right corner of the dashboard</p>

          <button
            className="onboarding-general__btn"
            onClick={(e) => setNext(2)}
          >
            Next
          </button>
        </>
      );
    };

    const ScheduleStage = () => {
      return (
        <>
          <img
            src={OnboardingTipsSchedules}
            alt="tips-schedules-onboarding"
            width="250"
          />
          <h1>Schedules</h1>
          <p>This is where you can view and manage your appointments.</p>

          <button
            className="onboarding-general-skip__btn"
            onClick={(e) => setNext(1)}
          >
            Back
          </button>
          <button
            className="onboarding-general__btn"
            onClick={(e) => setNext(3)}
          >
            Next
          </button>
        </>
      );
    };

    const AppointmentStage = () => {
      return (
        <>
          <img
            src={OnboardingTipsAppointment}
            alt="tips-schedules-onboarding"
            width="250"
          />
          <h1>Appointments</h1>
          <p>
            Tap on 'Appointment' to choose a provider, date, and time. Confirm
            in just a few taps.
          </p>

          <button
            className="onboarding-general-skip__btn"
            onClick={(e) => setNext(2)}
          >
            Back
          </button>
          <button
            className="onboarding-general__btn"
            onClick={(e) => setNext(4)}
          >
            Next
          </button>
        </>
      );
    };

    const FeedbackStage = ({ handleOnBoardingReady, userDataId }) => {
      const [loading, setLoading] = useState(false);

      const handleUpdateProfile = async (retry = true) => {
        try {
          setLoading(true);
          const response = await fetch(UpdatePatient, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              Id: userDataId,
              OnboardingStage: "5", //going to step 3.
            }),
          });

          if (response.status === 302) {
            console.warn("301 detected, redirecting...");
            navigate("/");
            return;
          }

          if (response.status === 401 && retry) {
            console.warn("401 detected, retrying request...");
            return handleUpdateProfile(false);
          }

          if (!response.ok) {
            throw new Error(`HTTP ERROR: status ${response.status}`);
          }

          const data = await response.json();
          console.log("Profile updated successfully:", data);

          setTimeout(() => {
            setLoading(false);
            setStage("5"); // Set stage to 5 to indicate onboarding is complete
            handleOnBoardingReady("5");
          }, 1000);
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };
      return (
        <>
          <img
            src={OnboardingTipsFeedback}
            alt="tips-feedback-onboarding"
            width="250"
          />
          <h1>Feedback</h1>
          <p>Tap on the 'Write a Feedback' in the nav menu</p>
          <br />
          <p>
            We value your feedback! Share your thoughts to help us improve your
            experience.
          </p>

          <button
            className="onboarding-general-skip__btn"
            onClick={(e) => setNext(3)}
          >
            Back
          </button>
          <button
            className="onboarding-general__btn"
            onClick={handleUpdateProfile}
          >
            {loading === false ? (
              "Next"
            ) : (
              <CircleNotch
                size={15}
                color="#f3f3f3"
                className={"btn-loading__icon"}
              />
            )}
          </button>
        </>
      );
    };

    return (
      <div>
        {next === 1 ? (
          <DashboardStage />
        ) : next === 2 ? (
          <ScheduleStage />
        ) : next === 3 ? (
          <AppointmentStage />
        ) : next === 4 ? (
          <FeedbackStage
            handleOnBoardingReady={handleOnBoardingReady}
            userDataId={userDataId}
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  //This is the REAL stage 4, just need to name it differently
  const Stage5 = ({ handleOnBoardingReady, userDataId }) => {
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (retry = true) => {
      try {
        setLoading(true);
        const response = await fetch(UpdatePatient, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Id: userDataId,
            OnboardingStage: "finish",
          }),
        });

        if (response.status === 302) {
          console.warn("301 detected, redirecting...");
          navigate("/");
          return;
        }

        if (response.status === 401 && retry) {
          console.warn("401 detected, retrying request...");
          return handleUpdateProfile(false);
        }

        if (!response.ok) {
          throw new Error(`HTTP ERROR: status ${response.status}`);
        }

        const data = await response.json();
        console.log("Profile updated successfully:", data);

        setTimeout(() => {
          setLoading(false);
          window.location.reload(); // Reload the page to reflect changes
          setStage("finish");
          handleOnBoardingReady("finish");
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
    return (
      <div>
        <img
          src={OnboardingSettingsImg}
          alt="settings-onboarding"
          width="250"
        />
        <h2>Complete Your Settings for a Smoother Experience</h2>
        <p>
          Do not forget to visit the settings to make sure everything runs
          smoothly.
        </p>

        <br />
        <p>Stay secure, prepared, and ready to book</p>

        <br />
        <button
          className="onboarding-welcome-ready__btn"
          onClick={handleUpdateProfile}
        >
          {loading === false ? (
            "Finish"
          ) : (
            <CircleNotch
              size={20}
              color="#f3f3f3"
              className={"btn-loading__icon"}
            />
          )}
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="onboarding-container__wrapper">
        <div>
          {" "}
          <div style={{ textAlign: "right" }}>
            <button
              onClick={() => setOnBoardingClicked(false)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              <X size={20} />
            </button>
          </div>
          {stage === "1" ? (
            <Stage1 handleOnBoardingReady={handleOnBoardingReady} />
          ) : stage === "2" ? (
            <Stage2
              handleOnBoardingReady={handleOnBoardingReady}
              userDataId={userData.id}
            />
          ) : stage === "3" ? (
            <Stage3
              handleOnBoardingReady={handleOnBoardingReady}
              userDataId={userData.id}
            />
          ) : stage === "4" ? ( //this is not the REAL stage 4,
            <Stage4
              handleOnBoardingReady={handleOnBoardingReady}
              userDataId={userData.id}
            />
          ) : stage === "5" ? ( //this is the REAL stage 4, just need to name it differently
            <Stage5
              handleOnBoardingReady={handleOnBoardingReady}
              userDataId={userData.id}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

const Display = ({
  displayed,
  setEditChanges,
  userCurrrentOnBoardingStage,
  onBoardingClicked,
  setOnBoardingClicked,
}) => {
  const role = sessionStorage.getItem("role");
  const isVerified = sessionStorage.getItem("isVerified");

  return (
    <>
      {onBoardingClicked && <div className="overlay"></div>}
      <div className="display__wrapper">
        {/* this is the banner for when the account is still being verified */}
        {isVerified === "false" ? <InProgress /> : ""}
        {displayed === "calendar" ? (
          <Calendar />
        ) : displayed === "patients" ? (
          <Patients />
        ) : displayed === "communication" ? (
          <Communication />
        ) : displayed === "results" ? (
          <Results />
        ) : displayed === "documents" ? (
          <Documents />
        ) : displayed === "learning" ? (
          <Learning />
        ) : displayed === "dashboard" && role === "Practitioner" ? (
          <Dashboard />
        ) : displayed === "dashboard" && role === "Patient" ? (
          <DashboardPatient />
        ) : displayed === "profile" && role === "Practitioner" ? (
          <PhysicianProfile />
        ) : displayed === "profile" && role === "Patient" ? (
          <PatientProfile />
        ) : displayed === "records" ? (
          <Records />
        ) : displayed === "settings" ? (
          <Settings setEditChanges={setEditChanges} /> //setEditChanges will change the time on the Nav from changing it in the Settings/Account
        ) : displayed === "lab results" ? (
          <LabResults />
        ) : displayed === "test results" ? (
          <TestResults />
        ) : displayed === "immunisation" ? (
          <Immunisation />
        ) : displayed === "prescriptions" ? (
          <Prescriptions />
        ) : displayed === "appointment" ? (
          <Appointment />
        ) : displayed === "jobs" ? (
          <Jobs />
        ) : displayed === "schedules" ? (
          <Schedules />
        ) : displayed === "feedback" ? (
          <Feedback />
        ) : (
          ""
        )}

        {role !== "Patient" || userCurrrentOnBoardingStage === "0" ? (
          ""
        ) : (
          <>
            {userCurrrentOnBoardingStage !== "finish" ? (
              <div>
                {onBoardingClicked === false ? (
                  <div className="display-onboarding-sideCard__wrapper">
                    <button onClick={() => setOnBoardingClicked(true)}>
                      Finish up your onboarding <br />{" "}
                      {userCurrrentOnBoardingStage} / 6
                    </button>
                  </div>
                ) : (
                  <OnBoardingDisplay
                    setOnBoardingClicked={setOnBoardingClicked}
                    userCurrrentOnBoardingStage={userCurrrentOnBoardingStage}
                  />
                )}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Display;
