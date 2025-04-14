import React, { useState, useEffect } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import { GetAppointmentsForPatientUser } from "../../assets/js/serverApi";

import "../../styles/schedulesstyles.css";
const Schedules = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
              </div>
              <div>
                {apts.practitionerId === 0 && apts.acceptedJobDate === null ? (
                  <p className="overdue-text">Not Complete</p>
                ) : (
                  <p className="completed-text">Completed</p>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Schedules;
