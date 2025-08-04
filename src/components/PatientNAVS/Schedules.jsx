import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleNotch, DotsThree, X } from "@phosphor-icons/react";
import {
  DeleteAptForPatient,
  GetAppointmentsForPatientUser,
  PatientCancelledAppointment,
  GetPatient,
  ID,
} from "../../assets/js/serverApi";

import "../../styles/schedulesstyles.css";
const RemoveBtn = ({ appointment, navigate, fetchData }) => {
  const today = new Date();
  const preferredDate = new Date(appointment.preferredAppointmentDate);

  const threeHoursBefore = new Date(
    preferredDate.getTime() - 3 * 60 * 60 * 1000
  );

  const authUserCancel = async (retry = true) => {
    try {
      const id = parseInt(sessionStorage.getItem("id"));
      const response = await fetch(`${GetPatient}/${id}`, {
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
        return authUserCancel(false);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      //console.log(data);
      await handleCancel(); //handle delete function is called here, when user is auth.
    } catch (error) {
      console.log("Error fetching data:", error.message);
      console.log("Error:", error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch(PatientCancelledAppointment, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: appointment.id,
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
      //console.log(data);
      fetchData(); // Call fetchData to refresh the appointments list
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <>
      {appointment.acceptedJobDate !== null && threeHoursBefore > today ? (
        <button className="actions__btns" onClick={() => authUserCancel()}>
          Cancel
        </button>
      ) : appointment.acceptedJobDate === null &&
        new Date(appointment.preferredAppointmentDate) > new Date(today) ? (
        <button className="actions__btns" onClick={() => authUserCancel()}>
          Cancel
        </button>
      ) : (
        ""
      )}
    </>
  );
};

const TableView = ({ appointments, navigate, fetchData }) => {
  const [openActionModal, setOpenActionModal] = useState("0");
  const today = new Date();

  const handleDelete = (e, id) => {
    e.preventDefault();

    fetch(DeleteAptForPatient, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOpenActionModal("0");
        fetchData();
      });
  };
  return (
    <div>
      <table className="schedule-table__wrapper">
        <thead>
          <tr>
            <th>#</th>
            <th>Practitioner Type</th>
            <th>Practitioner Name</th>
            <th>Appointment Type</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((apts, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{apts.healthPractitionerType}</td>
              <td>{apts.practitionerName}</td>
              <td>{apts.isOpenJob === true ? "Open" : "Direct"}</td>
              <td>
                {new Date(apts.preferredAppointmentDate).toLocaleString(
                  "en-nz"
                )}
              </td>
              {new Date(apts.preferredAppointmentDate) > new Date(today) &&
              apts.isCancelled === false ? (
                <td>
                  <p className="pending-text">Pending</p>
                </td>
              ) : apts.practitionerId === 0 && apts.acceptedJobDate === null ? (
                <td>
                  <p className="overdue-text">Not Complete</p>
                </td>
              ) : apts.isCancelled === true ? (
                <td>
                  <p className="overdue-text">Cancelled</p>
                </td>
              ) : (
                apts.isAppointmentComplete === true && (
                  <td>
                    <p className="completed-text">Completed</p>
                  </td>
                )
              )}

              <td>
                {openActionModal !== "0" && openActionModal === index + 1 ? (
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenActionModal("0")}
                  >
                    <X size={14} color={"#202020"} />
                  </button>
                ) : (
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenActionModal(index + 1)}
                  >
                    <DotsThree size={20} color={"#202020"} />
                  </button>
                )}

                {/* below is the modal  */}
                {openActionModal === index + 1 ? (
                  <div className="schedule-table-actions-modal__wrapper">
                    <button className="actions__btns">View</button>
                    <br />
                    {apts.isCancelled === false && apts.isOpenJob === false ? (
                      <RemoveBtn
                        appointment={apts}
                        navigate={navigate}
                        fetchData={fetchData}
                      />
                    ) : (
                      ""
                    )}

                    <br />
                    {apts.isAppointmentComplete === true ||
                    apts.isCancelled === true ||
                    apts.isOpenJob === true ? (
                      <button
                        className="deleteAction"
                        onClick={(e) => handleDelete(e, apts.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </td>
              {/* <td>
                {apts.isCancelled === false ? (
                  <RemoveBtn
                    appointments={apts}
                    navigate={navigate}
                    fetchData={fetchData}
                  />
                ) : (
                  ""
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
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

  return (
    <>
      <h2 style={{ padding: "20px" }}>Schedules</h2>
      <div className="schedules-container__wrapper">
        {loading === true ? (
          <div style={{ position: "relative" }}>
            <CircleNotch size={32} className={"loading__icon"} />
          </div>
        ) : (
          <TableView
            appointments={appointments}
            navigate={navigate}
            fetchData={fetchData}
          />
        )}
      </div>
    </>
  );
};

// <div className="schedules-items__wrapper" key={apts.id}>
//   <div>
//     <p>
//       {apts.practitionerId === 0 ? "N/A" : apts.practitionerName}
//     </p>
//     <p>{apts.isOpenJob === true ? "Open Job" : "Direct Job"}</p>
//     <p>
//       {new Date(apts.preferredAppointmentDate).toLocaleDateString(
//         "en-nz"
//       )}
//     </p>

//     {/* below is for editing a pending appointment.. ?? */}

//     {/* {new Date(apts.preferredAppointmentDate) > new Date(today) ? (
//     <button>Remove</button>
//   ) : (
//     ""
//   )} */}

//     {apts.isCancelled === false ? (
//       <RemoveBtn
//         apts={apts}
//         navigate={navigate}
//         fetchData={fetchData}
//       />
//     ) : (
//       ""
//     )}
//   </div>
//   <div>
// {new Date(apts.preferredAppointmentDate) > new Date(today) &&
// apts.isCancelled === false ? (
//   <p className="pending-text">Pending</p>
// ) : (apts.practitionerId === 0 &&
//     apts.acceptedJobDate === null) ||
//   apts.isCancelled === true ? (
//   <p className="overdue-text">Not Complete</p>
// ) : (
//   <p className="completed-text">Completed</p>
// )}

//     {/* {apts.practitionerId === 0 && apts.acceptedJobDate === null ? (
//     <p className="overdue-text">Not Complete</p>
//   ) : new Date(apts.preferredAppointmentDate) >
//     new Date(today) ? (
//     <p className="completed-text">Pending</p>
//   ) : (
//     <p className="completed-text">Completed</p>
//   )} */}
//   </div>
// </div>

export default Schedules;
