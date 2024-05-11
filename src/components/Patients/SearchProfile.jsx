import React, { useState } from "react";
import { CaretRight, MagnifyingGlass, SmileySad } from "@phosphor-icons/react";
import { PatientMockData } from "../../assets/js/usermock";

import "../../styles/searchprofilestyles.css";
const SearchProfile = ({
  searchField,
  setFullProfileData,
  setOpenFullProfile,
}) => {
  const openingFullProfileClick = (e, data) => {
    e.preventDefault();
    setFullProfileData(data);
    setOpenFullProfile(true);
  };

  const ReturnSearchData = () => {
    const filterData = PatientMockData.filter(
      (item) =>
        item.fullName.toLowerCase().includes(searchField.toLowerCase()) ||
        item.nhi.toLowerCase().includes(searchField.toLowerCase())
    );
    if (searchField === "" || filterData.length === 0) {
      return (
        <div>
          {searchField === "" ? (
            <div className="no-search__wrapper">
              <MagnifyingGlass size={72} color="#9DCD5A" weight="fill" />
              <h2
                style={{
                  color: "rgba(0,0,0,0.25)",
                }}
              >
                Search patient results,
              </h2>
              <h2
                style={{
                  color: "rgba(0,0,0,0.25)",
                }}
              >
                search their names or their NHI number
              </h2>
            </div>
          ) : (
            <div className="no-search__wrapper">
              <SmileySad size={60} color="#9DCD5A" weight="fill" />
              <h2 style={{ color: "rgba(0,0,0,0.25)" }}>
                Sorry we couldn't find any results
              </h2>
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        {filterData.map((items, index) => (
          <div style={{ marginTop: "20px" }} key={index}>
            <div className="search-profile-header__wrapper">
              <img
                src={items.picture}
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
                <button
                  className="search-profile-header__btn"
                  onClick={(e) => openingFullProfileClick(e, items)}
                >
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
    );
  };

  return (
    <div>
      <div className="search-profile-container__wrapper">
        <ReturnSearchData />
      </div>
    </div>
  );
};

export default SearchProfile;
