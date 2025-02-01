import React from "react";

import "../../styles/aboutusstyles.css";
const Aboutus = () => {
  return (
    <div>
      <div className="aboutus-container__wrapper">
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>About us</h3>
        <div className="aboutus-content__wrapper">
          <p className="aboutus-content__text">
            At <strong>Hauora</strong>, we believe that healthcare should be
            accessible, seamless, and efficient. Our platform connects patients
            with trusted healthcare professionals, making it easier to book
            appointments, receive virtual consultations, and manage medical
            records—all in one place.
          </p>
        </div>
        <br />
        <br />
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Our story</h3>
        <div className="aboutus-content__wrapper">
          <p className="aboutus-content__text">
            <strong>Hauora</strong> was founded with a simple yet powerful
            vision: to bridge the gap between patients and healthcare
            professionals through technology. Recognizing the challenges of long
            wait times, inaccessible medical records, and inefficient
            communication in healthcare, we set out to create a solution that
            makes healthcare more convenient and patient-centered. Driven by
            innovation and a passion for improving healthcare accessibility, our
            team built a platform that empowers both patients and professionals.
            From secure video consultations to streamlined appointment
            management, we are committed to transforming how healthcare services
            are delivered.
          </p>
        </div>
        <br />
        <br />
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>What we do</h3>
        <div className="aboutus-content__wrapper">
          <p className="aboutus-content__text">
            Whether you need a quick diagnosis via video call or a face-to-face
            appointment, our platform ensures that you get the right care at the
            right time. Patients can track their appointment history, access
            personal health records, and communicate with healthcare providers,
            while professionals can efficiently manage their schedules, view
            patient details, and collaborate through secure messaging. At{" "}
            <strong>Hauora</strong>, we are dedicated to making healthcare more
            connected, efficient, and patient-focused.{" "}
            <strong>Your health, your way—simplified.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
