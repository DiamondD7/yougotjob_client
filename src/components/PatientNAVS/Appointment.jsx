import React, { useState } from "react";
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabaTpAn33k1UuF33dQZzivbhfq8IsDt20BQ7ztZ1d-L65QtKKt2bJtEmlsbTpGhrTA90&usqp=CAU"
          className="result-card__img"
        />
        <div style={{ justifyItems: "start" }}>
          <h4>Smile Dental</h4>
          <div style={{ fontSize: "12px", justifyItems: "start" }}>
            <p>Dental</p>
            <br />
            <div>
              <Check size={12} color="limegreen" /> <label>On-site</label>
            </div>
            <div>
              <Check size={12} color="limegreen" /> <label>Verified</label>
            </div>
            <div>
              <Check size={12} color="limegreen" />{" "}
              <label>Experienced practitioners</label>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

const AppointmentSearch = () => {
  const [onlineRadio, setOnlineRadio] = useState("");
  const handleRadio = (e) => {
    setOnlineRadio(e.target.value);
  };

  return (
    <div>
      <div className="appointment-search__wrapper">
        <div>
          <input
            type="radio"
            value="online"
            checked={onlineRadio === "online"}
            onChange={(e) => handleRadio(e)}
          />
          <label>Online</label>
        </div>

        <div>
          <input
            type="radio"
            value="on-site"
            checked={onlineRadio === "on-site"}
            onChange={(e) => handleRadio(e)}
          />
          <label>On-site</label>
        </div>
        <div>
          <input
            type="radio"
            value="flexible"
            checked={onlineRadio === "flexible"}
            onChange={(e) => handleRadio(e)}
          />
          <label>flexible</label>
        </div>
      </div>
    </div>
  );
};

const Appointment = () => {
  return (
    <div style={{ margin: "50px 0 0 100px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div className="appointment-search-container__wrapper">
          <div>
            <MagnifyingGlass size={15} />
            <input
              className="appointment__input"
              type="text"
              placeholder="what are you looking for..."
            />
          </div>
        </div>
        <AppointmentSearch />
      </div>
      <SearchResults />
    </div>
  );
};

export default Appointment;
