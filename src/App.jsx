import Home from "./components/Home";
import SignIn from "./components/SignIn/SignIn";
import Receptionist from "./components/HomeDepartments/Receptionist";
import GeneralPractioner from "./components/HomeDepartments/GeneralPractioner";
import PatientsHome from "./components/HomeDepartments/PatientsHome";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [userLoggedData, setUserLoggedData] = useState([]);

  const localData = (data) => {
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("id", data.returnStatus.userDetails.id);
  };

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<SignIn localData={localData} />} />
        </Routes>
        {sessionStorage.getItem("auth") !== "true" ? (
          <Routes>
            <Route path="/home" element={<GeneralPractioner />} />
          </Routes>
        ) : (
          ""
        )}
      </>
    </>
  );
}

export default App;
