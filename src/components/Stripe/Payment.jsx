import React, { useEffect, useState } from "react";
import { CreatePayment } from "../../assets/js/serverApi";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { X, CircleNotch } from "@phosphor-icons/react";

import "../../styles/paymentstyles.css";
const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
        return_url: "http://127.0.0.1:5173/success-payment",
      },
    });

    if (error) {
      console.error(error.message);
    }

    setLoading(false);
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

const Payment = ({ chosenPayment, setPaymentClick }) => {
  // Replace with your Stripe Publishable Key
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PKEY);
  const [clientSecret, setClientSecret] = useState("");
  const convertToCents = chosenPayment.total * 100;

  useEffect(() => {
    fetch(CreatePayment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Amount: convertToCents,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleOpt(data.returnStatus.paymentIntent.clientSecret);
      });
  }, []);

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
          <Checkout />
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
