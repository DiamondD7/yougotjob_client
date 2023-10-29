import React, { useState, useEffect } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { monthList, currentYear } from "../../assets/js/months";

import "../../styles/calendarstyles.css";
const Calendar = () => {
  const today = new Date();

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]; //reference to the days of each month
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMaxMonthDays, setSelectedMaxMonthDays] = useState(0);
  const [openDropDownList, setOpenDropDownList] = useState(false);

  const setMonth = (e, months) => {
    //handle the onclick function when choosing a month
    e.preventDefault();
    setSelectedMonth(months.monthName);
    setSelectedMaxMonthDays(months.maxDays);
    setOpenDropDownList(!openDropDownList);
  };

  useEffect(() => {
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
    monthList.map((month) => {
      if (month.monthName === months[today.getMonth()]) {
        setSelectedMaxMonthDays(month.maxDays);
        setSelectedMonth(month.monthName);
      } //handles the current month and the current month's max days.
    });
  }, []);
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
          {monthList.map((months) => (
            <button
              className={`month-selection__option ${
                selectedMonth === months.monthName ? "currentMonth" : ""
              }`}
              onClick={(e) => setMonth(e, months)}
              value={months.monthName}
            >
              {months.monthName}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}

      <div className="calendar-grid__wrapper">
        {days.map(
          (day) => (
            days.splice(selectedMaxMonthDays),
            (
              <div className="calendar-grid-day__wrapper">
                <p>{day}</p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
