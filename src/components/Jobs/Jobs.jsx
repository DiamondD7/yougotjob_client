import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetAvailableJobs,
  AcceptJob,
  GetaHealthPractitioner,
  CreateMeeting,
} from "../../assets/js/serverApi";

import "../../styles/jobsstyles.css";
const JobsFilter = () => {
  return (
    <div>
      <form>
        <p style={{ fontSize: "11px", fontWeight: "bold" }}>Location</p>
        <input
          className="location-search__input"
          type="text"
          placeholder="Search"
        />

        <div style={{ marginTop: "20px", width: "150px" }}>
          <p style={{ fontSize: "11px", fontWeight: "bold" }}>Type</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <label style={{ fontSize: "11px" }}>Nurse</label>
            <input type="checkbox" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "11px" }}>General Practitioner</label>
            <input type="checkbox" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "11px" }}>Therapist</label>
            <input type="checkbox" />
          </div>
        </div>

        <button className="jobs-filter-apply__btn">Apply filter</button>
      </form>
    </div>
  );
};

const JobsCards = ({ jobsData, fetchAvailableJobs, userFullName }) => {
  const handleAcceptJob = (e, data) => {
    e.preventDefault();

    const id = parseInt(sessionStorage.getItem("id"));
    fetch(AcceptJob, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: data.id,
        practitionerId: id,
        practitionerName: userFullName,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.returnStatus.status === false) {
          console.log("bad request");
        }

        fetchAvailableJobs();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="jobs-contents__wrapper">
        {jobsData.map((item, index) => (
          <div className="jobs-content-card__wrapper" key={item.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <h4>{item.fullName}</h4>
                  <p style={{ fontSize: "11px", fontWeight: "bold" }}>
                    Preferred Date/Time:{" "}
                    {new Date(item.preferredAppointmentDate).toLocaleString(
                      "en-nz"
                    )}
                  </p>
                </div>
                <p style={{ fontSize: "11px" }}>
                  Looking for a {item.healthPractitionerType}
                </p>
              </div>
              <button
                className="jobs-content-card__btn"
                onClick={(e) => handleAcceptJob(e, item)}
              >
                Accept Job
              </button>
            </div>
            <p style={{ fontSize: "11px" }}>{item.nhi}</p>

            <p style={{ fontSize: "11px" }}>{item.emailAddress}</p>
            <p style={{ fontSize: "11px" }}>{item.contactNumber}</p>
            <br />
            <p className="jobs-content-comment">{item.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [userAuth, setUserAuth] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));

    const fetchData = async (retry = true) => {
      try {
        const response = await fetch(`${GetaHealthPractitioner}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include", // Ensure cookies are included in the request if necessary
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
          return fetchData(false); // Call with `retry` set to false
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserAuth(data); //get user data after it is authorized
        fetchAvailableJobs(); //call if the user is authorized
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const fetchAvailableJobs = () => {
    fetch(GetAvailableJobs)
      .then((res) => res.json())
      .then((res) => {
        setJobsData(res);
      });
  };
  return (
    <div>
      <div className="jobs__wrapper">
        <div className="jobs-search-filter__wrapper">
          <h4>Filter by</h4>
          <br />
          <JobsFilter />
        </div>
        <JobsCards
          jobsData={jobsData}
          fetchAvailableJobs={fetchAvailableJobs}
          userFullName={userAuth.fullName}
        />
      </div>
    </div>
  );
};

export default Jobs;
