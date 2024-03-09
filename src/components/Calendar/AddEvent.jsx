import React from "react";
import { X } from "@phosphor-icons/react";

const AddEvent = ({ setOpenAddEventModal }) => {
  return (
    <div>
      <div className="addevent__wrapper">
        <button
          className="addevent-close__btn"
          onClick={() => setOpenAddEventModal(false)}
        >
          <X size={30} color="#202020" />
        </button>
        <h1 style={{ textAlign: "center" }}>Create Appointment</h1>
        <div className="addevent-subcontainer__wrapper">
          <div className="form-details__wrapper">
            <h3>Full Details</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
