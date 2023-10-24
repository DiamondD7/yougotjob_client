import React, { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

import "../../styles/calendarstyles.css";
const Calendar = () => {
  const today = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);
  const [openDropDownList, setOpenDropDownList] = useState(false);
  return (
    <div>
      <div className="month-selection__wrapper">
        <button
          className="month-selection__dropdown"
          onClick={() => setOpenDropDownList(!openDropDownList)}
        >
          {selectedMonth} &nbsp; &nbsp; &nbsp;{" "}
          {openDropDownList === false ? (
            <CaretDown size={11} color="#202020" />
          ) : (
            <CaretUp size={11} color="#202020" />
          )}
        </button>

        {openDropDownList === true ? (
          <div className="month-selection-option__wrapper">
            {months.map((months) => (
              <button
                className="month-selection__option"
                onClick={(e) => setSelectedMonth(e.target.value)}
                value={months}
              >
                {months}
              </button>
            ))}
          </div>
        ) : (
          ""
        )}
        {/* <select
          className="month-selection__dropdown"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
        >
          {months.map((months) => (
            <option value={months} className="opt">
              {months}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default Calendar;
