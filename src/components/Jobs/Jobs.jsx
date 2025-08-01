import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Binoculars, Users, User, CircleNotch } from "@phosphor-icons/react";
import {
  GetAppointmentsDirectRequestForPractitioner,
  GetAvailableJobs,
  AcceptJob,
  GetaHealthPractitioner,
  CreateMeeting,
  AppointmentRequestApprovalEmail,
  ApplyFilter,
} from "../../assets/js/serverApi";

import "../../styles/jobsstyles.css";

const JobsFilter = ({ setSearchField, setJobsData, fetchOpenJobs }) => {
  const [applyFilter, setApplyFilter] = useState({
    AppointmentType: "",
    HealthPractitionerType: "",
  });
  const handleApplyFilter = (e) => {
    e.preventDefault();
    fetch(ApplyFilter, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        AppointmentType: applyFilter.AppointmentType,
        HealthPractitionerType: applyFilter.HealthPractitionerType,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setJobsData(res.returnStatus.data);
      });
  };

  const handleFilterOnChange = (e) => {
    setApplyFilter({ ...applyFilter, [e.target.name]: e.target.value });
  };

  const handleClearFilter = (e) => {
    e.preventDefault();
    setApplyFilter({
      AppointmentType: "",
      HealthPractitionerType: "",
    });
    fetchOpenJobs();
  };
  return (
    <div>
      <form>
        <p style={{ fontSize: "11px", fontWeight: "bold" }}>Location</p>
        <input
          className="location-search__input"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchField(e.target.value)}
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
            <input
              type="checkbox"
              value="Nurse"
              name="HealthPractitionerType"
              checked={
                applyFilter.HealthPractitionerType === "Nurse" ? true : false
              }
              onChange={(e) => handleFilterOnChange(e)}
            />
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
            <input
              type="checkbox"
              value="General Practitioner"
              name="HealthPractitionerType"
              checked={
                applyFilter.HealthPractitionerType === "General Practitioner"
                  ? true
                  : false
              }
              onChange={(e) => handleFilterOnChange(e)}
            />
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
            <input
              type="checkbox"
              value="Therapist"
              name="HealthPractitionerType"
              checked={
                applyFilter.HealthPractitionerType === "Therapist"
                  ? true
                  : false
              }
              onChange={(e) => handleFilterOnChange(e)}
            />
          </div>

          <br />
          <br />
          <p style={{ fontSize: "11px", fontWeight: "bold" }}>
            Appointment type
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "11px" }}>Online</label>
            <input
              type="checkbox"
              value="online"
              name="AppointmentType"
              checked={applyFilter.AppointmentType === "online" ? true : false}
              onChange={(e) => handleFilterOnChange(e)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "11px" }}>On-site</label>
            <input
              type="checkbox"
              value="on-site"
              name="AppointmentType"
              checked={applyFilter.AppointmentType === "on-site" ? true : false}
              onChange={(e) => handleFilterOnChange(e)}
            />
          </div>
        </div>

        <button
          className="jobs-clear-filter__btn"
          onClick={(e) => handleClearFilter(e)}
        >
          Clear filters
        </button>
        <button
          className="jobs-filter-apply__btn"
          onClick={(e) => handleApplyFilter(e)}
        >
          Apply filters
        </button>
      </form>
    </div>
  );
};

