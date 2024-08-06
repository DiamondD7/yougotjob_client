import React, { useEffect, useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import { GetHealthPractitionerData } from "../../assets/js/serverApi";

import "../../styles/communicationstyles.css";
const PatientComms = () => {
  //add the background highlight when clicked once i have data.
  const [searchData, setSearchData] = useState([]);
  const [searchLoad, setSearchLoad] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [chosenConvo, setChosenConvo] = useState([]);

  useEffect(() => {
    if (searchField.length > 0) {
      fetch(GetHealthPractitionerData)
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            setSearchLoad(false);
          }, 3000);
          setSearchData(data);
        });
    } else {
      setSearchLoad(true); //set the loading to true after clearing the searchField or if the searchField is empty
      return;
    }
  }, [searchField]);

  const filteredData = searchData.filter((data) =>
    data.fullName.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleOpenConvo = (data) => {
    setSearchField("");
    setChosenConvo(data);
  };
  return (
    <div>
      <div className="communication-container__wrapper">
        <div className="communication-profiles__wrapper">
          <input
            className="search-profile__input"
            type="text"
            placeholder="search"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />

          {searchField && (
            <div className="search-container__wrapper">
              {filteredData.length <= 0 ? (
                <p className="nothing-to-show__text">nothing to show</p>
              ) : (
                ""
              )}
              {searchLoad === false ? (
                filteredData.map((data, index) => (
                  <div className="search-details__wrapper" key={index}>
                    <button
                      className="search-details__btns"
                      onClick={() => handleOpenConvo(data)}
                    >
                      <p>Dr.{data.fullName}</p>{" "}
                      <p>#{data.registrationNumber}</p>
                    </button>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginTop: "60px",
                  }}
                >
                  <CircleNotch
                    size={15}
                    className={"communication-loading__icon"}
                  />
                </div>
              )}
            </div>
          )}

          {/* <button className="profile-label__wrapper">Aaron Sierra</button>

          <button className="profile-label__wrapper">Dr. Raeann Sierra</button>
          <button className="profile-label__wrapper">Mikel Sierra</button>

          <button className="profile-label__wrapper">Sean Sierra</button> */}
        </div>

        {chosenConvo.length <= 0 ? (
          <div></div>
        ) : (
          <div>
            <div className="convo-details__wrapper">
              <h3>Dr {chosenConvo.fullName}</h3>
            </div>
            <div className="convo-container__wrapper">
              {/* <div className="recieved-message-container__wrapper">
                <div className="recieved-message__wrapper">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                    ipsam distinctio assumenda maxime nobis, laborum alias
                    facilis blanditiis doloribus excepturi ea, similique, libero
                    dicta minima inventore sit ipsum perferendis tempora. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                    repudiandae nostrum reiciendis nemo non quia doloribus,
                    cupiditate deserunt. Minus itaque quis eveniet vitae
                    excepturi porro, error enim cumque mollitia reiciendis.
                  </p>
                </div>
                <label className="message-timestamp">12:30 PM</label>
              </div>
              <div className="user-message-container__wrapper">
                <label className="message-timestamp">12:33 PM</label>
                <div className="user-message__wrapper">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                    ipsam distinctio assumenda maxime nobis, laborum alias
                    facilis blanditiis doloribus excepturi ea, similique, libero
                    dicta minima inventore sit ipsum perferendis tempora. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                    repudiandae nostrum reiciendis nemo non quia doloribus,
                    cupiditate deserunt. Minus itaque quis eveniet vitae
                    excepturi porro, error enim cumque mollitia reiciendis.
                  </p>
                </div>
              </div>
              <div className="recieved-message-container__wrapper">
                <div className="recieved-message__wrapper">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                    ipsam distinctio assumenda maxime nobis, laborum alias
                    facilis blanditiis doloribus excepturi ea, similique, libero
                    dicta minima inventore sit ipsum perferendis tempora. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                    repudiandae nostrum reiciendis nemo non quia doloribus,
                    cupiditate deserunt. Minus itaque quis eveniet vitae
                    excepturi porro, error enim cumque mollitia reiciendis.
                  </p>
                </div>
                <div>
                  <label className="message-timestamp">12:38 PM</label>
                </div>
              </div> */}
            </div>
            <textarea
              className="textbox-message"
              placeholder="Write your message here..."
            ></textarea>
            <br />
            <button className="send-btn">send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientComms;
