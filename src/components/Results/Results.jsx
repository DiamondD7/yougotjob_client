import React, { useEffect, useState } from "react";
import FullResult from "./FullResult";
import { GetPreviousApt } from "../../assets/js/serverApi";
import { PatientResultData } from "../../assets/js/usermock";
import {
  CaretRight,
  CaretLeft,
  MagnifyingGlass,
  CircleNotch,
} from "@phosphor-icons/react";

import "../../styles/resultsstyles.css";
const FilterResults = ({ setSearchField, setVisitType }) => {
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
            <option value="General Appoinment">General Appointment</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Checkup">Checkup</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  const [prevApts, setPrevApts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openResult, setOpenResult] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [visitType, setVisitType] = useState("");

  let recordsPerPage = 12;

  let indexOFLastRecord = currentPage * recordsPerPage;
  let indexOfirstRecord = indexOFLastRecord - recordsPerPage;
  let paginationButtons = []; //setting initial value
  let paginationLength = Math.ceil(
    (searchField === "" && visitType === ""
      ? prevApts.length
      : filteredData.length) / recordsPerPage
  );

  for (let i = 0; i < paginationLength; i++) {
    paginationButtons[i] = i; //populating the array based on the pages needed to fit all the data. make this better
  }
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

  const getPreviousApt = () => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetPreviousApt}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setPrevApts(res.returnStatus.data);
      });
  };

  useEffect(() => {
    updateRecord(); //calling updateRecord when currentPage is updated
    setLoadingTable(false);
  }, [currentPage, searchField, visitType]);

  const updateRecord = () => {
    if (searchField === "" && visitType === "") {
      //calls the fetch logic to get all the data when the searchfield and visitype is empty
      getPreviousApt();
    } else {
      const filtered = searchField.toLowerCase();
      const filteredVisitType = visitType.toLowerCase();

      //filters the apt
      const filters = prevApts.filter((data) => {
        // Ensure all properties exist before accessing them
        const hasFullNameMatch = data.fullName.toLowerCase().includes(filtered);
        const hasNhiMatch = data.nhi.toLowerCase().includes(filtered);
        const appointmentType = data.appointmentType
          .toLowerCase()
          .includes(filteredVisitType);

        return (hasFullNameMatch || hasNhiMatch) && appointmentType;
      });

      setFilteredData(filters); //this is to check the length of data
      setPrevApts(filters.slice(indexOfirstRecord, indexOFLastRecord));
    }
    setTimeout(() => {
      setLoadingTable(true);
    }, 2000);
  };

  return (
    <div>
      {openResult === false ? (
        <div>
          {/* <h2 className="result-table__h2">Results</h2> */}
          <FilterResults
            setSearchField={setSearchField}
            setVisitType={setVisitType}
          />
          {loadingTable === true ? (
            <div>
              <table className="result-table__table">
                <thead>
                  <tr>
                    <th>NHI</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Appointment type</th>
                    <th>Agenda</th>
                    <th>Duration</th>
                    <th>Comments</th>
                    <th>Payment</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {prevApts.map((data, index) => (
                    <tr key={index}>
                      <td>{data.nhi}</td>
                      <td>{data.preferredAppointmentDate}</td>
                      <td>{data.fullName}</td>
                      <td>{data.apointmentType}</td>
                      <td>{data.appointmentAgenda}</td>
                      <td>{data.Duration}</td>
                      <td>{data.conclusion}</td>
                      <td
                        style={
                          data.appointmentPayments.isPaid === true
                            ? { color: "#9dcd5a" }
                            : { color: "#d7c60f" }
                        }
                      >
                        {data.appointmentPayments.isPaid === true
                          ? "Paid"
                          : "Pending"}
                      </td>
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
