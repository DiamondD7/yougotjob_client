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
} from "@phosphor-icons/react";
import { GetaHealthPractitioner } from "../../assets/js/serverApi";

import "../../styles/physicianprofilestyles.css";

const OverviewProfile = ({ loggedUser }) => {
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
        <div className="right-side-container__wrapper"></div>
      </div>
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
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <h3 style={{ padding: "10px 0 0 30px" }}>Profile</h3>
      <div>
        <NavProfile clickNav={clickNav} setClickNav={setClickNav} />
      </div>

      <div>
        <BodyProfile loggedUser={loggedUser} clickNav={clickNav} />
      </div>
    </div>
  );
};

export default PhysicianProfile;
