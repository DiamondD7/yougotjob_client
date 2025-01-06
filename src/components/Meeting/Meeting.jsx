import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  GetAnAppointment,
  ZoomOauth,
  ZoomUser,
  CreateZoomCookie,
  CreateMeeting,
  AppointmentZoomLinkUpdate,
} from "../../assets/js/serverApi";
import { CircleNotch } from "@phosphor-icons/react";
import DatePicker from "react-datepicker";

import "../../styles/meetingstyles.css";
const MeetingAppointmentDetails = ({ patientData }) => {
  return (
    <div>
      <div
        style={{
          width: "800px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "300px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Practitioner Type</strong>
            </label>
            <label style={{ fontSize: "12px" }}>
              {patientData.healthPractitionerType}
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Practitioner Name</strong>
            </label>
            <label style={{ fontSize: "12px" }}>
              {patientData.practitionerName}
            </label>
          </div>
        </div>

        <div
          style={{
            width: "300px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Preferred Date</strong>
            </label>
            <label style={{ fontSize: "12px" }}>
              {new Date(
                patientData.preferredAppointmentDate
              ).toLocaleDateString("en-nz")}
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Preferred Time</strong>
            </label>
            <label style={{ fontSize: "12px" }}>
              {new Date(
                patientData.preferredAppointmentDate
              ).toLocaleTimeString("en-nz")}
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div style={{ paddingLeft: "10px" }}>
        <label style={{ fontSize: "12px" }}>
          <strong>Comments/Requests</strong>
        </label>
        <br />
        <textarea
          className="meeting-details__textarea"
          value={patientData.comments}
        ></textarea>
      </div>
    </div>
  );
};

const MeetingPatientDetails = ({ patientData }) => {
  return (
    <div>
      <h2>Details: Patient Information</h2>
      <p style={{ width: "800px", fontSize: "12px", marginTop: "10px" }}>
        This is all to know about your patient's information. Read and study
        your patient's comments/requests to be well informed when the meeting
        comes. Additionally, your patient will get notified via email after
        finalising the zoom meeting creation.
      </p>
      <br />
      <div
        style={{
          width: "800px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "300px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Name</strong>
            </label>
            <label style={{ fontSize: "12px" }}>{patientData.fullName}</label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>NHI</strong>
            </label>
            <label style={{ fontSize: "12px" }}>{patientData.nhi}</label>
          </div>
        </div>

        <div
          style={{
            width: "300px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Contact number</strong>
            </label>
            <label style={{ fontSize: "12px" }}>
              {patientData.contactNumber}
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "12px" }}>
              <strong>Email</strong>
            </label>
            <label style={{ fontSize: "12px" }}>
              {patientData.emailAddress}
            </label>
          </div>
        </div>
      </div>
      <br />
      <MeetingAppointmentDetails patientData={patientData} />
    </div>
  );
};

const Meeting = () => {
  const [searchParams] = useSearchParams();
  const [zoomMeetingData, setZoomMeetingData] = useState({
    HostId: 0,
    Topic: "",
    Agenda: "",
    Duration: 60,
    Date: null,
  });
  const [selectedDateTime, setSelectedDateTime] = useState();
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the 'code' from the query parameters
    const code = searchParams.get("code");
    const idquery = searchParams.get("id");
    const cliendId = import.meta.env.VITE_ZOOM_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_ZOOM_CLIENT_SECRET;

    fetch(`${ZoomOauth}?id=${idquery}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ClientId: cliendId,
        ClientSecret: clientSecret,
        Code: code,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const accessToken = res.returnStatus.data.accessToken;
        const refreshToken = res.returnStatus.data.refreshToken;

        handleCookies(accessToken, refreshToken);
        handleGetUser(res.returnStatus.data.accessToken);
        handleGetPatient(idquery);
      });
  }, [searchParams]);

  const handleGetPatient = (id) => {
    fetch(`${GetAnAppointment}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setPatientData(res.returnStatus.data);
      });
  };

  const handleGetUser = (accessToken) => {
    fetch(ZoomUser, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const formatJSON = JSON.parse(res.returnStatus.data);
        //console.log(formatJSON.id);
        setZoomMeetingData({
          ...zoomMeetingData,
          HostId: formatJSON.id,
        });
      });
  };

  const handleCookies = (accessToken, refreshToken) => {
    fetch(CreateZoomCookie, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        AccessToken: accessToken,
        RefreshToken: refreshToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log("Created Cookies", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateZoomMeet = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(CreateMeeting, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        HostId: zoomMeetingData.HostId,
        Topic: zoomMeetingData.Topic,
        Agenda: zoomMeetingData.Agenda,
        Date: zoomMeetingData.Date,
        Duration: zoomMeetingData.Duration,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const dataFormatted = JSON.parse(res.returnStatus.data);
        console.log(dataFormatted);
        handleUpdateAppointmentLinks(patientData, dataFormatted);
      });
  };

  const handleUpdateAppointmentLinks = (patientData, zoomData) => {
    fetch(AppointmentZoomLinkUpdate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: patientData.id,
        Duration: zoomData.duration,
        AppointmentAgenda: zoomData.agenda,
        PractitionerName: patientData.practitionerName,
        EmailAddress: patientData.emailAddress,
        PractitionerEmail: zoomData.host_email,
        JoinZoomLink: zoomData.join_url,
        StartZoomLink: zoomData.start_url,
        PreferredAppointmentDate: zoomData.start_time,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        window.close();
      });
  };

  const getMinTime = () => {
    const minTime = new Date();
    minTime.setHours(8, 0, 0, 0);
    return minTime;
  };

  const getMaxTime = () => {
    const maxTime = new Date();
    maxTime.setHours(23, 0, 0, 0);
    return maxTime;
  };

  const handleInputChange = (e) => {
    setZoomMeetingData({ ...zoomMeetingData, [e.target.name]: e.target.value });
  };

  const handleDateTimeChange = (date) => {
    const dateFormat = new Date(date);
    setZoomMeetingData({
      ...zoomMeetingData,
      Date: dateFormat.toISOString(),
    });
    setSelectedDateTime(date);
  };
  return (
    <>
      {loading === true ? <div className="overlay"></div> : ""}
      {loading === true ? (
        <div className="meeting-loading-icon__wrapper">
          <CircleNotch size={45} color="#f3f3f3" className={"loading-icon"} />
        </div>
      ) : (
        ""
      )}
      <div style={{ padding: "50px", display: "flex", gap: "200px" }}>
        <div>
          <h2>Create: Zoom Meeting</h2>
          <p style={{ width: "600px", fontSize: "12px", marginTop: "10px" }}>
            After creating a meeting, you and the patient will get an email
            reminder about the details of the zoom meeting. For more information
            of the meeting click this link:{" "}
            <a
              href="https://www.zoom.us/meeting#/upcoming"
              target="_blank"
              rel="noreferrer"
            >
              https://www.zoom.us/meeting#/upcoming
            </a>{" "}
            It will refer you to your Zoom account, where you can update or
            delete an upcoming zoom meeting
          </p>
          <br />
          <form
            className="form-meeting__wrapper"
            style={{ width: "400px", padding: "10px" }}
            onSubmit={handleCreateZoomMeet}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label>Topic</label>
              <input
                name="Topic"
                type="text"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <label>Agenda</label>
              <input
                name="Agenda"
                type="text"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <label>Duration (minutes)</label>
              <input
                name="Duration"
                type="numerical"
                value={zoomMeetingData.Duration}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <label>Date/Time</label>
              <DatePicker
                className="datePicker"
                dateFormat="dd/MM/YYYY - hh:mm a"
                selected={selectedDateTime}
                onChange={(date) => handleDateTimeChange(date)}
                minDate={new Date()}
                showTimeSelect
                timeIntervals={30}
                timeFormat="hh:mm a"
                minTime={getMinTime()}
                maxTime={getMaxTime()}
              />
            </div>
            <p style={{ fontSize: "12px", marginTop: "10px" }}>
              *Make sure to set the date to your Patient's preferred date. You
              can set the time which you are available.
            </p>

            <button type="submit" className="form-meeting__btn">
              Create Meeting
            </button>
          </form>
        </div>

        <MeetingPatientDetails patientData={patientData} />
      </div>
    </>
  );
};

export default Meeting;
