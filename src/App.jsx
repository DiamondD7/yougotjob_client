import Home from "./components/Home";
import SignIn from "./components/SignIn/SignIn";
import Receptionist from "./components/HomeDepartments/Receptionist";
import GeneralPractioner from "./components/HomeDepartments/GeneralPractioner";
import PatientsHome from "./components/HomeDepartments/PatientsHome";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const fakeUser = {
    id: 55,
    picture:
      "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    nhi: "NHNX8438",
    firstName: "Henry",
    lastName: "Tood",
    nationality: "Indian",
    dob: "28 Jan 1998",
    age: "25",
    height: "160",
    weight: "60",
    email: "henry@gmail.com",
    role: "General Practitioner",
  };

  let fakeRole;
  if (fakeUser.role === "Receptionist") {
    fakeRole = "Receptionist";
  } else if (fakeUser.role === "General Practitioner") {
    fakeRole = "General Practitioner";
  } else {
    fakeRole = "Patients";
  }

  const [userLogged, setUserLogged] = useState(false);
  const [userLoggedData, setUserLoggedData] = useState([]);

  const localData = (data) => {
    sessionStorage.setItem("auth", true);
    setUserLoggedData(data.returnStatus.userDetails);
  };

  console.log(userLoggedData);

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<SignIn localData={localData} />} />

          {sessionStorage.getItem("auth") === "true" ? (
            <Route
              path="/home"
              element={
                <GeneralPractioner
                  userLoggedData={userLoggedData}
                  setUserLoggedData={setUserLoggedData}
                />
              }
            />
          ) : (
            ""
          )}
        </Routes>
      </>
    </>
  );
}

export default App;
