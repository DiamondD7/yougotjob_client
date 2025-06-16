import { useEffect, useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import PractitionerHome from "./components/HomeDepartments/PractitionerHome";
import PatientsHome from "./components/HomeDepartments/PatientsHome";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Meeting from "./components/Meeting/Meeting";
import SuccessPayment from "./components/Stripe/Redirect/SuccessPayment";
import StripeVerificationSuccess from "./components/Settings/StripeVerificationSuccess/StripeVerificationSuccess";
import PrivacyLaws from "./components/AppLaws/PrivacyLaws";
import TermsLaws from "./components/AppLaws/TermsLaws";

function App() {
  const [currentRole, setCurrentRole] = useState(
    sessionStorage.getItem("role")
  ); //setting the sessionStorage initially for when refreshing the page.
  const [currentUser, setCurrentUser] = useState([]);

  const localData = (data) => {
    const userData = data.returnStatus.userDetails;
    setCurrentUser(data.returnStatus.userDetails);

    //if statement that checks whether this is the first time that the user logged and setting a session firstTime to a bool value.
    //this is to run a welcome to the app modal when the user logs in first time.
    if (userData.refreshToken === null) {
      sessionStorage.setItem("firstTime", "true");
    } else {
      sessionStorage.setItem("firstTime", "false");
    }

    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("id", userData.id);
    sessionStorage.setItem("role", userData.departmentRole);
    sessionStorage.setItem("isVerified", userData.isVerified);
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
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/success-payment" element={<SuccessPayment />} />
          <Route path="/privacy-policy" element={<PrivacyLaws />} />
          <Route path="/terms-of-use" element={<TermsLaws />} />
          <Route
            path="/stripe-verification-success"
            element={<StripeVerificationSuccess />}
          />
        </Routes>
        {currentRole === "Practitioner" ? (
          <Routes>
            <Route
              path="/home"
              element={<PractitionerHome currentUser={currentUser} />}
            />
          </Routes>
        ) : (
          ""
        )}
        {currentRole === "Patient" ? (
          <Routes>
            <Route
              path="/home"
              element={<PatientsHome currentUser={currentUser} />}
            />
          </Routes>
        ) : (
          ""
        )}
      </>
    </>
  );
}

export default App;
