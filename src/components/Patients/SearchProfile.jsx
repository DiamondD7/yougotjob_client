import React from "react";
import { CaretRight } from "@phosphor-icons/react";

import "../../styles/searchprofilestyles.css";
const SearchProfile = () => {
  const testProfile = [
    {
      id: 55,
      nhi: "NHNX8438",
      firstName: "Henry",
      lastName: "Tood",
      nationality: "Indian",
      dob: "28 Jan 1998",
      age: "35",
      height: "160",
      weight: "60",
      email: "henry@gmail.com",
    },
  ];
  return (
    <div>
      <div className="search-profile-container__wrapper">
        {testProfile.map((items, index) => (
          <div>
            <div className="search-profile-header__wrapper">
              <img
                src="https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="test-img"
                className="search-profile__img"
              />
              <div>
                <p className="search-profile-header__texts">
                  Nationality: {items.nationality}
                </p>
                <p className="search-profile-header__texts">DOB: {items.dob}</p>
                <p className="search-profile-header__texts">Age: {items.age}</p>
                <p className="search-profile-header__texts">
                  Height: {items.height} cm
                </p>
                <p className="search-profile-header__texts">
                  Weight: {items.weight} kg
                </p>
              </div>
              <div>
                <button className="search-profile-header__btn">
                  Full Profile <CaretRight size={13} color="#454545" />
                </button>
              </div>
            </div>

            <p className="search-profile-name__text">
              {items.firstName} {items.lastName}
            </p>
            <p className="search-profile-nhi__text">NHI: {items.nhi}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProfile;
