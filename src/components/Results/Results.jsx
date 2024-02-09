import React, { useState } from "react";
import FullResult from "./FullResult";

import "../../styles/resultsstyles.css";
const Results = () => {
  const [openResult, setOpenResult] = useState(false);

  return (
    <div>
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
          </tbody>
        </table>
      ) : (
        <FullResult setOpenResult={setOpenResult} />
      )}
    </div>
  );
};

export default Results;
