import React from "react";

import "../../styles/jobsstyles.css";
const JobsFilter = () => {
  return (
    <div>
      <form>
        <p style={{ fontSize: "11px", fontWeight: "bold" }}>Location</p>
        <input
          className="location-search__input"
          type="text"
          placeholder="Search"
        />

        <div style={{ marginTop: "20px", width: "150px" }}>
          <p style={{ fontSize: "11px", fontWeight: "bold" }}>Type</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <label style={{ fontSize: "11px" }}>Nurse</label>
            <input type="checkbox" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "11px" }}>General Practitioner</label>
            <input type="checkbox" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <label style={{ fontSize: "11px" }}>Therapist</label>
            <input type="checkbox" />
          </div>
        </div>

        <button className="jobs-filter-apply__btn">Apply filter</button>
      </form>
    </div>
  );
};

const Jobs = () => {
  return (
    <div>
      <div className="jobs__wrapper">
        <div className="jobs-search-filter__wrapper">
          <h4>Filter by</h4>
          <br />
          <JobsFilter />
        </div>

        <div className="jobs-contents__wrapper">
          <div className="jobs-content-card__wrapper">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <h4>Aaron Sierra</h4>
                  <p style={{ fontSize: "11px", fontWeight: "bold" }}>
                    Preferred Date: 11/12/2024
                  </p>
                </div>
                <p style={{ fontSize: "11px" }}>Looking for a Nurse</p>
              </div>
              <button className="jobs-content-card__btn">Accept Job</button>
            </div>
            <p style={{ fontSize: "11px" }}>TGIY123</p>

            <p style={{ fontSize: "11px" }}>aaron@gmail.com</p>
            <p style={{ fontSize: "11px" }}>021021021</p>
            <br />
            <p className="jobs-content-comment">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
              repudiandae deserunt minima nemo rem suscipit, eveniet quo sunt
              inventore aliquid voluptas quod ullam optio. Voluptas temporibus
              similique voluptate nam quas.
            </p>
          </div>
          <div className="jobs-content-card__wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
