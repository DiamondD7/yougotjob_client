import React, { useState } from "react";
import { X, CalendarCheck, Heartbeat } from "@phosphor-icons/react";

const FullProfile = ({ fullProfileData, setOpenFullProfile }) => {
  return (
    <div>
      <div className="full-profile-container__wrapper">
        <div
          className="search-profile-container__wrapper"
          style={{ marginTop: "38px" }}
        >
          <button
            className="full-profile__btn"
            onClick={() => setOpenFullProfile(false)}
          >
            <X size={27} color="#454545" />
          </button>
          <div className="search-profile-header__wrapper">
            <img
              src={fullProfileData.picture}
              alt="test-img"
              className="search-profile__img"
            />
            <div>
              <p className="search-profile-header__texts">
                Nationality: {fullProfileData.nationality}
              </p>
              <p className="search-profile-header__texts">
                DOB: {fullProfileData.dob}
              </p>
              <p className="search-profile-header__texts">
                Age: {fullProfileData.age}
              </p>
              <p className="search-profile-header__texts">
                Height: {fullProfileData.height} cm
              </p>
              <p className="search-profile-header__texts">
                Weight: {fullProfileData.weight} kg
              </p>
            </div>
          </div>
          <p className="search-profile-name__text">
            {fullProfileData.firstName} {fullProfileData.lastName}
          </p>
          <p className="search-profile-nhi__text">NHI: {fullProfileData.nhi}</p>

          <button className="search-profile-moreinformation__btn">
            See all information
          </button>

          <div className="medications-lists__wrapper">
            <table className="medications-list-table__table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dose</th>
                  <th>Frequency</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Phlemytropic</td>
                  <td>150mg</td>
                  <td>1 / day</td>
                  <td>Gout</td>
                </tr>
                <tr>
                  <td>Phlemytropic</td>
                  <td>150mg</td>
                  <td>1 / day</td>
                  <td>Gout</td>
                </tr>
                <tr>
                  <td>Phlemytropic</td>
                  <td>150mg</td>
                  <td>1 / day</td>
                  <td>Gout</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="appointment-history-lists__wrapper">
            <div className="appointment-history-header__wrapper">
              <h3>Appointment history</h3>
              <button>view all</button>
            </div>
            <div className="appointment-history__wrapper">
              <div>
                <CalendarCheck size={17} />
              </div>
              <div>
                <p>General appointment</p>
                <p>Dr. Malephosa Juno</p>
                <p>25/12/2023</p>
              </div>
            </div>
            <div className="appointment-history__wrapper">
              <div>
                <Heartbeat size={17} />
              </div>
              <div>
                <p>Cholesterol Test</p>
                <p>Dr. Henry Chun</p>
                <p>10/01/2024</p>
              </div>
            </div>
            <div className="appointment-history__wrapper">
              <div>
                <Heartbeat size={17} />
              </div>
              <div>
                <p>Cholesterol Test</p>
                <p>Dr. Henry Chun</p>
                <p>10/01/2024</p>
              </div>
            </div>
          </div>
          <div className="personal-medical-history__wrapper">
            <div>
              <h3>Personal Medical History</h3>
            </div>
            <div className="ul-medical__wrapper">
              <ul>
                <li>Acid Reflux</li>
                <li>Allergy Problems</li>
                <li>Anxiety</li>
                <li>Anxiety</li>
                <li>Anxiety</li>
                <li>Anxiety</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;
