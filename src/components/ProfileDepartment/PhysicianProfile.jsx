import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Envelope,
  GraduationCap,
  ListMagnifyingGlass,
  UserList,
  FolderNotch,
  FolderNotchOpen,
  Calendar,
  MapPin,
  Video,
  CircleNotch,
} from "@phosphor-icons/react";
import {
  GetaHealthPractitioner,
  AddWorkTimes,
  GetWorkTimes,
} from "../../assets/js/serverApi";

import "../../styles/physicianprofilestyles.css";

const OverviewProfile = ({ loggedUser }) => {
  const [isUpdate, setIsUpdate] = useState(false); //initialisation of the update state, started out as false
  return (
    <div style={{ padding: "0 10px" }}>
      <div style={{ display: "flex", gap: "3px" }}>
        <div className="left-side-container__wrapper">
          <h3 style={{ paddingLeft: "10px" }}>{loggedUser.fullName}</h3>
          <div
            style={{
              marginTop: "50px",
              padding: "10px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h5>About</h5>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Date of Birth</label>
              <p>{new Date(loggedUser.dob).toLocaleDateString("en-nz")}</p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Age</label>
              <p>{loggedUser.age}</p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Phone</label>
              <p>{loggedUser.mobileNumber}</p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Email</label>
              <p>{loggedUser.emailAddress}</p>
            </div>
          </div>

          <div
            style={{
              marginTop: "50px",
              padding: "10px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h5>Address</h5>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Home</label>
              <p>{loggedUser.homeAddress}</p>
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
              padding: "10px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h5>Details</h5>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Work preference</label>
              <p>{loggedUser.workPreference}</p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Registration #</label>
              <p>{loggedUser.registrationNumber}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Title</label>
              <p>{loggedUser.role}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Registered on</label>
              <p>17/01/2025</p>
            </div>
          </div>
        </div>
        <div className="right-side-container__wrapper">
          <br />
          <h4>Availability</h4>
          <br />

          {isUpdate === false ? (
            <WorkAvailability
              userId={loggedUser.id}
              setIsUpdate={setIsUpdate}
            />
          ) : (
            <TimeSelectorContainer
              userId={loggedUser.id}
              setIsUpdate={setIsUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const WorkAvailability = ({ userId, setIsUpdate }) => {
  const [workAvailabilityData, setWorkAvailabilityData] = useState([]); //initialisation of the work availability data state, started out as an empty array

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkTimes();
  }, []);

  const fetchWorkTimes = async (retry = true) => {
    try {
      const response = await fetch(`${GetWorkTimes}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        return fetchWorkTimes(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWorkAvailabilityData(data);
    } catch (error) {
      console.error("Error fetching work times:", error);
    }
  };
  return (
    <div>
      {workAvailabilityData.map((item, index) => (
        <div key={item.id} className="workavail-container__wrapper">
          <label>{item.day}</label>
          <div>
            <p>From: {item.fromTime}</p>
            <p>To: {item.toTime}</p>
          </div>
        </div>
      ))}

      <button
        className="workavail-update__btn"
        onClick={() => setIsUpdate(true)}
      >
        Update Availability
      </button>
    </div>
  );
};

const TimeSelectorContainer = ({ userId, setIsUpdate }) => {
  const [isMondayChecked, setIsMondayChecked] = useState(false);
  const [isTuesdayChecked, setIsTuesdayChecked] = useState(false);
  const [isWednesdayChecked, setIsWednesdayChecked] = useState(false);
  const [isThursdayChecked, setIsThursdayChecked] = useState(false);
  const [isFridayChecked, setIsFridayChecked] = useState(false);
  const [isSaturdayChecked, setIsSaturdayChecked] = useState(false);
  const [isSundayChecked, setIsSundayChecked] = useState(false);

  const [availableDates, setAvailableDates] = useState([]);
  const [isPermanentCommitment, setIsPermanentCommitment] = useState(false);

  const navigate = useNavigate();

  const handleUpdateWorkTimes = (e) => {
    e.preventDefault();

    const handleFetch = async (retry = true) => {
      try {
        const response = await fetch(
          `${AddWorkTimes}?id=${userId}&isPermanent=${isPermanentCommitment}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(availableDates),
          }
        );

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
          return handleFetch(false); // Call with `retry` set to false
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.returnStatus.status === false) {
          console.log("Work times updated successfully:", data);
        }

        setIsUpdate(false); // Close the update form after successful submission
      } catch (error) {
        console.error("Error updating work times:", error);
      }
    };

    handleFetch();
  };

  const handleonChange = (e, day) => {
    if (day === "Monday") {
      setIsMondayChecked(e.target.checked);
    } else if (day === "Tuesday") {
      setIsTuesdayChecked(e.target.checked);
    } else if (day === "Wednesday") {
      setIsWednesdayChecked(e.target.checked);
    } else if (day === "Thursday") {
      setIsThursdayChecked(e.target.checked);
    } else if (day === "Friday") {
      setIsFridayChecked(e.target.checked);
    } else if (day === "Saturday") {
      setIsSaturdayChecked(e.target.checked);
    } else if (day === "Sunday") {
      setIsSundayChecked(e.target.checked);
    }

    setAvailableDates((prevDates) => {
      if (prevDates[day]) {
        // Remove the day
        const updated = { ...prevDates };
        delete updated[day];
        return updated;
      }

      // Add/update the day
      return {
        ...prevDates,
        [day]: {
          fromTime: "", // or whatever initial value
          toTime: "",
        },
      };
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleUpdateWorkTimes(e)}>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Monday")}
            />
            <h5>Monday</h5>
          </div>
          {isMondayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>
              <TimeSlot
                isMinTime={true}
                isMaxTime={false}
                day="Monday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                isMaxTime={true}
                day="Monday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Tuesday")}
            />
            <h5>Tuesday</h5>
          </div>

          {isTuesdayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>
              <TimeSlot
                isMinTime={true}
                day="Tuesday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                day="Tuesday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Wednesday")}
            />
            <h5>Wednesday</h5>
          </div>
          {isWednesdayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>
              <TimeSlot
                isMinTime={true}
                day="Wednesday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                day="Wednesday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Thursday")}
            />
            <h5>Thursday</h5>
          </div>
          {isThursdayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>
              <TimeSlot
                isMinTime={true}
                day="Thursday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                day="Thursday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Friday")}
            />
            <h5>Friday</h5>
          </div>
          {isFridayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>

              <TimeSlot
                isMinTime={true}
                day="Friday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                day="Friday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Saturday")}
            />
            <h5>Saturday</h5>
          </div>
          {isSaturdayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>
              <TimeSlot
                isMinTime={true}
                day="Saturday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                day="Saturday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <div className="date-availability__wrapper">
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={(e) => handleonChange(e, "Sunday")}
            />
            <h5>Sunday</h5>
          </div>
          {isSundayChecked && (
            <div style={{ display: "flex", gap: "10px" }}>
              <label style={{ fontSize: "12px" }}>From</label>
              <TimeSlot
                isMinTime={true}
                day="Sunday"
                setAvailableDates={setAvailableDates}
              />
              <label style={{ fontSize: "12px" }}>To</label>
              <TimeSlot
                isMinTime={false}
                day="Sunday"
                setAvailableDates={setAvailableDates}
              />
            </div>
          )}
        </div>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          By proceeding, you are committing to a two-week work schedule. If you
          do not wish to make a permanent commitment, you will need to update
          your availability every second week. To opt for a permanent
          commitment, please select the checkbox below. You may change your
          preference at any time.
        </p>
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="checkbox"
            onChange={(e) => setIsPermanentCommitment(e.target.checked)}
          />
          <label style={{ fontSize: "12px" }}>
            Will this be your permanent commitment?
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={() => setIsUpdate(false)}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

const TimeSlot = ({ isMinTime, day, setAvailableDates }) => {
  const handleonTimeChange = (e) => {
    if (isMinTime) {
      setAvailableDates((prevDates) => ({
        ...prevDates,
        [day]: {
          ...prevDates[day],
          fromTime: e.target.value, //update the time slot value
        },
      }));
    } else {
      setAvailableDates((prevDates) => ({
        ...prevDates,
        [day]: {
          ...prevDates[day],
          toTime: e.target.value, //update the time slot value
        },
      }));
    }
  };

  return (
    <div>
      <select
        className="time-selector__wrapper"
        onChange={(e) => handleonTimeChange(e)}
      >
        <option value=""></option>
        <option value="9:00">9:00</option>
        <option value="9:30">9:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
        <option value="17:30">17:30</option>
        <option value="18:00">18:00</option>
        <option value="18:30">18:30</option>
        <option value="19:00">19:00</option>
        <option value="19:30">19:30</option>
        <option value="20:00">20:00</option>
        <option value="20:30">20:30</option>
        <option value="21:00">21:00</option>
        <option value="21:30">21:30</option>
        <option value="22:00">22:00</option>
        <option value="22:30">22:30</option>
      </select>
    </div>
  );
};

const NavProfile = ({ clickNav, setClickNav }) => {
  const [hovered, setHovered] = useState("overview"); //initialisation of the btn hovered effect, started out as an empty string

  useEffect(() => {
    //useEffect to be use everytime when a user hover a button in the navigation section
    const buttons = document.querySelectorAll(".nav-btns"); //adding all buttons in a list to be loop.

    buttons.forEach((button, index) => {
      //looping through all the buttons with the className of ".nav-btns"
      if (hovered === "") {
        button.addEventListener("mouseenter", () => {
          //added an eventListener when the cursor is hovering on the btn
          if (index === 0) {
            //index 0 is the first navigation button which is the overview.
            setHovered("overview"); //setting the state to overview
          } else if (index === 1) {
            setHovered("records"); //setting the state to records
          } else if (index === 2) {
            setHovered("documents"); //setting the state to documents
          } else if (index === 3) {
            setHovered("appointments"); //setting the state to appointments
          } else if (index === 4) {
            setHovered("learning");
          }
        });
      } else {
        button.addEventListener("mouseleave", () => {
          //when the cursor is not hovering anymore
          setHovered(""); //setting the state back to its initial state, an empty string.
        });
      }
    });
  }, [hovered]);

  return (
    <div>
      <div className="nav-btns__wrapper">
        <button
          style={{
            display: "block",
            textAlign: "center",
            borderBottom:
              hovered === "overview" || clickNav === "overview"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "overview" button or if the user click on the button
            height: "50px",
            width: "90px",
            color:
              hovered === "overview" || clickNav === "overview"
                ? "#81bb30"
                : "", //change the fontcolor if the cursor is hovering on the "overview" button or if the user click on the button
          }}
          className="nav-btns"
          onClick={() => setClickNav("overview")} //setting up the onClick event and changing its state
        >
          <div>
            <ListMagnifyingGlass
              size={20}
              color={
                hovered === "overview" || clickNav === "overview"
                  ? "#81bb30"
                  : "" //change the fontcolor if the cursor is hovering on the "overview" button or if the user click on the button
              }
              weight={
                hovered === "overview" || clickNav === "overview"
                  ? "fill"
                  : "regular" //change the weight of the icon if the cursor is hovering on the "overview" button or if the user click on the button
              }
            />
          </div>
          overview
        </button>

        <button
          className="nav-btns"
          style={{
            display: "block",
            textAlign: "center",
            borderBottom:
              hovered === "records" || clickNav === "records"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "overview" button or if the user click on the button
            height: "50px",
            width: "90px",
            color:
              hovered === "records" || clickNav === "records" ? "#81bb30" : "", //change the fontcolor if the cursor is hovering on the "records" button or if the user click on the button
          }}
          onClick={() => setClickNav("records")}
        >
          <div>
            <UserList
              size={20}
              color={
                hovered === "records" || clickNav === "records" ? "#81bb30" : ""
              } //change the fontcolor if the cursor is hovering on the "records" button or if the user click on the button
              weight={
                hovered === "records" || clickNav === "records"
                  ? "fill"
                  : "regular" //change the weight of the icon if the cursor is hovering on the "records" button or if the user click on the button
              }
            />
          </div>
          records
        </button>
        <button
          className="nav-btns"
          style={{
            display: "block",
            textAlign: "center",
            borderBottom:
              hovered === "documents" || clickNav === "documents"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "documents" button or if the user click on the button
            height: "50px",
            width: "90px",
            color:
              hovered === "documents" || clickNav === "documents"
                ? "#81bb30"
                : "", //change font color if the cursor is hovering on the "documents" button or if the user click on the button
          }}
          onClick={() => setClickNav("documents")}
        >
          <div>
            {hovered === "documents" || clickNav === "documents" ? (
              <FolderNotchOpen
                size={20}
                color={
                  hovered === "documents" || clickNav === "documents"
                    ? "#81bb30"
                    : "" //change font color if the cursor is hovering on the "documents" button or if the user click on the button
                }
                weight={
                  hovered === "documents" || clickNav === "documents"
                    ? "fill"
                    : "regular" //change weight of the icon if the cursor is hovering on the "documents" button or if the user click on the button
                }
              />
            ) : (
              <FolderNotch size={20} weight="fill" /> //use this icon if btn is not hovered and the btn is not click
            )}
          </div>
          documents
        </button>
        <button
          className="nav-btns"
          style={{
            display: "block",
            textAlign: "center",
            borderBottom:
              hovered === "appointments" || clickNav === "appointments"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "appointments" button or if the user click on the button
            height: "50px",
            width: "90px",
            color:
              hovered === "appointments" || clickNav === "appointments"
                ? "#81bb30"
                : "", //change font color if the cursor is hovering on the "appointments" button or if the user click on the button
          }}
          onClick={() => setClickNav("appointments")}
        >
          <div>
            <Calendar
              size={20}
              color={
                hovered === "appointments" || clickNav === "appointments"
                  ? "#81bb30"
                  : "" //change font color if the cursor is hovering on the "appointments" button or if the user click on the button
              }
              weight={
                hovered === "appointments" || clickNav === "appointments"
                  ? "fill"
                  : "regular" //change weight of the icon if the cursor is hovering on the "appointments" button or if the user click on the button
              }
            />
          </div>
          appointments
        </button>

        <button
          className="nav-btns"
          style={{
            display: "block",
            textAlign: "center",
            borderBottom:
              hovered === "learning" || clickNav === "learning"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "learning" button or if the user click on the button
            height: "50px",
            width: "90px",
            color:
              hovered === "learning" || clickNav === "learning"
                ? "#81bb30"
                : "", //change font color if the cursor is hovering on the "learning" button or if the user click on the button
          }}
          onClick={() => setClickNav("learning")}
        >
          <div>
            <Video
              size={20}
              color={
                hovered === "learning" || clickNav === "learning"
                  ? "#81bb30"
                  : "" //change font color if the cursor is hovering on the "learning" button or if the user click on the button
              }
              weight={
                hovered === "learning" || clickNav === "learning"
                  ? "fill"
                  : "regular" //change weight of the icon if the cursor is hovering on the "learning" button or if the user click on the button
              }
            />
          </div>
          learning
        </button>
      </div>
    </div>
  );
};

const BodyProfile = ({ loggedUser, clickNav }) => {
  const renderBody = () => {
    if (clickNav === "overview") {
      return <OverviewProfile loggedUser={loggedUser} />;
    }
  };
  return <div>{renderBody()}</div>;
};

const PhysicianProfile = () => {
  const [loading, setLoading] = useState(true); //initialisation of the loading state, started out as true
  const [clickNav, setClickNav] = useState("overview"); //initialisation of the click navigation state, started out as "overview"
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchPractitioner();
  }, []);

  const fetchPractitioner = async (retry = true) => {
    try {
      const id = parseInt(sessionStorage.getItem("id")); //parsed session id to int
      const response = await fetch(`${GetaHealthPractitioner}/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
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
        return fetchPractitioner(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoggedUser(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <h3 style={{ padding: "10px 0 0 30px" }}>Profile</h3>
      {loading === true ? (
        <div className="display-loading-icon__wrapper">
          <CircleNotch size={45} color="#202020" className={"loading-icon"} />
        </div>
      ) : (
        <>
          <div>
            <NavProfile clickNav={clickNav} setClickNav={setClickNav} />
          </div>

          <div>
            <BodyProfile loggedUser={loggedUser} clickNav={clickNav} />
          </div>
        </>
      )}
    </div>
  );
};

export default PhysicianProfile;
