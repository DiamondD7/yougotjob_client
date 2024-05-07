import React, { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import {
  getDaysFromPreviousMonth,
  getNextMonthDays,
  currentYear,
  handleYearChange,
} from "../../assets/js/months";
import { PatientMockData } from "../../assets/js/usermock";

const AppointmentForm = ({
  setOpenAddEventModal,
  setFormSearchField,
  formSearchField,
  setCalendarEvents,
  setFirstName,
  setLastName,
  setContactNum,
  setEmail,
  setCity,
  setStreetAddress,
  setZipCode,
  setStateProvince,
  setComments,
  setEventAgenda,
  firstName,
  lastName,
  contactNum,
  email,
  city,
  streetAddress,
  zipCode,
  stateProvince,
  eventAgenda,
}) => {
  const filteredFormData = PatientMockData.filter(
    (data) =>
      data.firstName.toLowerCase().includes(formSearchField.toLowerCase()) ||
      data.lastName.toLowerCase().includes(formSearchField.toLowerCase()) ||
      data.nhi.toLowerCase().includes(formSearchField.toLowerCase())
  );

  const [choseExistingUser, setChoseExistingUser] = useState(false);
  const [removeExistingUser, setRemoveExistingUser] = useState(false);

  useEffect(() => {
    setFormSearchField("");
    setChoseExistingUser(false);
    setFirstName("");
    setLastName("");
    setContactNum("");
    setEmail("");
    setCity("");
    setStreetAddress("");
    setZipCode("");
    setStateProvince("");
    setRemoveExistingUser(false); //setting removeExistingUser to false, so that the program wont run infinitely
  }, [removeExistingUser === true]); //only run this when removeExistingUser is true.

  const setExistingUser = (data) => {
    setFormSearchField(`${data.firstName} ${data.lastName}`);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setContactNum(data.contactNumber);
    setEmail(data.email);
    setCity(data.city);
    setStreetAddress(data.streetAddress);
    setZipCode(data.zipCode);
    setStateProvince(data.stateProvince);

    setChoseExistingUser(true);
  };

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              className="form-search-users__input"
              placeholder="Patient ID / Name / NHI"
              value={formSearchField}
              disabled={choseExistingUser === true ? true : false}
              onChange={(e) => setFormSearchField(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={() => setRemoveExistingUser(true)}
            >
              {choseExistingUser && <X size={15} color="red" />}
            </button>
          </div>

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
                  onClick={() => setExistingUser(data)}
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
              <input
                className="form-details__input"
                type="text"
                value={firstName}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setFirstName(e.target.value)}
              />
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
              <input
                className="form-details__input"
                type="text"
                value={lastName}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setLastName(e.target.value)}
              />
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
              <input
                className="form-details__input"
                type="text"
                value={contactNum}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setContactNum(e.target.value)}
              />
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
              <input
                className="form-details__input"
                type="text"
                value={email}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setEmail(e.target.value)}
              />
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
            <input
              className="form-address__input"
              type="text"
              value={streetAddress}
              disabled={choseExistingUser === true ? true : false}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <p
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                margin: "5px 0 0 16px",
              }}
            >
              Street Address
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
              <input
                className="form__input"
                type="text"
                value={city}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setCity(e.target.value)}
              />
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
              <input
                className="form__input"
                type="text"
                value={zipCode}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setZipCode(e.target.value)}
              />
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
              <input
                className="form__input"
                type="text"
                value={stateProvince}
                disabled={choseExistingUser === true ? true : false}
                onChange={(e) => setStateProvince(e.target.value)}
              />
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
            <textarea
              className="form-comments__textarea"
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
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

          <div style={{ marginLeft: "16px", marginTop: "2px" }}>
            <input
              className="form__input"
              type="text"
              placeholder="eg. vaccination"
              value={eventAgenda}
              onChange={(e) => setEventAgenda(e.target.value)}
            />

            <p
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              Appointment Agenda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailableDatesCalendar = ({
  setDay,
  setMonth,
  setYear,
  setEventTime,
}) => {
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
  const [buttonPressed, setButtonPressed] = useState(0);

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

  const [pickedTime, setPickedTime] = useState("");

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

  const handleDatePickerEvent = (e, day, month, year) => {
    e.preventDefault();
    setDay(day);
    setMonth(month);
    setYear(year);

    setButtonPressed(day);
  };

  const pickTimeEvent = (e, time) => {
    e.preventDefault();
    setEventTime(time);
    setPickedTime(time);
  };

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
                    className={`availabledatecalendar-daysofthemonth__btn ${
                      buttonPressed === day &&
                      months.indexOf(selectedMonth) === today.getMonth()
                        ? "colored"
                        : ""
                    }`} //buttonPressed color change
                    key={index}
                    onClick={(e) =>
                      handleDatePickerEvent(
                        e,
                        day,
                        months.indexOf(selectedMonth),
                        today.getFullYear()
                      )
                    }
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
        <div className="available-time__wrapper">
          <h2 style={{ textAlign: "center" }}>Available time</h2>
          {buttonPressed === 0 ? (
            <p className="available-time-default__text">Select a day first</p>
          ) : (
            <div className="available-times__wrapper">
              <ul>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "09:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "09:00:00")}
                  >
                    09:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "09:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "09:30:00")}
                  >
                    09:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "10:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "10:00:00")}
                  >
                    10:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "10:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "10:30:00")}
                  >
                    10:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "11:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "11:00:00")}
                  >
                    11:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "11:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "11:30:00")}
                  >
                    11:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "12:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "12:00:00")}
                  >
                    12:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "12:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "12:30:00")}
                  >
                    12:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "13:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "13:00:00")}
                  >
                    13:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "13:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "13:30:00")}
                  >
                    13:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "14:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "14:00:00")}
                  >
                    14:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "14:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "14:30:00")}
                  >
                    14:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "15:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "15:00:00")}
                  >
                    15:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "15:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "15:30:00")}
                  >
                    15:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "16:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "16:00:00")}
                  >
                    16:00:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "16:30:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "16:30:00")}
                  >
                    16:30:00
                  </button>
                </li>
                <li>
                  <button
                    className={`available-times__btn ${
                      pickedTime === "17:00:00" ? "pickedTime" : ""
                    }`}
                    onClick={(e) => pickTimeEvent(e, "17:00:00")}
                  >
                    17:00:00
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddEvent = ({ setOpenAddEventModal, setCalendarEvents }) => {
  const [formSearchField, setFormSearchField] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [streetAddressLine2, setStreetAddressLine2] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [comments, setComments] = useState("");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [eventTime, setEventTime] = useState(0);
  const [eventAgenda, setEventAgenda] = useState("");

  const handleSaveEventData = () => {
    setCalendarEvents((prevItems) => [
      //adding objects in an array of objects (using prevItems)
      ...prevItems,
      {
        FirstName: firstName,
        LastName: lastName,
        ContactNumber: contactNum,
        EmailAddress: email,
        StreetAddress: streetAddress,
        City: city,
        Zip: zipCode,
        StateProvince: stateProvince,
        StreetAddressLine2: streetAddressLine2,
        Comments: comments,
        EventAgenda: eventAgenda,
        EventDay: day,
        EventMonth: month,
        EventYear: year,
        EventTime: eventTime,
        Status: "Pending",
      },
    ]);
    setOpenAddEventModal(false);
  };
  return (
    <div>
      <div className="addevent__wrapper">
        <div>
          <AppointmentForm
            setOpenAddEventModal={setOpenAddEventModal}
            setFormSearchField={setFormSearchField}
            formSearchField={formSearchField}
            setCalendarEvents={setCalendarEvents}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setStreetAddress={setStreetAddress}
            setCity={setCity}
            setZipCode={setZipCode}
            setStateProvince={setStateProvince}
            setStreetAddressLine2={setStreetAddressLine2}
            setContactNum={setContactNum}
            setComments={setComments}
            setEventAgenda={setEventAgenda}
            firstName={firstName}
            lastName={lastName}
            email={email}
            streetAddress={streetAddress}
            city={city}
            zipCode={zipCode}
            stateProvince={stateProvince}
            contactNum={contactNum}
            eventAgenda={eventAgenda}
          />
          <AvailableDatesCalendar
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
            setEventTime={setEventTime}
          />
          <div className="form-submit__wrapper">
            <button className="form-submit__btn" onClick={handleSaveEventData}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
