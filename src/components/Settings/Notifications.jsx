import React from "react";

import "../../styles/notificationsstyles.css";
const Notifications = () => {
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Notifications</h3>
      <div className="security-notification__wrapper">
        <p className="security-notification-subtexts__text">
          We may still send you important notifications about your account
          outside of your notification settings
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div>
            <p className="security-notification-textheader__text">Reminders</p>
            <p className="security-notification-bodytext__text">
              These are notifications to remind you of your upcoming
              appointments or billing.
            </p>
          </div>
          <div>
            <button className="security-settings-enable__btn">Enable</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>
            <p className="security-notification-textheader__text">Messages</p>
            <p className="security-notification-bodytext__text">
              These are notifications for new messages through the Hauora
              application.
            </p>
          </div>
          <div>
            <button className="security-settings-enable__btn">Enable</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>
            <p className="security-notification-textheader__text">
              Online Learning
            </p>
            <p className="security-notification-bodytext__text">
              These are notifications for uncomplete online learning through the
              Hauora learning feature.
            </p>
          </div>
          <div>
            <button className="security-settings-enable__btn">Enable</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>
            <p className="security-notification-textheader__text">Log-ins</p>
            <p className="security-notification-bodytext__text">
              These are notifications for different log-ins when using a
              unfamiliar device.
            </p>
          </div>
          <div>
            <button className="security-settings-enable__btn">Enable</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
