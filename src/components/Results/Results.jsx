import React, { useEffect, useState } from "react";
import FullResult from "./FullResult";
import { PatientResultData } from "../../assets/js/usermock";
import {
  CaretRight,
  CaretLeft,
  MagnifyingGlass,
  CircleNotch,
} from "@phosphor-icons/react";

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
  const [updatedData, setUpdatedData] = useState([]);
  const [openResult, setOpenResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingTable, setLoadingTable] = useState(false);
  let recordsPerPage = 12;

  let indexOFLastRecord = currentPage * recordsPerPage;
  let indexOfirstRecord = indexOFLastRecord - recordsPerPage;

  let paginationButtons = []; //setting initial value
  let paginationLength = Math.ceil(PatientResultData.length / recordsPerPage);

  for (let i = 0; i < paginationLength; i++) {
    paginationButtons[i] = i; //populating the array based on the pages needed to fit all the data
  }

  useEffect(() => {
    updateRecord(); //calling updateRecord when currentPage is updated
    setLoadingTable(false);
  }, [currentPage]);

  const updateRecord = () => {
    setUpdatedData(
      PatientResultData.slice(indexOfirstRecord, indexOFLastRecord) //setting PatientResultData to updatedData when pages are changed.
    );
    setTimeout(() => {
      setLoadingTable(true);
    }, 2000);
  };

  return (
    <div>
      {openResult === false ? (
        <div>
          <h2 style={{ margin: "10px 0 0 50px", fontSize: "26px" }}>Results</h2>
          <FilterResults />
          {loadingTable === true ? (
            <div>
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
                  {updatedData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.NHI}</td>
                      <td>{data.Date}</td>
                      <td>{data.Name}</td>
                      <td>{data.VisitType}</td>
                      <td>{data.Subject}</td>
                      <td>{data.Duration}</td>
                      <td>{data.Comments}</td>
                      <td
                        style={
                          data.Payment === "Paid"
                            ? { color: "#9dcd5a" }
                            : data.Payment === "Overdue"
                            ? { color: "red" }
                            : { color: "#d7c60f" }
                        }
                      >
                        {data.Payment}
                      </td>
                      <td>{data.Status}</td>
                      <td>
                        <button onClick={() => setOpenResult(true)}>
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  {paginationButtons.map((btn, index) => (
                    <button
                      key={index}
                      className="result-table-pagination__button"
                      onClick={() => setCurrentPage(btn + 1)}
                    >
                      {btn + 1}
                    </button>
                  ))}
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
          ) : (
            <div>
              <CircleNotch size={32} className={"loading__icon"} />
            </div>
          )}
        </div>
      ) : (
        <FullResult setOpenResult={setOpenResult} />
      )}
    </div>
  );
};

export default Results;
