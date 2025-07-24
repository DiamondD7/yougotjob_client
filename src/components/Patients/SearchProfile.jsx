import React, { useEffect, useState } from "react";
import {
  GetPatientReturnSomeValues,
  GetPatients,
  ValidatePrac,
  GetPreviousApt,
  GetAptToSearch,
} from "../../assets/js/serverApi";
import {
  CaretRight,
  MagnifyingGlass,
  SmileySad,
  CircleNotch,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import AvatarMale from "../../assets/img/avatar-male.png";
import AvatarFemale from "../../assets/img/avatar-female.png";
import AvatarUngendered from "../../assets/img/avatar-ungendered.png";

import "../../styles/searchprofilestyles.css";
const SearchProfile = ({
  searchField,
  setPatientProfileId,
  setOpenFullProfile,
}) => {
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const handleGetPatients = () => {
    try {
      const id = parseInt(sessionStorage.getItem("id"));
      fetch(`${GetAptToSearch}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          //console.log(res);
          const allPatientsId = res.returnStatus.data.map(
            (patient) => patient.patientsId
          );
          handleGetPatientValues(true, allPatientsId);
        });
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const handleGetPatientValues = async (retry = true, patientIds) => {
    try {
      const response = await fetch(GetPatientReturnSomeValues, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(patientIds),
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

        return handleGetPatientValues(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPatientDetails(data.returnStatus.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching patient values:", error.message);
    }
  };

  const openingFullProfileClick = (e, id) => {
    e.preventDefault();
    setPatientProfileId(id);
    setOpenFullProfile(true);
  };

  const ReturnSearchData = () => {
    const filterData = patientDetails?.filter(
      (item) =>
        item.fullName?.toLowerCase().includes(searchField.toLowerCase()) ||
        item.mobileNumber?.toLowerCase().includes(searchField.toLowerCase())
    );
    if (searchField === "" || filterData?.length === 0) {
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
                search your patients by name
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
      <div className="search-profile-container__wrapper">
        {filterData?.map((items, index) => (
          <div className="search-profile-resultsfiltered__wrapper" key={index}>
            <div className="search-profile-header__wrapper">
              <img
                src={
                  items.gender === "Male"
                    ? AvatarMale
                    : items.gender === "Female"
                    ? AvatarFemale
                    : AvatarUngendered
                }
                alt="avatar"
                className="search-profile__img"
              />
              <div>
                <p className="search-profile-name__text">{items.fullName}</p>
                <p className="search-profile-details__text">
                  {items.mobileNumber}
                </p>
                <p className="search-profile-details__text">
                  {items.emailAddress}
                </p>
              </div>
            </div>
            <div>
              <button
                className="search-profile-header__btn"
                onClick={(e) => openingFullProfileClick(e, items.id)}
              >
                View details <CaretRight size={13} color="#f3f3f3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="search-profile-container__wrapper">
        {loading === true || patientDetails.length <= 0 ? (
          <div className="btn-loading-icon-search-profile__wrapper">
            <CircleNotch
              size={30}
              color="#202020"
              className={"btn-loading__icon"}
            />
          </div>
        ) : (
          <ReturnSearchData />
        )}
      </div>
    </div>
  );
};

export default SearchProfile;
