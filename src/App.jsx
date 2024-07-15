import { useEffect, useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import GeneralPractioner from "./components/HomeDepartments/GeneralPractioner";
import PatientsHome from "./components/HomeDepartments/PatientsHome";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  const [currentRole, setCurrentRole] = useState(
    sessionStorage.getItem("role")
  ); //setting the sessionStorage initially for when refreshing the page.

  const localData = (data) => {
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("id", data.returnStatus.userDetails.id);
    sessionStorage.setItem("role", data.returnStatus.userDetails.role);
    handleRoute(); //calling this when a user logs in
  };

  const handleRoute = () => {
    setCurrentRole(sessionStorage.getItem("role")); //setting this for the first time
  };

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<SignIn localData={localData} />} />
        </Routes>
        {currentRole === "Practitioner" ? (
          <Routes>
            <Route path="/home" element={<GeneralPractioner />} />
          </Routes>
        ) : (
          ""
        )}
        {currentRole === "Patient" ? (
          <Routes>
            <Route path="/home" element={<PatientsHome />} />
          </Routes>
        ) : (
          ""
        )}
      </>
    </>
  );
}

export default App;
