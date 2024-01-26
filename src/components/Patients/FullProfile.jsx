import React from "react";
import { X } from "@phosphor-icons/react";

const FullProfile = ({ fullProfileData, setOpenFullProfile }) => {
  return (
    <div>
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
      </div>
    </div>
  );
};

export default FullProfile;
