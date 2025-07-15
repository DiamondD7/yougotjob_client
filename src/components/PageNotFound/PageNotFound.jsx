import React from "react";
import { useNavigate } from "react-router-dom";
import PageNotFoundRobot from "../../assets/img/pagenotfound-img.png";
import HauoraLogo from "../../assets/img/HauoraLogo.png";

import "../../styles/pagenotfoundstyles.css";
const PageNotFound = () => {
  const navigate = useNavigate();
  const id = parseInt(sessionStorage.getItem("id"));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="page-not-found__wrapper">
          <img
            src={HauoraLogo}
            alt="Hauora Logo"
            className="page-not-found__logo"
          />
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <button
            className="page-not-found-goHome__btn"
            onClick={() => {
              if (id === 0 || id === null || id === undefined) {
                navigate("/");
              } else {
                navigate("/home");
              }
            }}
          >
            Go to Home
          </button>
        </div>
        <div>
          <img
            src={PageNotFoundRobot}
            alt="Page Not Found Robot"
            className="page-not-found__image"
          />
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
