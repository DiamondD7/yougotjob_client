import React, { useState } from "react";
import { CaretRight, MagnifyingGlass, SmileySad } from "@phosphor-icons/react";

import "../../styles/searchprofilestyles.css";
const SearchProfile = ({
  searchField,
  setFullProfileData,
  setOpenFullProfile,
}) => {
  const testProfile = [
    {
      id: 55,
      picture:
        "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "NHNX8438",
      firstName: "Henry",
      lastName: "Tood",
      nationality: "Indian",
      dob: "28 Jan 1998",
      age: "25",
      height: "160",
      weight: "60",
      email: "henry@gmail.com",
    },
    {
      id: 56,
      picture:
        "https://images.unsplash.com/photo-1705798543468-5b951da25e1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "KJHN8438",
      firstName: "Helen",
      lastName: "Tood",
      nationality: "Indian",
      dob: "2 Nov 1991",
      age: "32",
      height: "150",
      weight: "60",
      email: "helen@gmail.com",
    },
    {
      id: 57,
      picture:
        "https://images.unsplash.com/photo-1699901853492-8bc942fc6a5c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "CDEK8438",
      firstName: "Jack",
      lastName: "Armstrong",
      nationality: "Kiwi",
      dob: "15 Aug 1997",
      age: "26",
      height: "180",
      weight: "77",
      email: "jackarm@gmail.com",
    },
  ];

  const openingFullProfileClick = (e, data) => {
    e.preventDefault();
    setFullProfileData(data);
    setOpenFullProfile(true);
  };

  const ReturnSearchData = () => {
    const filterData = testProfile.filter(
      (item) =>
        item.firstName.toLowerCase().includes(searchField.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchField.toLowerCase()) ||
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
