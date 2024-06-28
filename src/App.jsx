import { useEffect, useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import GeneralPractioner from "./components/HomeDepartments/GeneralPractioner";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
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
        {sessionStorage.getItem("id") !== 0 ? (
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
