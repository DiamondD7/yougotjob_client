import React, { useEffect, useState } from "react";
import {
  CreatePayment,
  GetAnAppointment,
  GetPractitionerStripeId,
} from "../../assets/js/serverApi";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { X, CircleNotch } from "@phosphor-icons/react";

import "../../styles/paymentstyles.css";
const Checkout = ({ chosenAptId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  console.log(chosenAptId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/success-payment?id=${chosenAptId}`,
      },
    });

    if (error) {
      console.error(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6772e5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const Payment = ({
  chosenPayment,
  setPaymentClick,
  chosenAptId,
  chosenAptEmail,
}) => {
  const navigate = useNavigate();
  // Replace with your Stripe Publishable Key
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PKEY);
  const [clientSecret, setClientSecret] = useState("");
  const convertToCents = chosenPayment.total * 100;
  const [latestCharge, setLatestCharge] = useState([]);

  useEffect(() => {
    handleGetPractitionerId();
  }, []);

  //STEP 3. Create payment intent for customer/patient to pay the amount and for the practitioner to be paid using its(stripeID)
  const handleCreatePaymentIntent = (stripeId) => {
    fetch(CreatePayment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        StripeId: stripeId, //this is for the payout practitioner id
        Amount: convertToCents,
        ReceiptEmail: chosenAptEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleOpt(data.returnStatus.paymentIntent.clientSecret);
        setLatestCharge(data.returnStatus.paymentIntent);
      });
  };

  //STEP 2. Once practitionerId is acquired, then put the practitioner stripe account id so that the practitioner gets paid
  const handleGetPractitionerStripeId = async (id, retry = true) => {
    // fetch(`${GetPractitionerStripeId}/${id}`)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     handleCreatePaymentIntent(res.returnStatus.stripeId);
    //   });
    try {
      const response = await fetch(`${GetPractitionerStripeId}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.status === 302) {
        console.warn("301 detected, redirecting...");
        navigate("/");
        return;
      }

      if (response.status === 401 && retry) {
        console.warn("401 detected, retrying request...");
        return handleGetPractitionerStripeId(id, false);
      }

      if (!response.ok) {
        throw new Error(`HTTP ERROR: status ${response.status}`);
      }

      const data = await response.json();

      handleCreatePaymentIntent(data.returnStatus.stripeId);
    } catch (error) {
      console.error("Error fetching practitioner Stripe ID:", error);
    }
  };

  //STEP 1. find the practitionerId to get the stripeID
  const handleGetPractitionerId = () => {
    fetch(`${GetAnAppointment}/${chosenAptId}`)
      .then((res) => res.json())
      .then((res) => {
        handleGetPractitionerStripeId(
          res.returnStatus.data.practitionerId,
          true
        );
      });
  };

  const handleOpt = (clientSecret) => {
    setClientSecret({
      clientSecret,
      appearance: {
        theme: "stripe", // Default Stripe theme
        variables: {
          colorPrimary: "#6772e5",
          colorText: "#32325d",
          fontFamily: "Roboto, sans-serif",
          fontSizeBase: "16px",
          spacingUnit: "4px",
        },
        rules: {
          ".Label": {
            color: "#6772e5",
          },
        },
      },
    });
  };

  return (
    <div className="payment-stripe__wrapper">
      <button className="btnclear" onClick={() => setPaymentClick(false)}>
        <X size={20} color="#202020" />
      </button>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={clientSecret}>
          <Checkout chosenAptId={chosenAptId} />
        </Elements>
      ) : (
        <div className="display-loading-icon__wrapper">
          <CircleNotch size={45} color="#202020" className={"loading-icon"} />
        </div>
      )}
    </div>
  );
};

export default Payment;
