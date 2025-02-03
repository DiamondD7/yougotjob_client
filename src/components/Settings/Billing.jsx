import React, { useEffect, useState } from "react";
import {
  CreateStripeAccount,
  UpdateStripeAccount,
  GetaHealthPractitioner,
  GenerateOnboardingLink,
} from "../../assets/js/serverApi";
import { useNavigate } from "react-router-dom";
import { StripeLogo, CircleNotch } from "@phosphor-icons/react";

import "../../styles/billingstyles.css";
const Billing = () => {
  const navigate = useNavigate();
  const pracId = parseInt(sessionStorage.getItem("id"));
  const [user, setUser] = useState([]);
  const [stripeLoad, setStripeLoad] = useState(false);

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
        setStripeLoad(false);
        window.open(res.url, "_blank", "noreferrer");
      });
  };

  const handleCreateStripeAccount = async (e) => {
    e.preventDefault();
    setStripeLoad(true);
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
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Billing</h3>
      <p style={{ fontSize: "12px" }}>
        Make sure your details are correct, when linking your details to Stripe
      </p>
      <br />

      <button
        className="stripeLogo__btn"
        onClick={(e) => handleCreateStripeAccount(e)}
      >
        <StripeLogo
          className="stripeLogo"
          size={25}
          color="#f3f3f3"
          weight="fill"
        />
        {stripeLoad === false ? (
          <label style={{ color: "#f3f3f3", fontSize: "12px" }}>
            Link details on Stripe
          </label>
        ) : (
          <CircleNotch size={13} color="#f3f3f3" className={"stripeLoading"} />
        )}
      </button>
    </div>
  );
};

export default Billing;
