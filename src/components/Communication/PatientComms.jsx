import React, { useEffect, useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import {
  GetHealthPractitionerData,
  GetSpecificChatMessage,
  GetSpecificChatHistory,
  AddChatHistory,
  AddChatMessage,
} from "../../assets/js/serverApi";

import "../../styles/communicationstyles.css";
const ChatConvo = ({ chosenConvo, chatId, setChatId }) => {
  const currentUserId = parseInt(sessionStorage.getItem("id"));
  const [chatData, setChatData] = useState([]);
  const [chatHistoryId, setChatHistoryId] = useState(chatId);
  const [sentMessage, setSentMessage] = useState(false);
  const [messageField, setMessageField] = useState("");
  const readableDate = new Date();

  useEffect(() => {
    fetch(GetSpecificChatMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(chatId),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setChatData(res.returnStatus.data);
        setSentMessage(false);
      });
  }, [sentMessage, chatId]);

  const handleAddChatConvo = () => {
    //adds chatconvo for new chats
    const id = parseInt(sessionStorage.getItem("id"));
    const dateNow = new Date();
    fetch(AddChatHistory, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        UserInitiatorId: id,
        UserRecipientId: chosenConvo.id,
        Name: chosenConvo.fullName,
        Created: dateNow.toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.returnStatus.status === true) {
          handleAddChatMessage(data.returnStatus.chatId);
          setChatId(data.returnStatus.chatId);
        }
      });
  };

  const handleAddChatMessage = (e, chatHistoryId) => {
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
    const dateNow = new Date();

    const localISOTime = new Date(
      dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

    fetch(AddChatMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ChatHistoryId: chatHistoryId,
        UserId: id,
        message: messageField,
        CreatedAt: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); //delete log
        setSentMessage(true);
      });
  };

  const handleReadableTimeFormat = (date) => {
    const readableTime = new Date(date).toLocaleTimeString();
    return readableTime;
  };
  const handleReadableDateFormat = (date) => {
    const readableDate = new Date(date).toLocaleDateString();
    return readableDate;
  };

  return (
    <div>
      <div className="convo-details__wrapper">
        <h3>Dr {chosenConvo.fullName || chosenConvo.name}</h3>
      </div>
      <div className="convo-container__wrapper">
        {chatId === 0 ? (
          <div>
            <h1>No Conversation yet</h1>
          </div>
        ) : (
          <>
            <div>
              {chatData.map((items) =>
                items.userId !== currentUserId ? (
                  <div
                    className="recieved-message-container__wrapper"
                    key={items.id}
                  >
                    <div className="recieved-message__wrapper">
                      <p>{items.message}</p>
                    </div>
                    <label className="message-timestamp">12:30 PM</label>
                  </div>
                ) : (
                  ""
                )
              )}

              {chatData.map((items) =>
                items.userId === currentUserId ? (
                  <div
                    className="user-message-container__wrapper"
                    key={items.id}
                  >
                    <label className="message-timestamp">
                      {handleReadableTimeFormat(items.createdAt)}
                    </label>
                    <div className="user-message__wrapper">
                      <p>{items.message}</p>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            {/* <div className="recieved-message-container__wrapper">
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
            </div> */}
          </>
        )}
      </div>

      <textarea
        className="textbox-message"
        placeholder="Write your message here..."
        onChange={(e) => setMessageField(e.target.value)}
      ></textarea>
      <br />
      {chatId === 0 ? (
        <button className="send-btn" onClick={handleAddChatConvo}>
          first message
        </button>
      ) : (
        <button
          className="send-btn"
          onClick={(e) => handleAddChatMessage(e, chatId)}
        >
          send
        </button>
      )}
    </div>
  );
};

const PatientComms = () => {
  //add the background highlight when clicked once i have data.
  const [searchData, setSearchData] = useState([]);
  const [searchLoad, setSearchLoad] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [chosenConvo, setChosenConvo] = useState([]);
  const [chatId, setChatId] = useState(0);
  const [existingChats, setExistingChats] = useState([]);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetSpecificChatHistory}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setExistingChats(res.returnStatus.data);
      });
  }, [chatId]);

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

  const handleOpenExistingConvo = (data) => {
    setChosenConvo(data);
    setChatId(data.id);
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

          {existingChats.map((items, index) => (
            <button
              className="profile-label__wrapper"
              key={index}
              onClick={() => handleOpenExistingConvo(items)}
            >
              {items.name}
            </button>
          ))}

          {/* <button className="profile-label__wrapper">Dr. Raeann Sierra</button>
          <button className="profile-label__wrapper">Mikel Sierra</button>

          <button className="profile-label__wrapper">Sean Sierra</button> */}
        </div>

        {chosenConvo.length <= 0 ? (
          <div></div>
        ) : (
          <div>
            <ChatConvo
              chosenConvo={chosenConvo}
              chatId={chatId}
              setChatId={setChatId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientComms;
