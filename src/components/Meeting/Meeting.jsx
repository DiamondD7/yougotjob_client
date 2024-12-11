import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ZoomOauth,
  ZoomUser,
  CreateZoomCookie,
  CreateMeeting,
} from "../../assets/js/serverApi";
import DatePicker from "react-datepicker";

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

  useEffect(() => {
    // Get the 'code' from the query parameters
    const code = searchParams.get("code");
    const cliendId = import.meta.env.VITE_ZOOM_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_ZOOM_CLIENT_SECRET;

    fetch(ZoomOauth, {
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
        console.log(res.returnStatus.data);
        const accessToken = res.returnStatus.data.accessToken;
        const refreshToken = res.returnStatus.data.refreshToken;

        handleCookies(accessToken, refreshToken);
        handleGetUser(res.returnStatus.data.accessToken);
      });
  }, [searchParams]);

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
        console.log(formatJSON.id);
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
        console.log("Created Cookies", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateZoomMeet = (e) => {
    e.preventDefault();
    console.log(zoomMeetingData);
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
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
    setZoomMeetingData({ ...zoomMeetingData, Date: dateFormat.toISOString() });
    setSelectedDateTime(date);
  };
  return (
    <div>
      <form onSubmit={handleCreateZoomMeet}>
        <input
          name="Topic"
          type="text"
          placeholder="Topic"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          name="Agenda"
          type="text"
          placeholder="Agenda"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          name="Duration"
          type="numerical"
          value={zoomMeetingData.Duration}
          onChange={(e) => handleInputChange(e)}
        />
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

        <button type="submit">Create Meeting</button>
      </form>
    </div>
  );
};

export default Meeting;
