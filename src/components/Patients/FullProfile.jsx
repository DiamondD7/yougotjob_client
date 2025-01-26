import React, { useState, useEffect } from "react";
import { CaretRight, X, DownloadSimple } from "@phosphor-icons/react";
import {
  ID,
  GetPatient,
  GetPatientEmergencyContact,
  GetPatientPreviousApt,
} from "../../assets/js/serverApi";
import { useNavigate } from "react-router-dom";

const PatientCommentsHistory = ({ fullProfileData }) => {
  const test =
    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. DucimusLorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus ";
  return (
    <div className="patient-histories__wrapper">
      <h4>Comments</h4>
      <br />
      <div className="patient-commentsHistory__wrapper">
        <label>Dr. Manny Jones</label>
        <p>15/12/2024</p>
        <p>{test.substring(0, 150)}</p>
      </div>
    </div>
  );
};

const PatientBillingHistory = ({ prevApts }) => {
  const [loadAll, setLoadAll] = useState(false);
  const [prevAptsFilter, setPrevAptsFilter] = useState([]);

  useEffect(() => {
    if (loadAll === true) {
      setPrevAptsFilter(prevApts);
    } else {
      setPrevAptsFilter(prevApts.slice(0, 3));
    }
  }, [loadAll, prevApts]);
  return (
    <div className="patient-histories__wrapper">
      <h4>Billing History</h4>
      {prevAptsFilter.slice(0, 3).map((bill, index) => (
        <div className="patient-billinghistory__wrapper" key={bill.id}>
          <div>
            <label>${bill.appointmentPayments.total}</label>
            <p>20/12/2024</p>
          </div>
          <div>
            <p
              style={
                bill.appointmentPayments.isPaid === false
                  ? { color: "#d7c60f" }
                  : {}
              }
            >
              {bill.appointmentPayments.isPaid === false ? "Pending" : "Paid"}
            </p>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          className="patient-histories__btn"
          onClick={() => setLoadAll(!loadAll)}
        >
          {loadAll === true ? "Load less" : "Load more"}
        </button>
      </div>
    </div>
  );
};

const PatientAppointmentsHistory = ({ prevApts }) => {
  const [loadAll, setLoadAll] = useState(false);
  const [prevAptsFilter, setPrevAptsFilter] = useState([]);

  useEffect(() => {
    if (loadAll === true) {
      setPrevAptsFilter(prevApts);
    } else {
      setPrevAptsFilter(prevApts.slice(0, 3));
    }
  }, [loadAll, prevApts]);
  return (
    <div className="patient-histories__wrapper">
      <h4>Appointment History</h4>
      <div>
        <br />
        {prevAptsFilter.map((apt, index) => (
          <div
            className="patient-appointmentHistory-contents__wrapper"
            key={apt.id}
          >
            <label>{apt.appointmentAgenda}</label>
            <p>{apt.practitionerName}</p>
            <p>
              {new Date(apt.appointmentDateCompleted).toLocaleDateString(
                "en-nz"
              )}
            </p>
          </div>
        ))}

        <div style={{ textAlign: "center" }}>
          <button
            className="patient-histories__btn"
            onClick={() => setLoadAll(!loadAll)}
          >
            {loadAll === true ? "Load less" : "Load more"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PatientMedicalRecords = () => {
  return (
    <div>
      <div className="patient-medicalrecords__wrapper">
        <h4>Medical Records</h4>
        <div className="patient-table-container__wrapper">
          <table className="patient__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Condition</th>
                <th>Doctor</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>18/12/2024</td>
                <td>Type 2 Diabetic</td>
                <td>Dr. Manny Jones</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button className="btnclear">
                    <DownloadSimple size={18} color="#202020" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PatientVitals = ({ fullProfileData }) => {
  //to calculate BMI
  const bmi =
    Math.round(
      (fullProfileData?.width /
        (fullProfileData?.height * fullProfileData?.height)) *
        10000 *
        10
    ) / 10;
  return (
    <div style={{ display: "flex", gap: "100px", marginTop: "40px" }}>
      <div className="patientvitals-circle__wrapper">
        <p>Height: {fullProfileData?.height || 0} cm</p>
      </div>
      <div className="patientvitals-circle__wrapper">
        <p>Weight: {fullProfileData?.weight || 0} kg</p>
      </div>
      <div className="patientvitals-circle__wrapper">
        <p>BMI: {bmi || 0}</p>
      </div>
    </div>
  );
};

const PatientEmergencyContacts = ({ fullProfileData }) => {
  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    const handleFetchContacts = async (retry = true) => {
      try {
        const response = await fetch(
          `${GetPatientEmergencyContact}/${fullProfileData.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
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
          return handleFetchContacts(false); // Call with `retry` set to false
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        //console.log(res);
        setEmergencyContacts(res.returnStatus.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    handleFetchContacts();
  }, [fullProfileData.id]);

  return (
    <div>
      <h4>Emergency Contacts</h4>
      <div className="emergencycontacts__wrapper">
        {emergencyContacts.map((data, index) => (
          <div className="contact__wrapper" key={data.id}>
            <p style={{ fontWeight: "bold" }}>{data.contactName}</p>
            <p>{data.contactRelationship}</p>
            <br />
            <p>{data.contactMobile}</p>
            <p>{data.contactEmailAddress}</p>
          </div>
        ))}
        {/* <div className="contact__wrapper">
            <p style={{ fontWeight: "bold" }}>Freya</p>
            <p>Mother</p>
            <br />
            <p>0210230222256</p>
            <p>freys@gmail.com</p>
          </div>
          <div className="contact__wrapper">
            <p style={{ fontWeight: "bold" }}>Sigrun</p>
            <p>Aunt</p>
            <br />
            <p>02102321356</p>
            <p>valkqueen_2@gmail.com</p>
          </div> */}
      </div>
    </div>
  );
};

// const PatientDocuments = () => {
//   return (
//     <div>
//       <h4>Documents</h4>
//       <div className="patient-documents__wrapper">
//         <table className="patient__table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Type</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>12/12/2024</td>
//               <td>passport</td>
//               <td>.pdf</td>
//               <td>
//                 <button className="btnclear">
//                   <DownloadSimple size={18} color="#202020" />
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

const PatientDetails = ({ fullProfileData }) => {
  const none = "N/A";
  const registeredDate = new Date(
    fullProfileData.registeredOn
  ).toLocaleDateString("en-nz");

  const DOB = new Date(fullProfileData.dob).toLocaleDateString("en-nz");
  return (
    <div style={{ marginTop: "20px" }}>
      <label style={{ fontSize: "12px", color: "#9dcd5a" }}>NHI: </label>
      <label style={{ fontSize: "12px", color: "#9dcd5a", fontWeight: "bold" }}>
        {fullProfileData.nhi}
      </label>
      <div className="fullres-patient-details__wrapper">
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <label>Date of birth</label>
            <p>{DOB}</p>
          </div>
          <div>
            <label>Age</label>
            <p>{fullProfileData.age}</p>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Address</label>
          <p>{fullProfileData.homeAddress || none}</p>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <label>Contact number</label>
              <p>{fullProfileData.mobileNumber || none}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{fullProfileData.emailAddress}</p>
            </div>
            <div>
              <label>Insurance</label>
              <p>{fullProfileData?.insurance?.insuranceName || none}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Registered on</label>
          <p>{registeredDate}</p>
        </div>
      </div>
    </div>
  );
};

const FullProfile = ({ patientProfileId, setOpenFullProfile }) => {
  const navigate = useNavigate();
  const [fullProfileData, setFullProfileData] = useState([]);
  const [prevApts, setPrevApts] = useState([]);

  useEffect(() => {
    handleFetchPatient();
  }, []);

  const handleFetchPatient = async (retry = true) => {
    try {
      const response = await fetch(`${GetPatient}/${patientProfileId}`, {
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
        return handleFetchPatient(false); // Call with `retry` set to false
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFullProfileData(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  // fetch appointment history data

  useEffect(() => {
    fetch(`${GetPatientPreviousApt}/${patientProfileId}`)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setPrevApts(res.returnStatus.data);
      });
  }, []);
  return (
    <div style={{ margin: "10px 0 0 10px" }}>
      <button
        className="fullres-close__btn"
        onClick={() => setOpenFullProfile(false)}
      >
        <X size={20} />
      </button>
      <div className="fullres-route-name__wrapper">
        <h3>Patients</h3>
        <CaretRight size={15} color="#202020" />
        <h3 style={{ color: "rgba(0,0,0,0.5)" }}>{fullProfileData.fullName}</h3>
      </div>

      <div style={{ display: "flex", gap: "100px" }}>
        <div>
          <PatientDetails fullProfileData={fullProfileData} />
          {/* <br />
          <br />
          <PatientDocuments /> */}
          <br />
          <br />
          <PatientEmergencyContacts fullProfileData={fullProfileData} />
        </div>
        <div>
          <PatientVitals fullProfileData={fullProfileData} />
          <br />
          <br />
          <br />
          <br />

          <PatientMedicalRecords />
          <br />
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "20px",
            }}
          >
            <PatientAppointmentsHistory prevApts={prevApts} />

            <PatientBillingHistory prevApts={prevApts} />
            <PatientCommentsHistory fullProfileData={fullProfileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;
