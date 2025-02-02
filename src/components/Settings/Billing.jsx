import React, { useEffect, useState } from "react";
import {
  CreateStripeAccount,
  UpdateStripeAccount,
  GetaHealthPractitioner,
  GenerateOnboardingLink,
} from "../../assets/js/serverApi";
import { useNavigate } from "react-router-dom";

import "../../styles/billingstyles.css";
const Billing = () => {
  const navigate = useNavigate();
  const pracId = parseInt(sessionStorage.getItem("id"));
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (retry = true) => {
    try {
      const response = await fetch(`${GetaHealthPractitioner}/${pracId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Ensure cookies are included in the request if necessary
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
        return fetchData(false); // Call with `retry` set to false
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const handleUpdateStripeAccount = async (stripeId) => {
    await fetch(UpdateStripeAccount, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        StripeAccount: {
          PractitionerId: pracId,
          StripeAccountId: stripeId,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const handleGenerateOnboardingLink = (stripeId) => {
    fetch(GenerateOnboardingLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(stripeId),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  const handleCreateStripeAccount = async (e) => {
    e.preventDefault();
    await fetch(CreateStripeAccount, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        FirstName: user.givenName,
        LastName: user.familyName,
        PractitionerEmail: user.emailAddress,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        handleUpdateStripeAccount(res.stripeAccountId);
        handleGenerateOnboardingLink(res.stripeAccountId);
      });
  };
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>
        Billing Information
      </h3>
      <div className="settings-billing__wrapper">
        <p className="setting-billing-label__text">
          Make sure you update your billing details and address
        </p>
        <br />

        <div style={{ display: "flex", gap: "80px" }}>
          <div>
            <p className="setting-billing-label__text">Name on card</p>
            <p className="setting-billing-name__text">Mahichit Sharma</p>
            <br />
            <div style={{ display: "flex", gap: "50px" }}>
              <div>
                <p className="setting-billing-label__text">Card number</p>
                <p className="setting-billing-name__text">
                  &#x2022;&#x2022;&#x2022;&#x2022;
                  &#x2022;&#x2022;&#x2022;&#x2022;
                  &#x2022;&#x2022;&#x2022;&#x2022; 1234
                </p>
              </div>
              <div>
                <p className="setting-billing-label__text">CVV</p>
                <p className="setting-billing-name__text">
                  &#x2022;&#x2022;&#x2022;
                </p>
              </div>
              <div>
                <p className="setting-billing-label__text">Expiry</p>
                <p className="setting-billing-name__text">05/30</p>
              </div>
            </div>
          </div>
          <div>
            <p className="setting-billing-label__text">Billing address</p>
            <p className="setting-billing-name__text">
              1/99 Henderson Drive <br /> 2020 Auckland <br /> New Zealand
            </p>
          </div>
        </div>
      </div>
      <button onClick={(e) => handleCreateStripeAccount(e)}>
        Link details on Stripe
      </button>
    </div>
  );
};

export default Billing;
