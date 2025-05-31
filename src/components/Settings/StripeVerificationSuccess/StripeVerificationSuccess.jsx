import React, { useEffect } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UpdateStripeVerification } from "../../../assets/js/serverApi"; // Adjust the import path as necessary
import HauoraLogo from "../../../assets/img/HauoraLogo.png";

import "../../../styles/stripeverificationsuccessstyles.css";
const StripeVerificationSuccess = () => {
  const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    handleUpdateVerification();
  }, []);

  const handleUpdateVerification = async (retry = true) => {
    try {
      const response = await fetch(UpdateStripeVerification, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          StripeAccount: {
            PractitionerId: id, // Use the id from the URL query parameters
            AccountVerified: true,
          },
        }),
      });

      if (response.status === 302) {
        //302 is redirecting to sign in screen because refresh token and jwt are expired.
        console.warn("302 detected, redirecting...");
        // Redirect to the new path
        navigate("/");
        return; // Exit the function to prevent further execution
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleUpdateVerification(false);
      }

      if (!response.ok) {
        console.log(response);
        throw new Error(
          `Failed to update verification status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Verification updated successfully:", data);
    } catch (error) {
      console.error("Error updating verification:", error);
    }
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <img style={{ width: "300px" }} src={HauoraLogo} alt="Hauora logo" />
      </div>
      <div className="verification-success-container">
        <CheckCircle size={62} weight="fill" color="#f3f3f3" />
        <h3 style={{ color: "#f3f3f3" }}>Verification Complete</h3>
        <br />
        <p style={{ color: "#f3f3f3" }}>
          Your account verification details have been successfully submitted.
          Stripe is now reviewing the information provided. You’ll be notified
          once the verification process is complete
          <br /> <br /> You can now close this window and continue using the
          app. Thank you!
        </p>
      </div>
    </div>
  );
};

export default StripeVerificationSuccess;
