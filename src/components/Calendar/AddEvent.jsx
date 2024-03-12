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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  First Name
                </p>
              </div>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  Last Name
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  Contact number
                </p>
              </div>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  Email Address
                </p>
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <input className="form-address__input" type="text" />
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "5px 0 0 16px",
                }}
              >
                Street Address
              </p>
              <input className="form-address__input" type="text" />
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "5px 0 0 16px",
                }}
              >
                Street Address Line 2
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  City
                </p>
              </div>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  City
                </p>
              </div>
              <div>
                <input className="form__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  State/Province
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
