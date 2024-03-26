import React, { useState } from "react";
import FullResult from "./FullResult";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";

import "../../styles/resultsstyles.css";
const Results = () => {
  const [openResult, setOpenResult] = useState(false);

  return (
    <div>
      <h2 style={{ margin: "30px 0 0 50px" }}>Results</h2>
      {openResult === false ? (
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
                iure quae accusamus tenetur quibusdam esse porro iusto
              </td>
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
              <td>KK</td>
              <td>
                <button onClick={() => setOpenResult(true)}>view</button>
              </td>
            </tr>
          </tbody>
        </table>
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
