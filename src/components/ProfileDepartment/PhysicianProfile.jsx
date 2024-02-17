import React, { useState, useEffect } from "react";
import {
  Phone,
  Envelope,
  GraduationCap,
  ListMagnifyingGlass,
  UserList,
  FolderNotch,
  FolderNotchOpen,
  Calendar,
} from "@phosphor-icons/react";

import "../../styles/physicianprofilestyles.css";
const HeaderProfile = () => {
  return (
    <div>
      <div className="profile-details__wrapper">
        <div style={{ display: "flex", gap: "10px" }}>
          <img
            className="profile-doctor-picture"
            src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="doctor-picture"
          />
          <div>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Dr. Mahichit Sharma
            </p>
            <p>General Practioner</p>
            <div style={{ marginTop: "20px" }}>
              <div className="physician-profile-sub-details__wrapper">
                <GraduationCap size={17} color="rgba(0,0,0,0.5)" />
                <p style={{ fontSize: "13px" }}>Phd in Medicine </p>
              </div>
              <div className="physician-profile-sub-details__wrapper">
                <Envelope size={17} color="rgba(0,0,0,0.5)" />
                <p style={{ fontSize: "13px" }}>mahichitsharma@clinic.com</p>
              </div>
              <div className="physician-profile-sub-details__wrapper">
                <Phone size={17} color="rgba(0,0,0,0.5)" />
                <p style={{ fontSize: "13px" }}>02102102124</p>
              </div>

              <button className="btnclear physician-profile-allinfo__btn">
                see all information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavProfile = () => {
  const [hovered, setHovered] = useState(""); //initialisation of the btn hovered effect, started out as an empty string
  const [clickNav, setClickNav] = useState(""); //initialisation of the click nav, started out as an empty string

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
            borderTop:
              hovered === "overview" || clickNav === "overview"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "overview" button or if the user click on the button
            height: "50px",
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
            borderTop:
              hovered === "records" || clickNav === "records"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "overview" button or if the user click on the button
            height: "50px",
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
            borderTop:
              hovered === "documents" || clickNav === "documents"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "documents" button or if the user click on the button
            height: "50px",
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
            borderTop:
              hovered === "appointments" || clickNav === "appointments"
                ? "1px solid #81bb30"
                : "", //change borderTop color if the cursor is hovering on the "appointments" button or if the user click on the button
            height: "50px",
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

const BodyProfile = () => {
  return (
    <div>
      <p></p>
    </div>
  );
};

const PhysicianProfile = () => {
  return (
    <div>
      <div>
        <HeaderProfile />
      </div>

      <div>
        <NavProfile />
      </div>

      <div>
        <BodyProfile />
      </div>
    </div>
  );
};

export default PhysicianProfile;
