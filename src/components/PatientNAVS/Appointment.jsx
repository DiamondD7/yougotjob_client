import React from "react";
import { MagnifyingGlass, Check } from "@phosphor-icons/react";

import "../../styles/appointmentstyles.css";
const SearchResults = () => {
  return (
    <div className="result-cards-container__wrapper">
      <button className="result-cards__wrapper">
        <img
          src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="result-card__img"
        />
        <div style={{ justifyItems: "start" }}>
          <h4>John Doe</h4>
          <div style={{ fontSize: "12px", justifyItems: "start" }}>
            <p>General Practitioner</p>
            <br />
            <div>
              <Check size={12} color="limegreen" /> <label>Online</label>
            </div>
            <div>
              <Check size={12} color="limegreen" /> <label>Verified</label>
            </div>
            <div>
              <Check size={12} color="limegreen" /> <label>Experienced</label>
            </div>
          </div>
        </div>
      </button>

      <button className="result-cards__wrapper">
        <img
          src="https://images.unsplash.com/photo-1667133295308-9ef24f71952e?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="result-card__img"
        />
        <div style={{ justifyItems: "start" }}>
          <h4>Henry Jomma</h4>
          <div style={{ fontSize: "12px", justifyItems: "start" }}>
            <p>Dentist</p>
            <br />
            <div>
              <Check size={12} color="limegreen" /> <label>Online</label>
            </div>
            <div>
              <Check size={12} color="limegreen" /> <label>Verified</label>
            </div>
            <div>
              <Check size={12} color="limegreen" /> <label>Experienced</label>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

const Appointment = () => {
  return (
    <div style={{ margin: "50px 0 0 100px" }}>
      <div className="appointment-search__wrapper">
        <MagnifyingGlass size={15} />
        <input
          className="appointment__input"
          type="text"
          placeholder="what are you looking for..."
        />
      </div>
      <SearchResults />
    </div>
  );
};

export default Appointment;
