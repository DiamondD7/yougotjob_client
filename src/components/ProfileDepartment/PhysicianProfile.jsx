import React, { useState, useEffect } from "react";
import {
  Phone,
  Envelope,
  GraduationCap,
  ListMagnifyingGlass,
  UserList,
  FolderNotch,
  FolderNotchOpen,
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
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    const buttons = document.querySelectorAll(".nav-btns");
    buttons.forEach((button, index) => {
      if (hovered === "") {
        button.addEventListener("mouseenter", () => {
          if (index === 0) {
            setHovered("overview");
          } else if (index === 1) {
            setHovered("records");
          } else if (index === 2) {
            setHovered("documents");
          }
        });
      } else {
        button.addEventListener("mouseleave", () => {
          setHovered("");
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
            borderTop: hovered === "overview" ? "1px solid #81bb30" : "",
            height: "50px",
          }}
          className="nav-btns"
          id="overview"
        >
          <div>
            <ListMagnifyingGlass
              size={20}
              color={hovered === "overview" ? "#81bb30" : ""}
              weight={hovered === "overview" ? "fill" : "regular"}
            />
          </div>
          overview
        </button>

        <button
          className="nav-btns"
          style={{
            display: "block",
            textAlign: "center",
            borderTop: hovered === "records" ? "1px solid #81bb30" : "",
            height: "50px",
          }}
        >
          <div>
            <UserList
              size={20}
              color={hovered === "records" ? "#81bb30" : ""}
              weight={hovered === "records" ? "fill" : "regular"}
            />
          </div>
          records
        </button>
        <button
          className="nav-btns"
          style={{
            display: "block",
            textAlign: "center",
            borderTop: hovered === "documents" ? "1px solid #81bb30" : "",
            height: "50px",
          }}
        >
          <div>
            {hovered === "documents" ? (
              <FolderNotchOpen
                size={20}
                color={hovered === "documents" ? "#81bb30" : ""}
                weight={hovered === "documents" ? "fill" : "regular"}
              />
            ) : (
              <FolderNotch size={20} weight="fill" />
            )}
          </div>
          documents
        </button>
        <button>saved documents</button>
        <button>saved documents</button>
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