const JobsCards = ({
  userIsVerified,
  jobsData,
  fetchOpenJobs,
  userFullName,
  searchField,
}) => {
  const [loading, setLoading] = useState(false);

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

        handleFinaliseAuth(data);
        fetchOpenJobs();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSendEmailRequestApproved = async (userData) => {
    try {
      const response = await fetch(AppointmentRequestApprovalEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          FullName: userData.fullName,
          PreferredAppointmentDate: userData.preferredAppointmentDate,
          EmailAddress: userData.emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.returnStatus.status === true) {
        setLoading(false);
        setTimeout(() => {
          window.location.reload(); //loads the page
        }, 600);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleFinaliseAuth = (data) => {
    setLoading(true);
    const cliendId = import.meta.env.VITE_ZOOM_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_ZOOM_REDIRECT_URI;
    window.open(
      `https://zoom.us/oauth/authorize?response_type=code&client_id=${cliendId}&redirect_uri=${redirectUri}?id=${data.id}`,
      "_blank",
      "noreferrer"
    );

    handleSendEmailRequestApproved(data);
  };
  return (
    <div>
      {loading === true ? (
        <div>
          <div className="overlay"></div>
          <CircleNotch size={40} color="#202020" className={"loading-icon"} />
        </div>
      ) : (
        <div className="jobs-contents__wrapper">
          {jobsData.length <= 0 ? (
            <div className="jobs-empty-results-icon__wrapper">
              <Binoculars size={92} color="rgba(0,0,0,0.2)" weight="fill" />
              <p style={{ color: "rgba(0,0,0,0.3)", fontWeight: "bold" }}>
                No results found
              </p>
              <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.3)" }}>
                Try adjusting your search or filter to find what you're looking
                for
              </p>
            </div>
          ) : (
            <div>
              <>
                {jobsData
                  .filter((item) =>
                    searchField
                      ? item.suburb
                          ?.toLowerCase()
                          .includes(searchField.toLowerCase()) ||
                        item.city
                          ?.toLowerCase()
                          .includes(searchField.toLowerCase()) ||
                        item.appointmentType
                          ?.toLowerCase()
                          .includes(searchField.toLowerCase()) ||
                        item.healthPractitionerType
                          ?.toLowerCase()
                          .includes(searchField.toLowerCase())
                      : true
                  )
                  .map((item, index) => (
                    <div className="jobs-content-card__wrapper" key={item.id}>
                      <div className="jobs-content-card-header__wrapper">
                        <div style={{ display: "flex", gap: "20px" }}>
                          <div>
                            <h4>{item.fullName}</h4>
                            <p style={{ fontSize: "11px", fontWeight: "bold" }}>
                              Preferred Date/Time:{" "}
                              {new Date(
                                item.preferredAppointmentDate
                              ).toLocaleString("en-nz")}
                            </p>
                          </div>
                          <p style={{ fontSize: "11px" }}>
                            Looking for a {item.healthPractitionerType}
                          </p>
                        </div>
                        <button
                          className={`jobs-content-card__btn ${
                            userIsVerified === false ? "btnDisable" : ""
                          }`}
                          onClick={(e) => handleAcceptJob(e, item)}
                          disabled={userIsVerified === false ? true : false} //if the user is not verified then set the diabled to true
                        >
                          Accept & Finalise
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "5px",
                        }}
                      >
                        <p style={{ fontSize: "11px", color: "#9dcd5a" }}>
                          {item.appointmentType}
                        </p>
                        {item.appointmentType === "on-site" ? (
                          <p style={{ fontSize: "11px" }}>
                            Location: {item.suburb}, {item.city}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div style={{ fontSize: "11px" }}>
                        <p style={{ color: "rgba(0,0,0,0.4)" }}>{item.nhi}</p>

                        <p style={{ color: "rgba(0,0,0,0.4)" }}>
                          {item.emailAddress}
                        </p>
                        <p style={{ color: "rgba(0,0,0,0.4)" }}>
                          {item.contactNumber}
                        </p>
                      </div>
                      <br />
                      <p className="jobs-content-comment">{item.comments}</p>
                    </div>
                  ))}
              </>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Jobs = () => {
  const [defaultFilter, setDefaultFilter] = useState("Open");
  const [jobsData, setJobsData] = useState([]);
  const [userAuth, setUserAuth] = useState([]);

  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  //authorizes the user
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
        if (defaultFilter === "Open") {
          fetchOpenJobs(); //call if the user is authorized
          console.log("Open jobs fetched successfully.");
        }
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [defaultFilter]);

  const fetchDirectJobs = (e, id) => {
    e.preventDefault();
    setDefaultFilter("Direct");
    fetch(`${GetAppointmentsDirectRequestForPractitioner}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setJobsData(res.returnStatus.data);
      });
  };

  const fetchOpenJobs = () => {
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
          <JobsFilter
            setSearchField={setSearchField}
            setJobsData={setJobsData}
            fetchOpenJobs={fetchOpenJobs}
          />
        </div>
        <div>
          <div style={{ display: "flex", gap: "50px", padding: "0 20px" }}>
            <button
              className={`jobs-filters-btn ${
                defaultFilter === "Open" ? "selected-filter" : ""
              }`}
              onClick={() => setDefaultFilter("Open")}
            >
              <Users size={20} />
              <span style={{ marginLeft: "5px" }}>Open Jobs</span>
            </button>
            <button
              className={`jobs-filters-btn ${
                defaultFilter === "Direct" ? "selected-filter" : ""
              }`}
              onClick={(e) => fetchDirectJobs(e, userAuth.id)}
            >
              <User size={20} />
              <span style={{ marginLeft: "5px" }}>Direct Request</span>
            </button>
          </div>
          <JobsCards
            userIsVerified={userAuth.isVerified}
            jobsData={jobsData}
            fetchOpenJobs={fetchOpenJobs}
            userFullName={userAuth.fullName}
            searchField={searchField}
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
