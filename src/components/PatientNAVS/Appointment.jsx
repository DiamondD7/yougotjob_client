import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, Check } from "@phosphor-icons/react";
import {
  GetHealthPractitionerData,
  GetPatient,
} from "../../assets/js/serverApi";

import "../../styles/appointmentstyles.css";
const SearchResults = ({ filterSearch }) => {
  const [practitioners, setPractioners] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const practitionerData = async () => {
      try {
        const response = await fetch(GetHealthPractitionerData, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setPractioners(data);
      } catch (ex) {
        console.log(ex);
      }
    };

    const id = parseInt(sessionStorage.getItem("id"));
    const checkPatient = async (retry = true) => {
      try {
        const response = await fetch(`${GetPatient}/${id}`, {
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
          return checkPatient(false); // Call with `retry` set to false
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        practitionerData();
      } catch (ex) {
        console.log(ex);
      }
    };

    checkPatient();
  }, []);

  return (
    <div className="result-cards-container__wrapper">
      {practitioners
        .filter((data) =>
          data.fullName.toLowerCase().includes(filterSearch.toLowerCase())
        )
        .map((data, index) => (
          <div key={data.id}>
            <button className="result-cards__wrapper">
              <img
                src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="result-card__img"
              />
              <div style={{ justifyItems: "start" }}>
                <h4>{data.fullName}</h4>
                <div style={{ fontSize: "12px", justifyItems: "start" }}>
                  <p>{data.departmentRole}</p>
                  <br />
                  <div>
                    <Check size={12} color="limegreen" /> <label>Online</label>
                  </div>
                  <div>
                    <Check size={12} color="limegreen" />{" "}
                    <label>Verified</label>
                  </div>
                  <div>
                    <Check size={12} color="limegreen" />{" "}
                    <label>Experienced</label>
                  </div>
                </div>
              </div>
            </button>
          </div>
        ))}
      {/* <button className="result-cards__wrapper">
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
      </button> */}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="online"
            checked={onlineRadio === "online"}
            onChange={(e) => handleRadio(e)}
          />
          <label className="radio-label">Online</label>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="on-site"
            checked={onlineRadio === "on-site"}
            onChange={(e) => handleRadio(e)}
          />
          <label className="radio-label">On-site</label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            value="flexible"
            checked={onlineRadio === "flexible"}
            onChange={(e) => handleRadio(e)}
          />
          <label className="radio-label">flexible</label>
        </div>
      </div>
    </div>
  );
};

const Appointment = () => {
  const [filterSearch, setFilterSearch] = useState("");
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
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </div>
        </div>
        <AppointmentSearch />
      </div>
      <SearchResults filterSearch={filterSearch} />
    </div>
  );
};

export default Appointment;
