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
const FilterResults = ({
  searchField,
  setSearchField,
  setVisitType,
  setStatus,
  setPayment,
  setTriageLevel,
}) => {
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
              placeholder="Search for name, nhi or subject"
              onChange={(e) => setSearchField(e.target.value)}
            />
          </div>
        </div>
        <div style={{ width: "22%" }}>
          <h4 style={{ fontSize: "12px" }}>Visit Type</h4>
          <select
            className="filter-result__dropdown"
            onChange={(e) => setVisitType(e.target.value)}
          >
            <option value="">All</option>
            <option>General Appointment</option>
            <option>Vaccination</option>
            <option>Checkup</option>
          </select>
        </div>
        <div style={{ width: "12%" }}>
          <h4 style={{ fontSize: "12px" }}>Status</h4>
          <select
            className="filter-result__dropdown"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option>Pending</option>
            <option>Complete</option>
            <option>KK</option>
          </select>
        </div>
        <div style={{ width: "10%" }}>
          <h4 style={{ fontSize: "12px" }}>Payment</h4>
          <select
            className="filter-result__dropdown"
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="">All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
        </div>
        <div style={{ width: "10%" }}>
          <h4 style={{ fontSize: "12px" }}>Triage Level</h4>
          <select
            className="filter-result__dropdown"
            onChange={(e) => setTriageLevel(e.target.value)}
          >
            <option value="">All</option>
            <option>L1</option>
            <option>L2</option>
            <option>L3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  const [updatedData, setUpdatedData] = useState(PatientResultData);
  const [openResult, setOpenResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingTable, setLoadingTable] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [visitType, setVisitType] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [triageLevel, setTriageLevel] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // const filtering = () => {
  //   const filtered = searchField.toLowerCase();
  //   const filteredVisitType = visitType.toLowerCase();
  //   const filteredStatus = status.toLowerCase();
  //   const filteredPayment = payment.toLowerCase();
  //   const filteredTriageLevel = triageLevel.toLowerCase();

  //   const filters = PatientResultData.filter(
  //     //filters data
  //     (data) => {
  //       return (
  //         (data.FullName.toLowerCase().includes(filtered) ||
  //           data.NHI.toLowerCase().includes(filtered) ||
  //           data.Subject.toLowerCase().includes(filtered)) &&
  //         data.VisitType.toLowerCase().includes(filteredVisitType) &&
  //         data.Status.toLowerCase().includes(filteredStatus) &&
  //         data.Payment.toLowerCase().includes(filteredPayment) &&
  //         data.TriageLevel.toLowerCase().includes(filteredTriageLevel)
  //       );
  //     }
  //   );

  //   setFilteredData(filters);
  // }; //TO DO

  let recordsPerPage = 12;

  let indexOFLastRecord = currentPage * recordsPerPage;
  let indexOfirstRecord = indexOFLastRecord - recordsPerPage;
  let paginationButtons = []; //setting initial value
  let paginationLength = Math.ceil(
    (searchField === "" &&
    visitType === "" &&
    status === "" &&
    payment === "" &&
    triageLevel === ""
      ? PatientResultData.length
      : filteredData.length) / recordsPerPage
  );

  for (let i = 0; i < paginationLength; i++) {
    paginationButtons[i] = i; //populating the array based on the pages needed to fit all the data. make this better
  }

  useEffect(() => {
    updateRecord(); //calling updateRecord when currentPage is updated
    setLoadingTable(false);
  }, [currentPage, searchField, visitType, status, payment, triageLevel]);

  const updateRecord = () => {
    if (
      searchField === "" &&
      visitType === "" &&
      status === "" &&
      payment === "" &&
      triageLevel === ""
    ) {
      setUpdatedData(
        PatientResultData.slice(indexOfirstRecord, indexOFLastRecord) //setting PatientResultData to updatedData when pages are changed.
      );
    } else {
      const filtered = searchField.toLowerCase();
      const filteredVisitType = visitType.toLowerCase();
      const filteredStatus = status.toLowerCase();
      const filteredPayment = payment.toLowerCase();
      const filteredTriageLevel = triageLevel.toLowerCase();
      const filters = PatientResultData.filter(
        //filters data
        (data) => {
          return (
            (data.FullName.toLowerCase().includes(filtered) ||
              data.NHI.toLowerCase().includes(filtered) ||
              data.Subject.toLowerCase().includes(filtered)) &&
            data.VisitType.toLowerCase().includes(filteredVisitType) &&
            data.Status.toLowerCase().includes(filteredStatus) &&
            data.Payment.toLowerCase().includes(filteredPayment) &&
            data.TriageLevel.toLowerCase().includes(filteredTriageLevel)
          );
        }
      );
      setFilteredData(filters);
      setUpdatedData(filters.slice(indexOfirstRecord, indexOFLastRecord));

      if (currentPage > paginationLength) {
        //if currentPage is more than the paginationLength then make currentPage 1 so that user can see data.but this is temporary. will imprv this
        setCurrentPage(1);
      }
    }

    setTimeout(() => {
      setLoadingTable(true);
    }, 2000);
  };

  const handleCaretPageChange = (leftOrRight) => {
    if (leftOrRight === "right") {
      if (currentPage !== paginationLength) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div>
      {openResult === false ? (
        <div>
          <h2 style={{ margin: "10px 0 0 50px", fontSize: "26px" }}>Results</h2>
          <FilterResults
            setSearchField={setSearchField}
            searchField={searchField}
            setVisitType={setVisitType}
            setStatus={setStatus}
            setPayment={setPayment}
            setTriageLevel={setTriageLevel}
          />
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
                    <th>Triage</th>
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
                      <td>{data.FullName}</td>
                      <td>{data.VisitType}</td>
                      <td>{data.Subject}</td>
                      <td>{data.Duration}</td>
                      <td>{data.TriageLevel}</td>
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
                }}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    padding: "0 10px",
                  }}
                  onClick={() => handleCaretPageChange("left")}
                >
                  <CaretLeft size={19} />
                </button>
                <div>
                  {paginationButtons.map((btn, index) => (
                    <button
                      key={index}
                      className={`result-table-pagination__button ${
                        btn + 1 === currentPage ? "paginationActive" : ""
                      }`}
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
                  onClick={() => handleCaretPageChange("right")}
                >
                  <CaretRight size={19} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ position: "relative" }}>
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
