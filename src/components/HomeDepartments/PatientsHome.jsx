import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Display from "../Display/Display";
import { GetAPatientDateTime } from "../../assets/js/serverApi";

import "../../styles/homestyles.css";
const PatientsHome = () => {
  const [displayed, setDisplayed] = useState("dashboard");
  const [dateSettings, setDateSettings] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [editChanges, setEditChanges] = useState(false);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetAPatientDateTime}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setDateSettings(res.returnStatus.data); //setting data of the user's date preference to use in the Nav component
        setLoadData(true); //setting to true when date settings data is loaded so that it wont compromised the moment() in the Nav to show the date/time
        setEditChanges(false); //setting edit change to false once the useEffect finishes running
      });
  }, [editChanges]);
  return (
    <>
      {loadData === true ? (
        <div className="main-display__wrapper">
          <>
            <Nav setDisplayed={setDisplayed} dateSettings={dateSettings} />
          </>
          <>
            <Display displayed={displayed} setEditChanges={setEditChanges} />{" "}
            {/*setEditChanges will change the time on the Nav from changing it in the Settings/Account*/}
          </>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PatientsHome;
