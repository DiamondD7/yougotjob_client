import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { UpdatePaymentSuccess } from "../../../assets/js/serverApi";

import "../../../styles/successpaymentstyles.css";
const SuccessPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    if (id) {
      //if there is an id value
      fetch(UpdatePaymentSuccess, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    }
  }, []);

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/home"); // Replace '/target-page' with your destination path
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div>
      <div className="success-payment__wrapper">
        <CheckCircle size={62} weight="fill" color="#9dcd5a" />

        <p style={{ color: "rgba(0,0,0,0.3)", fontWeight: "bold" }}>
          Successful Payment
        </p>
        <br />
        <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.3)" }}>
          You will be redirected back to the home page shortly
        </p>
        <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.3)" }}>
          or click here to return to home page
        </p>

        <br />
        <br />
        <Link className="success-payment-btn" to="/home">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPayment;
