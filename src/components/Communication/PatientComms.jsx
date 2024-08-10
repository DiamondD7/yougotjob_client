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
  const [sentMessage, setSentMessage] = useState(false);
  const [messageField, setMessageField] = useState("");
  const today = new Date();

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

  const mappingData = chatData.map((items, index) => {
    const nextItem = chatData[index + 1];
    const prevs = chatData[index - 1];
    return (
      <div key={items.id}>
        {handleReadableDateFormat(items.createdAt) !== //if the current item.createdAt is not equal today then dont use "today"
          today.toLocaleDateString() &&
        today.toLocaleDateString() !==
          handleReadableDateFormat(nextItem?.createdAt) ? ( // if todays date is not equal to the nextItem's date
          handleReadableDateFormat(items?.createdAt) ===
          handleReadableDateFormat(prevs?.createdAt) ? ( //if the current createdAt is equal to the previous then just return nothing
            ""
          ) : (
            //else return the date of the convo
            <p className="message-timestamp">
              {handleReadableDateFormat(items.createdAt)}
            </p>
          )
        ) : handleReadableDateFormat(items?.createdAt) ===
          handleReadableDateFormat(prevs?.createdAt) ? ( //if the current item.createdAt is equal to the previous then return nothing
          ""
        ) : (
          //else if the item is equal the todays date, then return "today"
          <p className="message-timestamp">today</p>
        )}

        {items.userId === currentUserId ? (
          <div className="user-message-container__wrapper">
            <label className="message-timestamp">
              {handleReadableTimeFormat(items.createdAt)}
            </label>
            <div className="user-message__wrapper">
              <p>{items.message}</p>
            </div>
          </div>
        ) : (
          <div className="recieved-message-container__wrapper" key={items.id}>
            <div className="recieved-message__wrapper">
              <p>{items.message}</p>
            </div>
            <label className="message-timestamp">
              {handleReadableTimeFormat(items.createdAt)}
            </label>
          </div>
        )}
      </div>
    );
  });
  return (
    <div>
      <div className="convo-details__wrapper">
        <h3>Dr {chosenConvo.fullName || chosenConvo.name}</h3>
      </div>
      <div className="convo-container__wrapper">
        {chatData.length <= 0 ? (
          <div>
            <h1>No Conversation yet</h1>
          </div>
        ) : (
          <>{mappingData}</> //handles the date stamp of the convo
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
    setChatId(data.id);
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
