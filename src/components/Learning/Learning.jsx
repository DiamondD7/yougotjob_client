import React from "react";

import "../../styles/learningstyles.css";
const Learning = () => {
  return (
    <div className="learning-container__wrapper">
      <div className="learning-search__wrapper">
        <input
          className="learning-search__input"
          type="text"
          placeholder="search"
        />
      </div>
      <div className="learning-results__wrapper">
        <div className="learning-modules__wrapper">
          <img
            className="learning-module__img"
            src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="module-picture"
          />
          <h3 style={{ marginTop: "10px" }}>
            Virus 101 - Physicians guide to 0% virus free
          </h3>
          <label style={{ color: "rgba(0,0,0,0.4)" }}>Dr. Henry Campbell</label>

          <p
            style={{
              color: "rgba(0,0,0,0.4)",
              fontSize: "13px",
              marginTop: "5px",
            }}
          >
            17/12/2023
          </p>
          <button className="learning-module__btn">open</button>
        </div>
        <div className="learning-modules__wrapper">
          <img
            className="learning-module__img"
            src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="module-picture"
          />
          <h3 style={{ marginTop: "10px" }}>
            Virus 101 - Physicians guide to 0% virus free
          </h3>
          <label style={{ color: "rgba(0,0,0,0.4)" }}>Dr. Henry Campbell</label>

          <p
            style={{
              color: "rgba(0,0,0,0.4)",
              fontSize: "13px",
              marginTop: "5px",
            }}
          >
            17/12/2023
          </p>
          <button className="learning-module__btn">open</button>
        </div>
        <div className="learning-modules__wrapper">
          <img
            className="learning-module__img"
            src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="module-picture"
          />
          <h3 style={{ marginTop: "10px" }}>
            Virus 101 - Physicians guide to 0% virus free
          </h3>
          <label style={{ color: "rgba(0,0,0,0.4)" }}>Dr. Henry Campbell</label>

          <p
            style={{
              color: "rgba(0,0,0,0.4)",
              fontSize: "13px",
              marginTop: "5px",
            }}
          >
            17/12/2023
          </p>
          <button className="learning-module__btn">open</button>
        </div>
      </div>
    </div>
  );
};

export default Learning;
