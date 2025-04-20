import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";
import {
  GetAppointmentsForPatientUser,
  DeleteApt,
  GetPatient,
  ID,
} from "../../assets/js/serverApi";

import "../../styles/schedulesstyles.css";
const RemoveBtn = ({ apts, navigate, fetchData }) => {
  const today = new Date();
  const preferredDate = new Date(apts.preferredAppointmentDate);

  const threeHoursBefore = new Date(
    preferredDate.getTime() - 3 * 60 * 60 * 1000
  );

  const authUserDelete = async (retry = true) => {
    try {
      const response = await fetch(`${GetPatient}/${ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("302 detected. Redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected. Retrying...");
        return authUserDelete(false);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      await handleDelete(); //handle delete function is called here, when user is auth.
    } catch (error) {
      console.log("Error fetching data:", error.message);
      console.log("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(DeleteApt, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: apts.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.returnStatus.code !== "200") {
        console.error("Error deleting appointment:", data.returnStatus.message);
        return;
      }
      console.log(data);
      fetchData(); // Call fetchData to refresh the appointments list
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  return (
    <div>
      {apts.acceptedJobDate !== null && threeHoursBefore > today ? (
        <button onClick={() => authUserDelete()}>Remove</button>
      ) : apts.acceptedJobDate === null &&
        new Date(apts.preferredAppointmentDate) > new Date(today) ? (
        <button onClick={() => authUserDelete()}>Remove</button>
      ) : (
        ""
      )}
    </div>
  );
};

const Schedules = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = parseInt(sessionStorage.getItem("id"));
      const response = await fetch(`${GetAppointmentsForPatientUser}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const today = new Date();

  return (
    <div className="schedules-container__wrapper">
      {loading === true ? (
        <div style={{ position: "relative" }}>
          <CircleNotch size={32} className={"loading__icon"} />
        </div>
      ) : (
        <>
          <h2>Schedules</h2>

          {appointments.map((apts, index) => (
            <div className="schedules-items__wrapper" key={apts.id}>
              <div>
                <p>
                  {apts.practitionerId === 0 ? "N/A" : apts.practitionerName}
                </p>
                <p>
                  {new Date(apts.preferredAppointmentDate).toLocaleDateString(
                    "en-nz"
                  )}
                </p>

                {/* below is for editing a pending appointment.. ?? */}

                {/* {new Date(apts.preferredAppointmentDate) > new Date(today) ? (
                  <button>Remove</button>
                ) : (
                  ""
                )} */}

                <RemoveBtn
                  apts={apts}
                  navigate={navigate}
                  fetchData={fetchData}
                />
              </div>
              <div>
                {new Date(apts.preferredAppointmentDate) > new Date(today) ? (
                  <p className="pending-text">Pending</p>
                ) : apts.practitionerId === 0 &&
                  apts.acceptedJobDate === null ? (
                  <p className="overdue-text">Not Complete</p>
                ) : (
                  <p className="completed-text">Completed</p>
                )}

                {/* {apts.practitionerId === 0 && apts.acceptedJobDate === null ? (
                  <p className="overdue-text">Not Complete</p>
                ) : new Date(apts.preferredAppointmentDate) >
                  new Date(today) ? (
                  <p className="completed-text">Pending</p>
                ) : (
                  <p className="completed-text">Completed</p>
                )} */}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Schedules;
