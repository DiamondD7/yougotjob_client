import React, { useState, useEffect } from "react";
import { CaretDown, CaretUp, Plus } from "@phosphor-icons/react";
import {
  currentYear,
  handleYearChange,
  getNextMonthDays,
  getDaysFromPreviousMonth,
} from "../../assets/js/months";
import { CalendarEventMockData } from "../../assets/js/usermock";

import "../../styles/calendarstyles.css";
import AddEvent from "./AddEvent";
const Calendar = () => {
  const today = new Date();
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]; //reference to the days of each month
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

  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]); //sets the current month

  const [selectedMaxMonthDays, setSelectedMaxMonthDays] = useState(0); //sets the max days of each month.

  const [openDropDownList, setOpenDropDownList] = useState(false);

  const [selectedYear, setSelectedYear] = useState(currentYear); //sets its current year

  const [fullDate, setFullDate] = useState(
    handleYearChange(today.getFullYear()) //calling a function from months.js file to update the month list.
  );

  const setMonth = (e, months) => {
    //handle the onclick function when choosing a month
    setSelectedMonth(months.monthName);
    setSelectedMaxMonthDays(months.maxDays);
    setOpenDropDownList(!openDropDownList);
  };
  useEffect(() => {
    refreshCalendarList(); //use this to refresh the whole calendar. Incase there might be changes.
  }, [fullDate]); //will run this again once it senses that there is a change in 'fullDate'.

  const refreshCalendarList = () => {
    fullDate.map((month) => {
      if (month.monthName === selectedMonth) {
        setSelectedMaxMonthDays(month.maxDays);
        setSelectedMonth(month.monthName);
      } //handles the current month and the current month's max days.
    });
  };

  useEffect(() => {
    setFullDate(handleYearChange(parseInt(selectedYear))); //updating the full calendar date if there is changes in year.
  }, [selectedYear]); //this will only run when the state got change

  //CALLING THE METHODS FROM months.js TO GET THE PREFIXES.
  const nextMonthDays = getNextMonthDays(selectedYear, months, selectedMonth);
  const previousMonthDays = getDaysFromPreviousMonth(
    selectedYear,
    months,
    selectedMonth
  );

  const [openAddEventModal, setOpenAddEventModal] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState(CalendarEventMockData);
  return (
    <div>
      <div
        className={
          openAddEventModal === true ? "addevent-container__wrapper" : ""
        }
      ></div>

      {openAddEventModal && (
        <div>
          <AddEvent
            months={months}
            previousMonthDays={previousMonthDays}
            selectedMaxMonthDays={selectedMaxMonthDays}
            setOpenAddEventModal={setOpenAddEventModal}
            setCalendarEvents={setCalendarEvents}
          />
        </div>
      )}

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
            <input
              className="year-input"
              type="text"
              value={selectedYear}
              placeholder="Choose year"
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>

          <div className="add-event-btn__wrapper">
            <button onClick={() => setOpenAddEventModal(true)}>
              <Plus size={16} color="#202020" />
              &nbsp; Add event
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
            {fullDate.map((months, index) => (
              <button
                className={`month-selection__option ${
                  selectedMonth === months.monthName ? "currentMonth" : ""
                }`}
                onClick={(e) => setMonth(e, months)}
                value={months.monthName}
                key={index}
              >
                {months.monthName}
              </button>
            ))}
          </div>
        ) : (
          ""
        )}

        <div className="daysOfWeek__wrapper">
          <label>Mon</label>
          <label>Tue</label>
          <label>Wed</label>
          <label>Thu</label>
          <label>Fri</label>
          <label>Sat</label>
          <label>Sun</label>
        </div>

        <div className="calendar-grid__wrapper">
          {previousMonthDays.map((day, index) => (
            <div
              key={`prevDayCell-${index}`}
              className="calendar-grid-day__wrapper previousMonthDay"
            >
              <p>{day}</p>
            </div>
          ))}
          {days.map(
            (day) => (
              days.splice(selectedMaxMonthDays),
              day === today.getDate() &&
              selectedMonth === months[today.getMonth()] &&
              parseInt(selectedYear) === currentYear ? (
                <div className="calendar-grid-day__wrapper dayOfTheMonth-highlight">
                  <p>{day}</p>
                </div>
              ) : (
                <div className="calendar-grid-day__wrapper">
                  <p>{day}</p>
                  {calendarEvents.map((events, index) =>
                    events.EventDay === day &&
                    events.EventYear === parseInt(selectedYear) ? (
                      <p key={index} className="calendar-grid-day-event">
                        appointment
                      </p>
                    ) : (
                      ""
                    )
                  )}
                </div>
              )
            )
          )}

          {nextMonthDays.map((day, index) => (
            <div
              key={`nextDayCell-${index}`}
              className="calendar-grid-day__wrapper nextMonthDay"
            >
              <p>{day}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
