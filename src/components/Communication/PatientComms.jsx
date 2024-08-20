import React, { useEffect, useState, useRef } from "react";
import {
  CircleNotch,
  TrashSimple,
  DotsThree,
  X,
  PencilSimple,
} from "@phosphor-icons/react";
import {
  GetHealthPractitionerData,
  GetSpecificChatMessage,
  GetSpecificChatHistory,
  AddChatHistory,
  AddChatMessage,
  UpdateLastChatHistory,
  DeleteChatHistory,
  DeleteChatMessage,
} from "../../assets/js/serverApi";

import "../../styles/communicationstyles.css";

const ChatConvo = ({ chosenConvo, chatId, setChatId, refreshList }) => {
  const currentUserId = parseInt(sessionStorage.getItem("id"));
  const [refreshData, setRefreshData] = useState(false);
  const [chatUserSender, setChatUserSender] = useState([]);
  const [chatRecipient, setChatRecipient] = useState([]);
  const [sentMessage, setSentMessage] = useState(false);
  const [messageField, setMessageField] = useState("");
  const [menuDotsId, setMenuDotsId] = useState(0);
  const [deleteOptions, setDeleteOptions] = useState(false);

  const today = new Date();
  const divScroll = useRef(null);

  useEffect(() => {
    if (divScroll.current) {
      divScroll.current.scrollTop = divScroll.current.scrollHeight;
    }
  }, [chatUserSender, sentMessage]);

  useEffect(() => {
    fetch(GetSpecificChatMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        chatHistoryId: chatId,
        userId: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setChatUserSender(res.returnStatus.data.chatHistoryMessagesUser);
        //setChatRecipient()
        setSentMessage(false);
        setRefreshData(false);
      });
  }, [sentMessage, chatId, refreshData]);

  const handleAddChatConvo = (e) => {
    e.preventDefault();
    //adds chatconvo for new chats
    const id = parseInt(sessionStorage.getItem("id"));
    const dateNow = new Date();

    const localISOTime = new Date(
      dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.
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
        Created: localISOTime,
        LastUpdated: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.returnStatus.status === true) {
          handleAddChatMessage(e, data.returnStatus.chatId);
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
        if (chatUserSender.length != 0) {
          handleLastUpdate();
        }
        setSentMessage(true);
        setMessageField("");
      });
  };

  const handleLastUpdate = () => {
    const dateNow = new Date();

    const localISOTime = new Date(
      dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

    fetch(UpdateLastChatHistory, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ LastUpdated: localISOTime, Id: chatId }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        refreshList();
      });
  };

  const handleDeleteMessage = (e, id) => {
    e.preventDefault();

    const dateNow = new Date();
    const localISOTime = new Date(
      dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

    fetch(DeleteChatMessage, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: id,
        IsDeleted: true,
        DeletedById: currentUserId,
        DeletedAt: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //delete log
        setRefreshData(true);
      });
  };

  const handleMenuModalSetting = (id) => {
    if (id === menuDotsId) {
      setMenuDotsId(0); //setting the id to 0 to close the modal
    } else {
      setMenuDotsId(id); //setting the ID so that the 3 dots menu will only open at the right message(container)
    }
    setDeleteOptions(false); //setting to false to close the delete option container
  };

  const handleReadableTimeFormat = (date) => {
    const readableTime = new Date(date).toLocaleTimeString();
    return readableTime;
  };

  const handleReadableDateFormat = (date) => {
    const readableDate = new Date(date).toLocaleDateString("en-NZ");

    return readableDate;
  };

  const mappingData = chatUserSender.map((items, index) => {
    const nextItem = chatUserSender[index + 1];
    const prevs = chatUserSender[index - 1];
    return (
      <div key={items.id}>
        {handleReadableDateFormat(items.createdAt) !== //if the current item.createdAt is not equal today then dont use "today"
          today.toLocaleDateString("en-NZ") &&
        today.toLocaleDateString() !==
          handleReadableDateFormat(nextItem?.createdAt) ? ( // if todays date is not equal to the nextItem's date
          handleReadableDateFormat(items?.createdAt) ===
          handleReadableDateFormat(prevs?.createdAt) ? ( //if the current createdAt is equal to the previous then just return nothing
            ""
          ) : (
            //else return the date of the convo
            <p className="message-datestamp">
              {handleReadableDateFormat(items.createdAt)}
            </p>
          )
        ) : handleReadableDateFormat(items?.createdAt) ===
          handleReadableDateFormat(prevs?.createdAt) ? ( //if the current item.createdAt is equal to the previous then return nothing
          ""
        ) : (
          //else if the item is equal the todays date, then return "today"
          <p className="message-datestamp">today</p>
        )}

        {items.userId === currentUserId ? (
          <div className="user-message-container__wrapper">
            {items.isDeleted === false &&
            items.deletedById !== currentUserId ? (
              <div>
                <div className="user-message-dots-menu">
                  <button
                    className="user-message-dots-button"
                    onClick={() => handleMenuModalSetting(items.id)}
                  >
                    {items.id === menuDotsId ? (
                      <X size={15} />
                    ) : (
                      <DotsThree size={19} />
                    )}
                  </button>
                  {items.id === menuDotsId ? (
                    <div className="menu-three-modal__wrapper">
                      <button
                        className="menu-trash-button"
                        onClick={() => setDeleteOptions(true)}
                      >
                        <TrashSimple size={15} color="#ed2c2c" />
                      </button>
                      <div
                        className={`menu-trash-options-container__wrapper ${
                          deleteOptions === true ? "" : "hide"
                        }`}
                      >
                        <div className="menu-trash-options__wrapper">
                          <TrashSimple size={15} color="#f3f3f3" />

                          <button
                            onClick={(e) => handleDeleteMessage(e, items.id)}
                          >
                            Delete for yourself
                          </button>
                          <button>Unsend</button>
                        </div>
                      </div>
                      <button className="menu-edit-button">
                        <PencilSimple size={15} />
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <label className="message-timestamp">
                  {handleReadableTimeFormat(items.createdAt)}
                </label>
                <div className="user-message__wrapper">
                  <p>{items.message}</p>
                </div>
              </div>
            ) : (
              ""
            )}
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
      <div className="convo-container__wrapper" ref={divScroll}>
        {chatUserSender.length <= 0 ? (
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
        value={messageField}
        onChange={(e) => setMessageField(e.target.value)}
      ></textarea>
      <br />
      {chatUserSender.length <= 0 ? (
        <button className="send-btn" onClick={(e) => handleAddChatConvo(e)}>
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
  const [activeChatHistory, setActiveChatHistory] = useState(0);
  const [chatId, setChatId] = useState(0);
  const [existingChats, setExistingChats] = useState([]);

  useEffect(() => {
    refreshList(); // calling refreshList() to update chatHistory list
  }, [chatId]);

  const refreshList = () => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetSpecificChatHistory}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setExistingChats(res.returnStatus.data);
      });
  };

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
    setActiveChatHistory(data.id);
  };

  const handleDeleteConvo = (e, id) => {
    e.preventDefault();
    fetch(`${DeleteChatHistory}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setChosenConvo([]);
        refreshList();
      });
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
            <div
              className={`profile-chathistory__wrapper ${
                activeChatHistory === items.id
                  ? "profile-chathistory-chosen"
                  : ""
              }`}
              key={items.id}
            >
              <button
                className="profile-chathistory-btn"
                onClick={() => handleOpenExistingConvo(items)}
              >
                {items.name}
              </button>
              <button
                className="profile-chathistory-trash-btn"
                onClick={(e) => handleDeleteConvo(e, items.id)}
              >
                <TrashSimple size={17} color="#ed2c2c" />
              </button>
            </div>
          ))}
        </div>

        {chosenConvo.length <= 0 ? (
          <div></div>
        ) : (
          <div>
            <ChatConvo
              chosenConvo={chosenConvo}
              chatId={chatId}
              setChatId={setChatId}
              refreshList={refreshList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientComms;
