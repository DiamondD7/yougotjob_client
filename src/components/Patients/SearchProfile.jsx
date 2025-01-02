import React, { useEffect, useState } from "react";
import { GetPatients, ValidatePrac } from "../../assets/js/serverApi";
import { CaretRight, MagnifyingGlass, SmileySad } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { PatientMockData } from "../../assets/js/usermock";

import "../../styles/searchprofilestyles.css";
const SearchProfile = ({
  searchField,
  setFullProfileData,
  setOpenFullProfile,
}) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    handleValidateAuth();
  }, []);

  //this is only for validating tokens, this is only used for calling another controller action method that is authorized. This will work as a counter measure to validate current tokens because the user is a different role as the controller action is calling. in this case the "GetPatients".
  const handleValidateAuth = async (retry = true) => {
    try {
      const response = await fetch(ValidatePrac, {
        method: "GET",
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

        return handleValidateAuth(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      handleGetPatients(); //if response is ok, call this.

      const data = await response.json();
      console.log(data.returnStatus.message);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  //this api route is from the Patient API.
  const handleGetPatients = async (retry = true) => {
    try {
      const response = await fetch(GetPatients, {
        method: "GET",
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

        return handleGetPatients(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //console.log(data);
      setPatients(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const openingFullProfileClick = (e, data) => {
    e.preventDefault();
    setFullProfileData(data);
    setOpenFullProfile(true);
  };

  const ReturnSearchData = () => {
    const filterData = patients.filter(
      (item) =>
        item.fullName.toLowerCase().includes(searchField.toLowerCase()) ||
        item.nhi.toLowerCase().includes(searchField.toLowerCase())
    );
    if (searchField === "" || filterData.length === 0) {
      return (
        <div>
          {searchField === "" ? (
            <div className="no-search__wrapper">
              <MagnifyingGlass
                size={60}
                color="rgba(0,0,0,0.4)"
                weight="fill"
              />

              <p
                style={{
                  color: "rgba(0,0,0,0.25)",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Search patient results,
              </p>
              <p
                style={{
                  color: "rgba(0,0,0,0.2)",
                  fontSize: "15px",
                }}
              >
                search their names or their NHI number
              </p>
            </div>
          ) : (
            <div className="no-search__wrapper">
              <SmileySad size={60} color="rgba(0,0,0,0.4)" weight="fill" />
              <p
                style={{
                  color: "rgba(0,0,0,0.25)",
                  fontSize: "17px",
                  marginTop: "10px",
                }}
              >
                Sorry we couldn't find any results
              </p>
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
