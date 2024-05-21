import React from "react";

import "../../styles/recordsstyles.css";
const PatientDetailsContainer = () => {
  return (
    <div>
      <div className="patientdetails-container__wrapper">
        <div style={{ backgroundColor: "#9dcd5a" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <p className="contents-headingTitle__text">Patient Details</p>
            <button className="contents-edit__btn">edit</button>
          </div>
        </div>
        <div style={{ padding: "5px" }}>
          <p className="contents-details__text">Name: Johnson Martin Leoso</p>
          <p className="contents-details__text">
            Address: 1/33 Butley Drive, Farm Cove
          </p>
          <p className="contents-details__text">Date of Birth: 03/01/1966</p>
        </div>
      </div>
    </div>
  );
};

const PractionerDetailsContainer = () => {
  return (
    <div>
      <div className="practionerdetails-container__wrapper">
        <div style={{ backgroundColor: "#9dcd5a" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <p className="contents-headingTitle__text">Practioner Details</p>
            <button className="contents-edit__btn">edit</button>
          </div>
        </div>
        <div
          style={{
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p className="contents-details__text">Name: Dr. Lenchman</p>
            <p className="contents-details__text">
              Address: 312/22, L2 Queen Street
            </p>
            <p className="contents-details__text">Ph #: 022-3335-556</p>
          </div>
          <div>
            <p className="contents-details__text">
              Provider Identification: 33256HE3
            </p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

const InvoicePaymentDetails = () => {
  return (
    <div>
      <div className="feescharge-container__wrapper">
        <div style={{ backgroundColor: "#9dcd5a" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <p className="contents-headingTitle__text">Fees & Charges</p>
          </div>
        </div>
        <div>
          <table className="feescharge-container__table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice Code</th>
                <th>Description</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>27/05/2021</td>
                <td>#43098TB2A</td>
                <td>General Appointment</td>
                <td>$50</td>
                <td>$150.00</td>
                <td>
                  <button className="feescharge-table__btn delete">
                    delete
                  </button>
                  <button className="feescharge-table__btn">edit</button>
                </td>
              </tr>
              <tr>
                <td>27/05/2021</td>
                <td>#43098TB2A</td>
                <td>Short meeting</td>
                <td>$0</td>
                <td>$0.00</td>
                <td>
                  <button className="feescharge-table__btn delete">
                    delete
                  </button>
                  <button className="feescharge-table__btn">edit</button>
                </td>
              </tr>
              <tr>
                <td>
                  <button className="feescharge-table-addFee__btn">
                    Add Fee
                  </button>
                </td>
                <td></td>
                <td></td>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>$150.00</strong>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PaymentDetailsContainer = () => {
  return (
    <div>
      <div className="paymentdetails-container__wrapper">
        <div style={{ backgroundColor: "#9dcd5a" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <p className="contents-headingTitle__text">Payment</p>
          </div>
        </div>
        <div>
          <table className="feescharge-container__table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Description</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>27/05/2021</td>
                <td>Stored Payment Method</td>
                <td>General Appointment</td>
                <td>Available</td>
                <td>$150.00</td>
                <td>
                  <button className="payment-table__btn">
                    Process Payment
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>Outstanding</strong>
                </td>
                <td>
                  <strong>$150.00</strong>
                </td>
                <td>
                  <button className="payment-table__btn">Mark As Paid</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InvoiceNotesContainer = () => {
  return (
    <div>
      <div className="notes-container__wrapper">
        <div style={{ backgroundColor: "#9dcd5a" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            <p className="contents-headingTitle__text">Notes</p>
            <button className="contents-edit__btn">edit</button>
          </div>
        </div>
        <div style={{ padding: "5px" }}>
          <p className="contents-details__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            eaque iure molestias tempore libero veniam aperiam minus nisi quasi,
            atque modi molestiae non voluptatum distinctio aut corporis
            consequatur tenetur fuga. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Repellat earum odio sed laboriosam adipisci, quod
            sit vero rem sunt qui aspernatur tempora incidunt unde non molestias
            ipsa sint, voluptate nobis! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Odio, sint? Architecto officia dicta quia ex iure
            ut laborum vel nihil harum ducimus, ratione assumenda suscipit amet
            illum totam sed earum.
          </p>
        </div>
      </div>
    </div>
  );
};

const Records = () => {
  return (
    <div>
      <div>
        <div className="records-invoice-search__wrapper">
          <input
            type="text"
            className="records-invoice-search__input"
            placeholder="Search by patient name, nhi or id"
          />
          <button className="records-invoice-search__btn">search</button>
        </div>
        <div className="records-invoice-container__wrapper">
          {/* <p className="norecordsfound__text">No records found</p> */}
          <p className="status-outcome__text">Paid</p>
          <label className="status-outcome__date"> on 15/03/2024</label>
          <h4>Invoice #77134</h4>
          <p style={{ fontSize: "11px" }}>Johnson Martin Leoso</p>
          <div style={{ marginTop: "10px", display: "flex" }}>
            <div>
              <PatientDetailsContainer />
              <PractionerDetailsContainer />
            </div>
            <div>
              <InvoicePaymentDetails />
              <PaymentDetailsContainer />
              <InvoiceNotesContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
