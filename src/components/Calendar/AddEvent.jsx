import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import {
  getDaysFromPreviousMonth,
  getNextMonthDays,
  currentYear,
  handleYearChange,
} from "../../assets/js/months";

const AppointmentForm = ({
  setOpenAddEventModal,
  setFormSearchField,
  formSearchField,
}) => {
  const testProfile = [
    {
      id: 55,
      picture:
        "https://images.unsplash.com/photo-1682687982502-1529b3b33f85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "NHNX8438",
      firstName: "Henry",
      lastName: "Tood",
      nationality: "Indian",
      dob: "28 Jan 1998",
      age: "25",
      height: "160",
      weight: "60",
      email: "henry@gmail.com",
    },
    {
      id: 56,
      picture:
        "https://images.unsplash.com/photo-1705798543468-5b951da25e1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "KJHN8438",
      firstName: "Helen",
      lastName: "Tood",
      nationality: "Indian",
      dob: "2 Nov 1991",
      age: "32",
      height: "150",
      weight: "60",
      email: "helen@gmail.com",
    },
    {
      id: 57,
      picture:
        "https://images.unsplash.com/photo-1699901853492-8bc942fc6a5c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      nhi: "CDEK8438",
      firstName: "Jack",
      lastName: "Armstrong",
      nationality: "Kiwi",
      dob: "15 Aug 1997",
      age: "26",
      height: "180",
      weight: "77",
      email: "jackarm@gmail.com",
    },
  ];

  const filteredFormData = testProfile.filter(
    (data) =>
      data.firstName.toLowerCase().includes(formSearchField.toLowerCase()) ||
      data.lastName.toLowerCase().includes(formSearchField.toLowerCase()) ||
      data.nhi.toLowerCase().includes(formSearchField.toLowerCase())
  );
  return (
    <div>
      <button
        className="addevent-close__btn"
        onClick={() => setOpenAddEventModal(false)}
      >
        <X size={30} color="#f3f3f3" />
      </button>
      <h1 style={{ color: "#f3f3f3", marginLeft: "100px" }}>
        Appointment Form
      </h1>
      <div className="addevent-subcontainer__wrapper">
        <div className="form-search-users__wrapper">
          <h4 style={{ textAlign: "center" }}>Search for existing user</h4>
          <input
            type="text"
            className="form-search-users__input"
            placeholder="Patient ID / Name / NHI"
            onChange={(e) => setFormSearchField(e.target.value)}
          />
          {filteredFormData.length === 0 || formSearchField === "" ? (
            <div></div>
          ) : (
            <div className="form-search-result__wrapper">
              {filteredFormData.map((data, index) => (
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "3px",
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  key={index}
                >
                  <img
                    className="form-search-profile-picture__img"
                    src={data.picture}
                    alt="profilepic"
                  />
                  <p style={{ fontSize: "11px" }}>
                    {data.firstName} {data.lastName}
                  </p>
                  <p style={{ fontSize: "11px" }}>{data.nhi}</p>
                  <p style={{ fontSize: "11px" }}>{data.height}cm</p>
                  <p style={{ fontSize: "11px" }}>{data.weight}kg</p>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="form-details__wrapper">
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            Or
          </p>
          <h4 style={{ textAlign: "center", marginBottom: "10px" }}>
            Create a new appointment
          </h4>
          <div style={{ display: "flex" }}>
            <div>
              <input className="form-details__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  marginLeft: "16px",
                }}
              >
                First Name
              </p>
            </div>
            <div>
              <input className="form-details__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  marginLeft: "16px",
                }}
              >
                Last Name
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
            }}
          >
            <div>
              <input className="form-details__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  marginLeft: "16px",
                }}
              >
                Contact number
              </p>
            </div>
            <div>
              <input className="form-details__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  marginLeft: "16px",
                }}
              >
                Email Address
              </p>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <input className="form-address__input" type="text" />
            <p
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                margin: "5px 0 0 16px",
              }}
            >
              Street Address
            </p>
            <input className="form-address__input" type="text" />
            <p
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                margin: "5px 0 0 16px",
              }}
            >
              Street Address Line 2
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <div>
              <input className="form__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                City
              </p>
            </div>
            <div>
              <input className="form__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                Postal / Zip Code
              </p>
            </div>
            <div>
              <input className="form__input" type="text" />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                State/Province
              </p>
            </div>
          </div>
          {/* <div>
              <button className="form-checkavailabledate__btn">
                Check available dates <Calendar size={14} />
              </button>
            </div> */}
          <div>
            <textarea className="form-comments__textarea"></textarea>
            <p
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                marginTop: "2px",
                marginLeft: "16px",
              }}
            >
              Comments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailableDatesCalendar = () => {
  let today = new Date();

  const [selectedMaxMonthDays, setSelectedMaxMonthDays] = useState(0); //sets the max days of each month.
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

  const [selectedMonth, setSelectedMonth] = useState(months[today.getMonth()]); //

  const handleMonthChanged = (month, isIncrease) => {
    if (month === "Jan" && isIncrease === false) {
      setSelectedMonth(months[0]);
    } else if (month === "Dec" && isIncrease === true) {
      setSelectedMonth(months[11]);
    } else if (isIncrease === true) {
      // setSelectedMonth(selectedMonth + 1);
      let indexOfNextMonth = months.indexOf(selectedMonth) + 1;
      setSelectedMonth(months[indexOfNextMonth]);
    } else {
      let indexOfPreviousMonth = months.indexOf(selectedMonth) - 1;
      setSelectedMonth(months[indexOfPreviousMonth]);
    }
  };

  const nextMonthDays = getNextMonthDays(
    today.getFullYear(),
    months,
    selectedMonth
  );
  const previousMonthDays = getDaysFromPreviousMonth(
    today.getFullYear(),
    months,
    selectedMonth
  );

  // ---------------------------------------
  const [selectedYear, setSelectedYear] = useState(currentYear); //sets its current year
  const [fullDate, setFullDate] = useState(
    handleYearChange(today.getFullYear()) //calling a function from months.js file to update the month list.
  );

  useEffect(() => {
    refreshCalendarList(); //use this to refresh the whole calendar. Incase there might be changes.
  }, [fullDate, selectedMonth]); //will run this again once it senses that there is a change in 'fullDate'.

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

  return (
    <div>
      <div className="availbledatecalendar-container__wrapper">
        <div className="availabledatecalendar__wrapper">
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleMonthChanged(selectedMonth, false)}
            >
              <ArrowLeft size={19} />
            </button>
            <h4 style={{ textAlign: "center" }}>
              {selectedMonth} {today.getFullYear()}
            </h4>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleMonthChanged(selectedMonth, true)}
            >
              <ArrowRight size={19} />
            </button>
          </div>
          <div className="availabledatecalendar-daysofweek__wrapper">
            <label>Mon</label>
            <label>Tue</label>
            <label>Wed</label>
            <label>Thu</label>
            <label>Fri</label>
            <label>Sat</label>
            <label>Sun</label>
          </div>
          <div className="availabledatecalendar-days__wrapper">
            {previousMonthDays.map((day, index) => (
              <div key={index}>
                <p className="availabledatecalendar-subdays__text">{day}</p>
              </div>
            ))}
            {days.map(
              (day, index) => (
                days.splice(selectedMaxMonthDays),
                (day < today.getDate() &&
                  selectedMonth === months[today.getMonth()] &&
                  parseInt(selectedYear) === currentYear) ||
                months.indexOf(selectedMonth) < //getting the index of selectedMonth from 0 to 11: 0 means Jan
                  months.indexOf(months[today.getMonth()]) ? ( //is LESS than the indexOf the currentMonth. because if we dont do indexOf then the output will just be a string eg. "Mar"
                  <button
                    style={{ textAlign: "start", fontSize: "10px" }}
                    disabled={true}
                    key={index}
                  >
                    <p className="availabledatecalendar-daysofthemonth__text">
                      {day}
                    </p>
                  </button>
                ) : (
                  <button
                    className="availabledatecalendar-daysofthemonth__btn"
                    key={index}
                  >
                    <p className="availabledatecalendar-daysofthemonth__text">
                      {day}
                    </p>
                  </button>
                )
              )
            )}
            {nextMonthDays.map((day, index) => (
              <div key={index}>
                <p className="availabledatecalendar-subdays__text">{day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddEvent = ({
  setOpenAddEventModal,
  months,
  previousMonthDays,
  selectedMaxMonthDays,
}) => {
  const [formSearchField, setFormSearchField] = useState("");

  return (
    <div>
      <div className="addevent__wrapper">
        <div>
          <AppointmentForm
            setOpenAddEventModal={setOpenAddEventModal}
            setFormSearchField={setFormSearchField}
            formSearchField={formSearchField}
          />
          <AvailableDatesCalendar />
          <div className="form-submit__wrapper">
            <button
              className="form-submit__btn"
              onClick={() => setOpenAvailableDatesCalendar(true)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
