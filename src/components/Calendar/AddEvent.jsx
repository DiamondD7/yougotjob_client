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
          <X size={30} color="#f3f3f3" />
        </button>
        <h1 style={{ color: "#f3f3f3", marginLeft: "100px" }}>
          Create Appointment
        </h1>
        <div className="addevent-subcontainer__wrapper">
          <div className="form-details__wrapper">
            <div style={{ display: "flex" }}>
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  First Name
                </p>
              </div>
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  Last Name
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
                  }}
                >
                  Contact number
                </p>
              </div>
              <div>
                <input className="form-details__input" type="text" />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginTop: "5px",
                    marginLeft: "16px",
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
                  Postal / Zip Code
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
            <div>
              <textarea className="form-comments__textarea"></textarea>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginTop: "2px",
                  marginLeft: "16px",
                }}
              >
                Comments
              </p>
            </div>
            <button className="form-submit__btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
