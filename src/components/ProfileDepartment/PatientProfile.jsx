import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListMagnifyingGlass,
  UserList,
  Calendar,
  CircleNotch,
} from "@phosphor-icons/react";
import { GetPatient } from "../../assets/js/serverApi";

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
            setHovered("appointments"); //setting the state to appointments
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
      </div>
    </div>
  );
};

const OverviewProfile = ({ loggedUser }) => {
  const [isUpdate, setIsUpdate] = useState(false); //initialisation of the update state, started out as false
  const bmi =
    Math.round(
      (loggedUser.weight / (loggedUser.height * loggedUser.height)) * 10000 * 10
    ) / 10;

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
              <label>Height</label>
              <p>{loggedUser.height}cm</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Weight</label>
              <p>{loggedUser.weight}kg</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>BMI</label>
              <p>{bmi}</p>
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
              <label>Registered on</label>
              <p>
                {new Date(loggedUser.registeredOn).toLocaleDateString("en-nz")}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Account Verified</label>
              <p>{loggedUser.isVerified === true ? "Yes" : "No"}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <label>Verified on</label>
              <p>
                {new Date(loggedUser.verifiedOn).toLocaleDateString("en-nz")}
              </p>
            </div>
          </div>
        </div>
        <div className="right-side-container__wrapper">
          <br />
          <h4>Availability</h4>
          <br />
        </div>
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

const PatientProfile = () => {
  const [loading, setLoading] = useState(true); //initialisation of the loading state, started out as true
  const [clickNav, setClickNav] = useState("overview"); //initialisation of the click navigation state, started out as "overview"
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async (retry = true) => {
    try {
      const id = parseInt(sessionStorage.getItem("id")); //parsed session id to int
      const response = await fetch(`${GetPatient}/${id}`, {
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
        return fetchPatientData(false); // Call with `retry` set to false
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

export default PatientProfile;
