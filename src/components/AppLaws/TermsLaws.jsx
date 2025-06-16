import React from "react";

const TermsLaws = () => {
  return (
    <div style={{ padding: "50px" }} className="privacy-container__wrapper">
      <h3 style={{ color: "#9dcd5a" }}>Terms of Use – Hauora Limited</h3>
      <div>
        <p>Effective Date: 22/06/2025</p>
        <p>Last Updated: 22/06/2025</p>
        <p>
          Welcome to Hauora Limited (“we”, “us”, “our”, or “Hauora”). These
          Terms of Use (“Terms”) govern your access to and use of the Hauora
          platform, including any content, features, and services provided
          through our website and application (collectively, the “Platform”). By
          registering for and using Hauora, you agree to be bound by these
          Terms. If you do not agree, you must not use the Platform.
        </p>
      </div>

      <br />
      <div>
        <h4>1. Eligibility</h4>
        <p>You must:</p>
        <ul className="ul-lists__wrapper">
          <li>Be at least 18 years old;</li>
          <li>Reside in New Zealand;</li>
          <li>Provide accurate and truthful information when registering;</li>
          <li>Only use the Platform for lawful healthcare-related purposes.</li>
        </ul>
      </div>
      <br />
      <div>
        <h4>2. Our Services</h4>
        <p>
          Hauora connects patients with independent, qualified New
          Zealand-registered healthcare professionals (e.g. General
          Practitioners) for virtual consultations via Zoom.
        </p>
        <p>We facilitate:</p>
        <ul className="ul-lists__wrapper">
          <li>Appointment scheduling;</li>
          <li>Secure messaging;</li>
          <li>Video consultations;</li>
          <li>Payment processing via Stripe;</li>
          <li>Access to records generated from consultations.</li>
        </ul>
        <p>
          We do not store or retrieve your full medical history unless provided
          during the consultation.
        </p>
      </div>

      <br />
      <div>
        <h4>3. Your Responsibilities</h4>
        <p>You agree to:</p>
        <ul className="ul-lists__wrapper">
          <li>Keep your login credentials secure;</li>
          <li>Provide accurate and up-to-date information;</li>
          <li>Use the Platform respectfully and lawfully;</li>
          <li>Not impersonate others or provide false medical information;</li>
          <li>Not record or distribute sessions without consent.</li>
        </ul>
        <p>
          You must not misuse or interfere with the Platform (e.g. hack, scrape,
          reverse-engineer, or disrupt).
        </p>
      </div>

      <br />
      <div>
        <h4>4. Health Disclaimers</h4>
        <ul className="ul-lists__wrapper">
          <li>
            Hauora is not an emergency service. For emergencies, call 111 in New
            Zealand.
          </li>
          <li>
            The healthcare practitioners on Hauora are independent contractors,
            not employees of Hauora Limited.
          </li>
          <li>
            All diagnoses and advice are provided solely by the healthcare
            professional during your appointment.
          </li>
          <li>
            We do not guarantee a particular outcome or diagnosis from any
            consultation.
          </li>
        </ul>
      </div>

      <br />
      <div>
        <h4>5. Payments & Fees</h4>
        <ul className="ul-lists__wrapper">
          <li>
            Fees for consultations are clearly stated at the time of booking.
          </li>
          <li>Payments are processed securely via Stripe.</li>
          <li>
            You agree to pay all applicable charges and authorise us (via
            Stripe) to process them.
          </li>
          <li>Hauora does not store your credit card details.</li>
        </ul>
        <p>
          Refunds are subject to our cancellation and refund policy [Insert Link
          if applicable].
        </p>
      </div>

      <br />
      <div>
        <h4>6. Privacy</h4>
        <p>
          Your personal and health information is handled in accordance with our{" "}
          <strong>Privacy Policy</strong>. By using the Platform, you consent to
          the collection, use, and disclosure of your data as described in that
          policy.
        </p>
      </div>

      <br />
      <div>
        <h4>7. Account Termination</h4>
        <p>
          We reserve the right to suspend or terminate your access to the
          Platform at any time, with or without notice, if you breach these
          Terms or engage in behavior harmful to the Platform or others.
        </p>
        <p>
          You may close your account by contacting us at{" "}
          <strong>hauora.nz.health@gmail.com</strong>.
        </p>
      </div>

      <br />
      <div>
        <h4>8. Intellectual Property</h4>
        <p>
          All content, branding, and materials on the Platform (except health
          data) are owned by Hauora Limited or its licensors. You may not copy,
          reproduce, distribute, or exploit them without our prior written
          consent.
        </p>
      </div>

      <br />
      <div>
        <h4>9. Limitation of Liability</h4>
        <p>To the maximum extent permitted by New Zealand law:</p>
        <ul className="ul-lists__wrapper">
          <li>
            Hauora is not liable for any indirect, incidental, or consequential
            damages.
          </li>
          <li>
            Our liability is limited to the amount paid by you (if any) for the
            services in the 3 months prior to the claim.
          </li>
          <li>
            We are not liable for delays, failures, or issues caused by third
            parties (e.g. Stripe, Zoom, internet service providers).
          </li>
        </ul>
      </div>

      <br />
      <div>
        <h4>10. Third-Party Services</h4>
        <p>We integrate with services such as:</p>
        <ul className="ul-lists__wrapper">
          <li>Zoom (for video consultations);</li>
          <li>Stripe (for payment processing).</li>
        </ul>
        <p>
          By using Hauora, you also agree to comply with their terms and privacy
          policies.
        </p>
      </div>
      <br />
      <div>
        <h4>11. Modifications</h4>

        <p>
          We may revise these Terms at any time. If we do, we’ll notify users by
          email or via the Platform. Continued use after updates means you
          accept the new terms.
        </p>
      </div>
      <br />
      <div>
        <h4>12. Governing Law</h4>

        <p>
          These Terms are governed by the laws of New Zealand. Any disputes will
          be resolved by the New Zealand courts.
        </p>
      </div>
      <br />
      <div>
        <h4>13. Contact</h4>

        <p>
          For any questions about these Terms, please contact us at:{" "}
          <strong>hauora.nz.health@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default TermsLaws;
