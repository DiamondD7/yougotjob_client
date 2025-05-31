import React, { useEffect, useState } from "react";
import {
  CreateStripeAccount,
  UpdateStripeAccount,
  GetaHealthPractitioner,
  GenerateOnboardingLink,
  GetPractitionerStripeId,
} from "../../assets/js/serverApi";
import { useNavigate } from "react-router-dom";
import { StripeLogo, CircleNotch } from "@phosphor-icons/react";

import "../../styles/billingstyles.css";
const Billing = () => {
  const navigate = useNavigate();
  const pracId = parseInt(sessionStorage.getItem("id"));
  const [user, setUser] = useState([]);
  const [stripeLoad, setStripeLoad] = useState(false);

  const [stripeId, setStripeId] = useState(null);
  const [isStripeVerified, setIsStripeVerified] = useState(false);
  const [stripeUrl, setStripeUrl] = useState("");
  const [stripeUrlCreated, setStripeUrlCreated] = useState(null);
  const [stripeUrlExpiry, setStripeUrlExpiry] = useState(null);
  const [isStripeUrlExpired, setIsStripeUrlExpired] = useState(false);

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
      handleGetStripeId(pracId);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const handleGetStripeId = async (pracId) => {
    try {
      const response = await fetch(`${GetPractitionerStripeId}/${pracId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.status === 302) {
        //302 is redirecting to sign in screen because refresh token and jwt are expired.
        console.warn("302 detected, redirecting...");
        // Redirect to the new path
        navigate("/");
        return; // Exit the function to prevent further execution
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Stripe URL:", data.returnStatus.stripeDetails);

      setStripeId(data.returnStatus.stripeDetails.stripeAccountId);
      setStripeUrl(data.returnStatus.stripeDetails.stripeUrlVerification);
      setIsStripeVerified(data.returnStatus.stripeDetails.accountVerified);
      setStripeUrlExpiry(data.returnStatus.stripeDetails.urlExpiresAt);
      setStripeUrlCreated(data.returnStatus.stripeDetails.urlCreatedAt);

      const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
      const expiry = new Date(
        data.returnStatus.stripeDetails.urlExpiresAt
      ).toLocaleString("en-US");

      console.log("now > expiry?", now > expiry); //DELETE WHEN DONE

      if ((now > expiry || now === expiry) && isStripeVerified === false) {
        setIsStripeUrlExpired(true);
      }
    } catch (error) {
      console.log("Error fetching Stripe ID:", error.message);
    }
  };

  const handleUpdateStripeAccount = async (
    stripeId,
    url,
    expiry,
    createdAt,
    retry = true
  ) => {
    try {
      const response = await fetch(UpdateStripeAccount, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          StripeAccount: {
            PractitionerId: pracId,
            StripeAccountId: stripeId,
            StripeUrlVerification: url,
            UrlCreatedAt: createdAt,
            UrlExpiresAt: expiry,
          },
        }),
        credentials: "include", // Ensure cookies are included in the request if necessary
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
        return handleUpdateStripeAccount(
          stripeId,
          url,
          expiry,
          createdAt,
          false
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStripeLoad(false);
    } catch (error) {
      console.log("Error updating Stripe account:", error.message);
    }
  };

  const handleGenerateOnboardingLink = (stripeId) => {
    fetch(`${GenerateOnboardingLink}?userId=${pracId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(stripeId),
    })
      .then((res) => res.json())
      .then((res) => {
        setStripeUrl(res.url);
        handleUpdateStripeAccount(
          stripeId,
          res.url,
          res.expiry,
          res.createdAt,
          true
        );
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
        handleGenerateOnboardingLink(res.stripeAccountId);
      });
  };

  const handleStripeUrlOpen = (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString("en-US", { timeZone: "UTC" });
    const expiry = new Date(stripeUrlExpiry).toLocaleString("en-US");

    //console.log("is it expired?", now > expiry || now === expiry);
    if ((now > expiry || now === expiry) && isStripeVerified === false) {
      setIsStripeUrlExpired(true);
    } else {
      window.open(stripeUrl, "_blank", "noopener,noreferrer"); //IT WORKS BUT ONLY FOR A PERIOD OF TIME COZ OF THE LINK EXPIRATION (3mins)
    }
  };

  const handleGenerateOnboardLinkAgain = (e, stripeId) => {
    e.preventDefault();
    handleGenerateOnboardingLink(stripeId);
  };

  return (
    <div>
      <>
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Billing</h3>
        <p style={{ fontSize: "12px" }}>
          Make sure your details are correct, when linking your details to
          Stripe
        </p>
        <br />

        <button
          className={`stripeLogo__btn ${
            stripeId !== null ? "stripeLinked" : ""
          }`}
          onClick={(e) => handleCreateStripeAccount(e)}
          disabled={stripeId === null ? false : true}
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
            <CircleNotch
              size={13}
              color="#f3f3f3"
              className={"stripeLoading"}
            />
          )}
        </button>
        {stripeId !== null && (
          <label style={{ fontSize: "12px" }}>
            You already linked your account with Stripe
          </label>
        )}
      </>

      {isStripeVerified === false && stripeId !== null ? (
        <div className="stripeUrl__wrapper">
          <h3>Stripe: Complete Your Stripe Account</h3>
          <p style={{ fontSize: "12px", marginTop: "10px" }}>
            To receive payments and access the full features of our platform,
            please complete your Stripe account setup. Click the button below to
            finish the process securely through Stripe.
          </p>
          <br />
          <br />
          {isStripeUrlExpired === true ? (
            <p
              style={{
                fontSize: "12px",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              Expired stripe link. Please generate a new link to complete your
              Stripe account setup.
            </p>
          ) : (
            ""
          )}
          <br />
          {isStripeUrlExpired === false ? (
            <button
              className="stripeLogo__btn"
              onClick={(e) => handleStripeUrlOpen(e)}
            >
              Complete stripe account
            </button>
          ) : (
            <button
              className="stripeLogo__btn"
              onClick={(e) => handleGenerateOnboardLinkAgain(e, stripeId)}
            >
              Generate Stripe Onboarding Link
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Billing;
