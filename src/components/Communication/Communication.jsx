import React from "react";

import "../../styles/communicationstyles.css";
const Communication = () => {
  //add the background highlight when clicked once i have data.
  return (
    <div>
      <div className="communication-container__wrapper">
        <div className="communication-profiles__wrapper">
          <input
            className="search-profile__input"
            type="text"
            placeholder="search"
          />

          <button className="profile-label__wrapper">Aaron Sierra</button>

          <button className="profile-label__wrapper">Dr. Raeann Sierra</button>
          <button className="profile-label__wrapper">Mikel Sierra</button>

          <button className="profile-label__wrapper">Sean Sierra</button>
        </div>

        <div>
          <div className="convo-details__wrapper">
            <h3>Dr Raeann Sierra</h3>
          </div>
          <div className="convo-container__wrapper">
            <div className="recieved-message-container__wrapper">
              <div className="recieved-message__wrapper">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                  ipsam distinctio assumenda maxime nobis, laborum alias facilis
                  blanditiis doloribus excepturi ea, similique, libero dicta
                  minima inventore sit ipsum perferendis tempora. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eligendi
                  repudiandae nostrum reiciendis nemo non quia doloribus,
                  cupiditate deserunt. Minus itaque quis eveniet vitae excepturi
                  porro, error enim cumque mollitia reiciendis.
                </p>
              </div>
              <label className="message-timestamp">12:30 PM</label>
            </div>
            <div className="user-message-container__wrapper">
              <label className="message-timestamp">12:33 PM</label>
              <div className="user-message__wrapper">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                  ipsam distinctio assumenda maxime nobis, laborum alias facilis
                  blanditiis doloribus excepturi ea, similique, libero dicta
                  minima inventore sit ipsum perferendis tempora. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eligendi
                  repudiandae nostrum reiciendis nemo non quia doloribus,
                  cupiditate deserunt. Minus itaque quis eveniet vitae excepturi
                  porro, error enim cumque mollitia reiciendis.
                </p>
              </div>
            </div>
            <div className="recieved-message-container__wrapper">
              <div className="recieved-message__wrapper">
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                  ipsam distinctio assumenda maxime nobis, laborum alias facilis
                  blanditiis doloribus excepturi ea, similique, libero dicta
                  minima inventore sit ipsum perferendis tempora. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eligendi
                  repudiandae nostrum reiciendis nemo non quia doloribus,
                  cupiditate deserunt. Minus itaque quis eveniet vitae excepturi
                  porro, error enim cumque mollitia reiciendis.
                </p>
              </div>
              <div>
                <label className="message-timestamp">12:38 PM</label>
              </div>
            </div>
          </div>
          <textarea
            className="textbox-message"
            placeholder="Write your message here..."
          ></textarea>
          <br />
          <button className="send-btn">send</button>
        </div>
      </div>
    </div>
  );
};

export default Communication;
