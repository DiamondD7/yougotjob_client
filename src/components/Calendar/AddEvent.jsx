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
        <h1>Create an appointment</h1>
      </div>
    </div>
  );
};

export default AddEvent;
