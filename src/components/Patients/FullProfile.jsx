import React, { useState } from "react";
import {
  X,
  CalendarCheck,
  Heartbeat,
  CheckCircle,
  Question,
  PersonArmsSpread,
  Barbell,
  Heart,
  ArrowSquareIn,
} from "@phosphor-icons/react";

const FullProfile = ({ fullProfileData, setOpenFullProfile }) => {
  return (
    <div>
      <div className="full-profile-container__wrapper">
        <div
          className="search-profile-container__wrapper"
          style={{ marginTop: "38px" }}
        >
          <button
            className="full-profile__btn"
            onClick={() => setOpenFullProfile(false)}
          >
            <X size={27} color="#454545" />
          </button>
          <div className="search-profile-header__wrapper">
            <img
              src={fullProfileData.picture}
              alt="test-img"
              className="search-profile__img"
            />
            <div>
              <p className="search-profile-header__texts">
                Nationality: {fullProfileData.nationality}
              </p>
              <p className="search-profile-header__texts">
                DOB: {fullProfileData.dob}
              </p>
              <p className="search-profile-header__texts">
                Age: {fullProfileData.age}
              </p>
              <p className="search-profile-header__texts">
                Height: {fullProfileData.height} cm
              </p>
              <p className="search-profile-header__texts">
                Weight: {fullProfileData.weight} kg
              </p>
            </div>
          </div>
          <p className="search-profile-name__text">
            {fullProfileData.firstName} {fullProfileData.lastName}
          </p>
          <p className="search-profile-nhi__text">NHI: {fullProfileData.nhi}</p>

          <button className="search-profile-moreinformation__btn">
            See all information
          </button>

          <div className="medications-lists__wrapper">
            <table className="medications-list-table__table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dose</th>
                  <th>Frequency</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Phlemytropic</td>
                  <td>150mg</td>
                  <td>1 / day</td>
                  <td>Gout</td>
                </tr>
                <tr>
                  <td>Phlemytropic</td>
                  <td>150mg</td>
                  <td>1 / day</td>
                  <td>Gout</td>
                </tr>
                <tr>
                  <td>Phlemytropic</td>
                  <td>150mg</td>
                  <td>1 / day</td>
                  <td>Gout</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="appointment-history-lists__wrapper">
            <div>
              <div className="appointment-history-header__wrapper">
                <h3>Appointment history</h3>
                <button>view all</button>
              </div>
              <div className="appointment-history__wrapper">
                <div>
                  <CalendarCheck size={17} />
                </div>
                <div>
                  <p>General appointment</p>
                  <p>Dr. Malephosa Juno</p>
                  <p>25/12/2023</p>
                </div>
              </div>
              <div className="appointment-history__wrapper">
                <div>
                  <Heartbeat size={17} />
                </div>
                <div>
                  <p>Cholesterol Test</p>
                  <p>Dr. Henry Chun</p>
                  <p>10/01/2024</p>
                </div>
              </div>
              <div className="appointment-history__wrapper">
                <div>
                  <Heartbeat size={17} />
                </div>
                <div>
                  <p>Cholesterol Test</p>
                  <p>Dr. Henry Chun</p>
                  <p>10/01/2024</p>
                </div>
              </div>
            </div>

            <div>
              <div className="medical-bills-header__wrapper">
                <h3>Medical bills</h3>
                <button>view all</button>
              </div>
              <div className="medical-bills-information__wrapper">
                <div>
                  <p>$50 NZD</p>
                  <p>29/01/2024</p>
                </div>
                <div className="medical-bills-status__wrapper">
                  <Question size={17} color="#d7c60f" /> <p>Pending</p>
                </div>
              </div>
              <div className="medical-bills-information__wrapper">
                <div>
                  <p>$50 NZD</p>
                  <p>10/01/2024</p>
                </div>
                <div className="medical-bills-status__wrapper">
                  <CheckCircle size={17} color="#81bb30" /> <p>Paid</p>
                </div>
              </div>
              <div className="medical-bills-information__wrapper">
                <div>
                  <p>$50 NZD</p>
                  <p>10/01/2024</p>
                </div>
                <div className="medical-bills-status__wrapper">
                  <CheckCircle size={17} color="#81bb30" /> <p>Paid</p>
                </div>
              </div>
              <div className="medical-bills-information__wrapper">
                <div>
                  <p>$50 NZD</p>
                  <p>10/01/2024</p>
                </div>
                <div className="medical-bills-status__wrapper">
                  <CheckCircle size={17} color="#81bb30" /> <p>Paid</p>
                </div>
              </div>
            </div>
          </div>
          <div className="personal-medical-history__wrapper">
            <div>
              <h3>Personal Medical History</h3>
            </div>
            <div className="ul-medical__wrapper">
              <ul>
                <li>Acid Reflux</li>
                <li>Allergy Problems</li>
                <li>Anxiety</li>
                <li>Anxiety</li>
                <li>Anxiety</li>
                <li>Anxiety</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="icons__wrapper">
            <div className="each-icons__wrapper">
              <PersonArmsSpread size={100} weight="thin" color={"#A7CE71"} />
              <p>Height: 160 cm</p>
            </div>

            <div className="each-icons__wrapper">
              <Barbell size={100} weight="thin" color={"#A7CE71"} />
              <p>Weight: 60 kg</p>
            </div>
            <div className="each-icons__wrapper">
              <Heart size={100} weight="thin" color={"#A7CE71"} />
              <p>BMI: 22.9</p>
            </div>
          </div>
          <div className="analysis__wrapper">
            <div>
              <div className="analysis-header__wrapper">
                <h3>Analysis</h3>
                <button>more</button>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "50px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <Heartbeat size={17} />{" "}
                    <label className="analysis-label__text">01 Feb 2024</label>
                  </div>
                  <div>
                    <p className="analysis-p__text">Hemoglobin</p>
                    <label className="analysis-label__text">
                      Awaiting result
                    </label>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <Heartbeat size={17} />{" "}
                    <label className="analysis-label__text">28 Jan 2024</label>
                  </div>
                  <div>
                    <p className="analysis-p__text">Covid</p>
                    <a className="analysis-anchor" href="#">
                      View result{" "}
                      <ArrowSquareIn
                        size={16}
                        weight="thin"
                        color={"#515151"}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <Heartbeat size={17} />{" "}
                    <label className="analysis-label__text">25 Jan 2024</label>
                  </div>
                  <div>
                    <p className="analysis-p__text">Cholesterol</p>
                    <a className="analysis-anchor" href="#">
                      View result{" "}
                      <ArrowSquareIn
                        size={16}
                        weight="thin"
                        color={"#515151"}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <Heartbeat size={17} />{" "}
                    <label className="analysis-label__text">15 Jan 2024</label>
                  </div>
                  <div>
                    <p className="analysis-p__text">Sugar</p>
                    <a className="analysis-anchor" href="#">
                      View result{" "}
                      <ArrowSquareIn
                        size={16}
                        weight="thin"
                        color={"#515151"}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <Heartbeat size={17} />{" "}
                    <label className="analysis-label__text">25 Dev 2023</label>
                  </div>
                  <div>
                    <p className="analysis-p__text">Iron Diffeciency</p>
                    <a className="analysis-anchor" href="#">
                      View result{" "}
                      <ArrowSquareIn
                        size={16}
                        weight="thin"
                        color={"#515151"}
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <Heartbeat size={17} />{" "}
                    <label className="analysis-label__text">2 Nov 2023</label>
                  </div>
                  <div>
                    <p className="analysis-p__text">X-ray</p>
                    <a className="analysis-anchor" href="#">
                      View result{" "}
                      <ArrowSquareIn
                        size={16}
                        weight="thin"
                        color={"#515151"}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProfile;
