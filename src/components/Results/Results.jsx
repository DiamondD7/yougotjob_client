import React, { useState } from "react";
import FullResult from "./FullResult";

import "../../styles/resultsstyles.css";
const Results = () => {
  const [openResult, setOpenResult] = useState(false);

  return (
    <div>
      {openResult === false ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Results</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>2/11/2023</td>
              <td>Aaron Sierras</td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                id error non placeat ipsum
              </td>
              <td>KK</td>
              <td>
                <button onClick={() => setOpenResult(true)}>view</button>
              </td>
            </tr>
            <tr>
              <td>2/11/2023</td>
              <td>Aaron Sierra</td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                id error non placeat ipsum
              </td>
              <td>KK</td>
              <td>
                <button onClick={() => setOpenResult(true)}>view</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>
          <FullResult setOpenResult={setOpenResult} />
        </div>
      )}
    </div>
  );
};

export default Results;
