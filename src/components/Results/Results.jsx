import React, { useState } from "react";
import FullResult from "./FullResult";
import { CaretRight, CaretLeft, MagnifyingGlass } from "@phosphor-icons/react";

import "../../styles/resultsstyles.css";
const FilterResults = () => {
  return (
    <div>
      <div className="filter-result__wrapper">
        <div style={{ width: "35%" }}>
          <h4 style={{ fontSize: "12px" }}>What are you looking for?</h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                padding: "2.5px 0 2.5px 10px",
                marginTop: "10px",
              }}
            >
              <MagnifyingGlass size={11} />
            </div>
            <input
              className="filter-result-search__input"
              type="text"
              placeholder="Search for name, nhi, subject, status etc."
            />
          </div>
        </div>
        <div style={{ width: "22%" }}>
          <h4 style={{ fontSize: "12px" }}>Visit Type</h4>
          <select className="filter-result__dropdown">
            <option>All</option>
            <option>General Appointment</option>
            <option>Vaccination</option>
            <option>Checkup</option>
          </select>
        </div>
        <div style={{ width: "12%" }}>
          <h4 style={{ fontSize: "12px" }}>Status</h4>
          <select className="filter-result__dropdown">
            <option>All</option>
            <option>Pending</option>
            <option>Complete</option>
            <option>KK</option>
          </select>
        </div>
        <div style={{ width: "10%" }}>
          <h4 style={{ fontSize: "12px" }}>Payment</h4>
          <select className="filter-result__dropdown">
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
        </div>
        <div style={{ width: "10%" }}>
          <h4 style={{ fontSize: "12px" }}>Triage Level</h4>
          <select className="filter-result__dropdown">
            <option>All</option>
            <option>Level 1</option>
            <option>Level 2</option>
            <option>Level 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  const [openResult, setOpenResult] = useState(false);

  return (
    <div>
      {openResult === false ? (
        <div>
          <h2 style={{ margin: "10px 0 0 50px", fontSize: "26px" }}>Results</h2>
          <FilterResults />
          <table className="result-table__table">
            <thead>
              <tr>
                <th>NHI</th>
                <th>Date</th>
                <th>Name</th>
                <th>Visit type</th>
                <th>Subject</th>
                <th>Duration</th>
                <th>Comments</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>YBN777652</td>
                <td>2/11/2023</td>
                <td>Johnson Martin Leaso Henderson</td>
                <td>General appointment</td>
                <td>Liver function test</td>
                <td>30 mins</td>
                <td>-</td>
                <td style={{ color: "#d7c60f" }}>Pending</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td style={{ color: "#d7c60f" }}>Pending</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td style={{ color: "red" }}>Overdue</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus iure quae accusamus tenetur quibusdam esse porro iusto
                </td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
              <tr>
                <td>HHO332921</td>
                <td>2/11/2023</td>
                <td>Aaron Sierra</td>
                <td>Chronic care</td>
                <td>General appointment</td>
                <td>45 mins</td>
                <td>-</td>
                <td>Paid</td>
                <td>KK</td>
                <td>
                  <button onClick={() => setOpenResult(true)}>view</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <FullResult setOpenResult={setOpenResult} />
      )}
      <div
        style={{
          margin: "10px 0 0 50px",
          width: "70%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "0 10px",
          }}
        >
          <CaretLeft size={19} />
        </button>
        <div>
          <button className="result-table-pagination__button">1</button>
          <button className="result-table-pagination__button">2</button>
          <button className="result-table-pagination__button">3</button>
          <button className="result-table-pagination__button">4</button>
        </div>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "0 10px",
          }}
        >
          <CaretRight size={19} />
        </button>
      </div>
    </div>
  );
};

export default Results;
