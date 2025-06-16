import React from "react";

const PrivacyLaws = () => {
  return (
    <div style={{ padding: "50px" }} className="privacy-container__wrapper">
      <h3 style={{ color: "#9dcd5a" }}>Privacy Policy for Hauora Limited</h3>
      <div>
        <p>
          Effective Date: <strong>22/06/2025</strong>
        </p>
        <p>
          {" "}
          Last Updated: <strong>22/06/2025</strong>
        </p>
        <br />
        <p>
          Hauora Limited (“Hauora”, “we”, “our”, “us”) is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and protect your personal information when you use our
          telemedicine platform, accessible to New Zealand-based patients and
          healthcare practitioners.
        </p>
      </div>
      <br />
      <div>
        <h4>1. Who we are</h4>
        <p>
          Hauora Limited is a New Zealand-registered company offering telehealth
          consultations between patients and qualified health practitioners
          (e.g. General Practitioners) contracted through our platform.
        </p>
      </div>
      <br />
      <div>
        <h4>2. Information We Collect</h4>
        <p>
          We collect and process the following information to provide our
          services:
        </p>

        <ul className="ul-lists__wrapper">
          <li>
            Personal Identification Data: Full name, email address, mobile
            number, and residential address.
          </li>
          <li>
            Health-Related Information: Notes or records from teleconsultations
            conducted via our Platform.
          </li>
          <li>Video Data: Recorded or unrecorded video sessions (via Zoom).</li>
          <li>
            Payment Information: Managed securely through our payment partner,
            Stripe.
          </li>
          <li>
            Login Credentials: Passwords (hashed), or Google sign-in data.
          </li>
          <li>
            Location Data: Your provided address is used for eligibility and
            care delivery purposes.
          </li>
          <li>
            Authentication Data: Session tokens, two-factor authentication
            metadata (e.g., OTP validation).
          </li>
        </ul>
        <p>
          We do not collect your full medical history or National Health Index
          (NHI) number unless this becomes necessary in a future iteration of
          the platform and is consented to by the user.
        </p>
      </div>

      <br />
      <div>
        <h4>3. How We Collect It</h4>
        <ul className="ul-lists__wrapper">
          <li>When you register or log in (including via Google),</li>
          <li>When you book or attend an appointment,</li>
          <li>
            When you update your profile or communicate with a health
            practitioner,
          </li>
          <li>When payments are processed through Stripe.</li>
        </ul>
        <p>We do not currently collect IP addresses or browser metadata.</p>
      </div>

      <br />
      <div>
        <h4>4. Why We Collect Your Data</h4>
        <p>We collect and use your information for the following purposes:</p>
        <ul className="ul-lists__wrapper">
          <li>To provide telemedicine consultation services;</li>
          <li>To match you with health practitioners;</li>
          <li>To process and manage payments;</li>
          <li>To improve the quality of our services and user experience;</li>
          <li>To ensure security and fraud prevention;</li>
          <li>To analyse aggregated usage trends;</li>
          <li>
            To communicate with you regarding platform updates, offers, or news.
          </li>
        </ul>
      </div>

      <br />
      <div>
        <h4>5. Lawful Basis for Processing</h4>
        <p>
          Under the <strong>Privacy Act 2020</strong>, we collect and process
          your data with your consent and in connection with the provision of
          healthcare services you request.
        </p>
      </div>

      <br />
      <div>
        <h4>6. Data Sharing & Disclosure</h4>
        <p>
          We do not currently share your personal data with any third parties
          except:
        </p>
        <ul className="ul-lists__wrapper">
          <li>
            With the contracted health practitioner involved in your care;
          </li>
          <li>
            With Stripe (for payments) and Zoom (for consultations), in
            accordance with their own privacy policies.
          </li>
        </ul>
        <p>
          In the future, we may share data with external healthcare providers,
          pharmacies, or government agencies, but only with your explicit
          consent or where legally required.
        </p>
      </div>

      <br />
      <div>
        <h4>7. Your Rights</h4>
        <p>You have the right to:</p>
        <ul className="ul-lists__wrapper">
          <li>Request access to your personal information;</li>
          <li>Request correction of your personal information;</li>
          <li>Withdraw consent where processing is based on consent;</li>
          <li>
            Lodge a complaint with the{" "}
            <strong>Office of the Privacy Commissioner</strong>.
          </li>
        </ul>
        <p>
          Data access and deletion features are currently under development and
          will be available soon.
        </p>
      </div>

      <br />
      <div>
        <h4>8. Data Security</h4>
        <p>
          We take the security of your data seriously. Our measures include:
        </p>
        <ul>
          <li>
            Encrypted JWT access and refresh tokens stored in HTTP-only cookies;
          </li>
          <li>Secure servers and TLS-encrypted communication;</li>
          <li>Hashed passwords;</li>
          <li>Two-Factor Authentication (2FA);</li>
          <li>Role-based access control for practitioners.</li>
        </ul>
      </div>

      <br />
      <div>
        <h4>9. Cookies & Tracking</h4>
        <p>
          We only use HTTP-only cookies for session management. No advertising
          or behavioral tracking cookies are used.
        </p>
      </div>
      <br />
      <div>
        <h4>10. Children’s Privacy</h4>
        <p>
          Hauora is not intended for use by individuals under 18 years of age.
        </p>
      </div>
      <br />
      <div>
        <h4>11. International Transfers</h4>
        <p>
          We currently store and process all data within New Zealand-based
          servers or via services compliant with NZ privacy standards.
          International transfers, if any, will only occur with adequate
          protections and in line with applicable laws.
        </p>
      </div>
      <br />
      <div>
        <h4>12. Policy Updates</h4>
        <p>
          We may update this Privacy Policy as our services evolve. We’ll notify
          you via email or within the Platform for any significant changes.
        </p>
      </div>
      <br />
      <div>
        <h4>13. Contact Us</h4>
        <p>
          For privacy-related questions, complaints, or data access requests,
          please contact: <strong> hauora.nz.health@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default PrivacyLaws;
