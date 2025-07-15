import React, { useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import emailjs from "@emailjs/browser";

import "../../styles/feedbackstyles.css";
const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [showRequestSuccess, setShowRequestSuccess] = useState(false);
  const [userParams, setUserParams] = useState({
    name: "",
    email: "",
    message: "",
    feedbackType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    const templateParams = {
      from_name: userParams.name,
      from_email: userParams.email,
      message: userParams.message,
      feedback_type: userParams.feedbackType,
    };

    try {
      setLoading(true);
      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (response) => {
          //console.log("Sent successfully:", response);

          if (response.status === 200) {
            setShowRequestSuccess(true);
            setTimeout(() => {
              setShowRequestSuccess(false);
            }, 5000); // Hide the success message after 3 seconds

            setUserParams({
              name: "",
              email: "",
              message: "",
              feedbackType: "",
            }); // Reset form fields
            setLoading(false);
          } else {
            console.error("Failed to send email:", response);
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error sending email:", error);
          alert(
            "There was an error sending your subscription. Please try again."
          );
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };
  return (
    <>
      {showRequestSuccess && (
        <div className="success__wrapper">
          <p>Submission successful</p>
        </div>
      )}

      {loading && (
        <div className="display-loading-icon__wrapper">
          <CircleNotch size={45} color="#202020" className={"loading-icon"} />
        </div>
      )}
      <div className="feedback-container__wrapper">
        <div className="feedback-header__wrapper">
          <h4 style={{ color: "#f3f3f3" }}>We'd love your feedback!</h4>
          <p style={{ fontSize: "12px", color: "#f3f3f3", paddingTop: "10px" }}>
            Share your thoughts, report bugs, or help us improve the app.
            <br /> Let us know in the form below.
          </p>
        </div>

        <form className="feedback-form__wrapper" onSubmit={handleSubmit}>
          <label>Feedback type</label>
          <br />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <div>
              <input
                type="radio"
                name="feedbackType"
                value="Bugs"
                checked={userParams.feedbackType === "Bugs"}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <span>Bugs</span>
            </div>
            <div>
              <input
                type="radio"
                name="feedbackType"
                value="Suggestions"
                checked={userParams.feedbackType === "Suggestions"}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <span>Suggestions</span>
            </div>
            <div>
              <input
                type="radio"
                name="feedbackType"
                value="Comments"
                checked={userParams.feedbackType === "Comments"}
                onChange={(e) => handleInputChange(e)}
              />{" "}
              <span>Comments</span>
            </div>
          </div>
          <br />
          <br />

          <div>
            <label>Describe it below</label>
            <br />
            <textarea
              name="message"
              value={userParams.message}
              className="feedback-form__textarea"
              onChange={(e) => handleInputChange(e)}
            ></textarea>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>Name</label>
            <br />
            <input
              className="feedback-form__input"
              name="name"
              type="text"
              value={userParams.name}
              placeholder="Enter your name"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div style={{ marginTop: "5px" }}>
            <label>Email</label>
            <br />
            <input
              className="feedback-form__input"
              name="email"
              type="text"
              value={userParams.email}
              placeholder="Enter a valid email address"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <button className="feedback-form-submit__btn" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;
