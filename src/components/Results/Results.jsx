import React, { useState } from "react";
import FullResult from "./FullResult";

import "../../styles/resultsstyles.css";
const Results = () => {
  const [openResult, setOpenResult] = useState(false);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Age</th>
            <th>Subject</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>2/11/2023</td>
            <td>Aaron Sierras</td>
            <td>24</td>
            <td>Liver function test</td>
            <td>KK</td>
            <td>
              <button onClick={() => setOpenResult(true)}>view</button>
            </td>
          </tr>
          <tr>
            <td>2/11/2023</td>
            <td>Aaron Sierra</td>
            <td>35</td>
            <td>General appointment</td>
            <td>KK</td>
            <td>
              <button onClick={() => setOpenResult(true)}>view</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;
