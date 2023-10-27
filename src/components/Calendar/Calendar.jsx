import React, { useState, useEffect } from "react";
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

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]);
  const [openDropDownList, setOpenDropDownList] = useState(false);
  let currentMonth = today.getMonth();

  const setMonth = (e) => {
    e.preventDefault();
    setSelectedMonth(e.target.value);
    setOpenDropDownList(!openDropDownList);
  };
  // useEffect(()=>{
  //   currentMonth
  // })
  return (
    <div>
      <div className="calendar-headers__wrapper">
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
        </div>

        <div className="filter-calendar__wrapper">
          <button>Agenda</button>
          <button>Week</button>
          <button>Year</button>
        </div>
      </div>

      {openDropDownList === true ? (
        <div className="month-selection-option__wrapper">
          {months.map((months) => (
            <button
              className={`month-selection__option ${
                selectedMonth === months ? "currentMonth" : ""
              }`}
              onClick={setMonth}
              value={months}
            >
              {months}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}

      <div className="calendar-grid__wrapper">
        {days.map((days) => (
          <div className="calendar-grid-day__wrapper">
            <p>{days}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
