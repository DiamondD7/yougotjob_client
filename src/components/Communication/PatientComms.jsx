import React, { useEffect, useState, useRef } from "react";
import {
  CircleNotch,
  Trash,
  MagnifyingGlass,
  Paperclip,
} from "@phosphor-icons/react";
import {
  GetCurrentConvo,
  GetHealthPractitionerData,
  GetSpecificChatMessage,
  GetSpecificChatHistory,
  AddChatHistory,
  AddChatMessage,
  UpdateLastChatHistory,
  DeleteChatHistory,
  GetPatient,
  GetChatHistoryIdFromUserId,
  RemoveChatMessages,
  UpdateDeleteChatHistory,
  MarkMessageAsSeen,
  UpdateRecentMessage,
  MarkChatHistoryAsSeen,
} from "../../assets/js/serverApi";
import * as signalR from "@microsoft/signalr";
import Messages from "./ComponentsCom/Messages";

import "../../styles/communicationstyles.css";

const ChatConvo = ({
  patient,
  chosenConvo,
  chatId,
  setChatId,
  refreshList,
  setActiveChatHistory,
  setChosenConvo,
  setExistingChats,
  markChatHistorySeen,
  recipientId,
  setRecipientId,
}) => {
  const currentRole = sessionStorage.getItem("role");
  const currentUserId = parseInt(sessionStorage.getItem("id"));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [chatUserSender, setChatUserSender] = useState([]);
  const [sentMessage, setSentMessage] = useState(false);
  const [messageField, setMessageField] = useState("");

  const [connection, setConnection] = useState();

  const divScroll = useRef(null);
  useEffect(() => {
    //handles the automatic scrolling to the most recent message.
    if (divScroll.current) {
      divScroll.current.scrollTop = divScroll.current.scrollHeight;
    }
  }, [refreshData, sentMessage, chatUserSender]);

  useEffect(() => {
    //connection for the SignalR
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7110/chatHub")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    // Create and start the SignalR connection

    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR");
        })
        .catch((err) => console.log("Error connecting to SignalR:", err));

      // Listen for messages from the hub
      connection.on("ReceiveMessage", (chatMessage) => {
        setRecipientId(chatMessage.recipientId);
        const dateNow = new Date();

        const localISOTime = new Date(
          dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

        setChatUserSender((prevMessages) => [...prevMessages, chatMessage]);

        setSentMessage(true);
      });

      connection.on("DeleteMessage", (messageId) => {
        //handles the real-time delete message
        setChatUserSender((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId ? { ...msg, isUnsent: true } : msg
          )
        );
        setSentMessage(true);
      });

      connection.on("MarkMessageSeen", (chatHistoryId, senderId) => {
        //handles message seen
        if (currentUserId !== senderId) {
          setChatUserSender((prevMessages) =>
            prevMessages.map((msg) =>
              msg.chatHistoryId === chatHistoryId && senderId !== currentUserId
                ? { ...msg, isSeen: true }
                : msg
            )
          );

          if (
            //checks if the user is the recipient and if the user opens their convo hence chatHistoryId === chosenConvo.id
            chatHistoryId === chosenConvo.id &&
            currentUserId === recipientId
          ) {
            //this handles the convo history when the recipient opens the convo with new messages.
            //hence hasSeenMessages becomes true.
            setExistingChats((prev) =>
              prev.map((convo) =>
                convo.id === chatHistoryId
                  ? { ...convo, hasSeenMessages: true }
                  : convo
              )
            );
            markChatHistorySeen(chatHistoryId, true); //true because it has been seen by the recipient.
          }
        }
      });
    }

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  const getMessageRefresh = () => {
    //fetches messages api
    fetch(GetSpecificChatMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        chatHistoryId: chatId,
        recipientId: chosenConvo.id, //this is the id for the chosen convo in the search to get the chatHistoryId to check whether chat already exists
        SenderId: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setChatUserSender(res.returnStatus.data);
        setRefreshData(true);
      });
  };

  const markMessageSeen = () => {
    const dateNow = new Date();

    const localISOTime = new Date(
      dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

    fetch(MarkMessageAsSeen, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ChatHistoryId: chosenConvo.id,
        LastSeen: localISOTime,
        SenderId: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        //console.log(res);

        if (connection) {
          await connection.invoke(
            "MarkMessageSeen",
            chosenConvo.id,
            currentUserId
          );
        }
      });
  };

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
        UserInitiatorId: id, //Patient is always the initiator
        UserRecipientId: chosenConvo.id, //Health Practitioners are always the Recipient
        InitiatorName: patient.fullName,
        RecipientName: chosenConvo.fullName,
        Created: localISOTime,
        LastUpdated: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.returnStatus.status === true) {
          handleAddChatMessage(e, data.returnStatus.chatId);
          handleUpdateDeletedConvo(data.returnStatus.chatId);
          setChatId(data.returnStatus.chatId); //setting the newly made chatId
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateDeletedConvo = (id) => {
    fetch(UpdateDeleteChatHistory, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: id,
        IsDeleted: false,
        DeletedById: 0,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setActiveChatHistory(id); //makes sure that chat history is updated when active.
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

    //Initialisation and conditioning ----
    let userInitiator = chosenConvo.userInitiatorId;
    let userRecipient = chosenConvo.userRecipientId;

    if (userInitiator === undefined && userRecipient === undefined) {
      //if the convo is empty then just use the id from session and chosenConvo.id for the practitioner id
      userInitiator = id;
      userRecipient = chosenConvo.id;
    }

    //-----

    fetch(AddChatMessage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ChatHistoryId: chatHistoryId,
        SenderId: id, //senderId is the sender of the message
        InitiatorId: userInitiator, //initiatorid is the one that initiates the convo which is Patient
        RecipientId: userRecipient, //recipientId is the one that reciever of the convo which is the health pracitioners/professionals
        message: messageField,
        CreatedAt: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleUpdateRecentMessage(
          chatHistoryId,
          messageField,
          localISOTime,
          data.returnStatus.messageId
        );
        setSentMessage(true); //setting to true if a user has sent a message
        setMessageField(""); //setting to empty string after a user sends a message
        //getMessageRefresh(); //refreshes the current convo messages
      });
  };

  const handleUpdateRecentMessage = (
    chatHistoryId,
    message,
    date,
    messageId
  ) => {
    fetch(UpdateRecentMessage, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: chatHistoryId,
        MostRecentMessage: message,
        RecentMessageDate: date,
        RecentMessageId: messageId,
        RecentMessageIsUnsent: false,
        SenderRecentMessage: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        handleLastUpdate();
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
        refreshList();
      });
  };

  const handleDeleteConvo = (e, id) => {
    e.preventDefault();
    const userId = parseInt(sessionStorage.getItem("id"));

    const dateNow = new Date();
    const localISOTime = new Date(
      dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

    fetch(DeleteChatHistory, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: id,
        IsDeleted: true,
        DeletedById: userId,
        DeletedAt: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setChosenConvo([]); //empty the chosenConvo when deleting so that it refreshes the page with a blank page.
        handleRemoveChatMessages(id); //calling function to also update the remove properties in the chatMessage.
      });
  };

  const handleRemoveChatMessages = (id) => {
    //updates isRemovedById to the currentUserId and isRemoved to true so that it deletes/removes previous data
    //from the user incase they start a message again with the same person/chat.
    fetch(RemoveChatMessages, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        chatHistoryId: id,
        isRemovedById: currentUserId,
        isRemoved: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        refreshList();
        setOpenDeleteModal(false);
      });
  };

  useEffect(() => {
    getMessageRefresh();
    setSentMessage(false);
    markMessageSeen(); //when user opens the convo, it means they have seen the recent messages.
    //console.log(chosenConvo);
    // console.log("senderRecentMessage", chosenConvo.senderRecentMessage);
    // console.log("currentUserId", currentUserId);
    // if (chosenConvo.senderRecentMessage !== currentUserId) {
    //   markMessageSeen(); //when user opens the convo, it means they have seen the recent messages.
    // }
  }, [connection, chosenConvo, sentMessage, chatId]);
  //connection is the SignalR connection

  //-----------------------------------------
  return (
    <div>
      {openDeleteModal === true ? <div className="overlay"></div> : ""}

      {openDeleteModal === true ? (
        <div className="convo-delete-modal__wrapper">
          <h3>Delete Conversation?</h3>
          <div className="convo-delete-confirmation__wrapper">
            <button
              className="convo-delete-cancel__btn"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="convo-delete-delete__btn"
              onClick={(e) => handleDeleteConvo(e, chatId)}
            >
              <Trash size={14} color="#7DA04C" weight="bold" /> Delete
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="convo-details__wrapper">
        {currentRole === "Patient" ? (
          <h3>Dr. {chosenConvo.recipientName || chosenConvo.fullName}</h3>
        ) : (
          <h3>{chosenConvo.initiatorName}</h3>
        )}

        <div className="convo-details-btns__wrapper">
          {currentRole === "Patient" ? (
            <button
              className="convo-details-delete__btn"
              onClick={() => setOpenDeleteModal(true)}
            >
              <Trash size={14} color="#7DA04C" weight="bold" /> Delete
              Conversation
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="convo-container__wrapper" ref={divScroll}>
        {chatUserSender.length <= 0 ? (
          <div>
            <h1>No Conversation yet</h1>
          </div>
        ) : (
          <Messages
            connection={connection}
            getMessageRefresh={getMessageRefresh}
            currentUserId={currentUserId}
            chatUserSender={chatUserSender}
            currentRole={currentRole}
            chosenConvo={chosenConvo}
          />
        )}
      </div>

      <textarea
        className="textbox-message"
        placeholder="Write your message here..."
        value={messageField}
        onChange={(e) => setMessageField(e.target.value)}
      ></textarea>
      <br />
      <div className="send-buttons-options__wrapper">
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

        <button className="paperclip__btn">
          <Paperclip size={20} color="rgba(0,0,0,0.4)" />
        </button>
      </div>
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
  const [patient, setPatient] = useState([]);
  const [recipientId, setRecipientId] = useState(0);

  const [connection, setConnection] = useState();

  const currentUserId = parseInt(sessionStorage.getItem("id"));
  const currentUserRole = sessionStorage.getItem("role");

  useEffect(() => {
    refreshList(); // calling refreshList() to update chatHistory list
  }, [chatId]); //run when chatId changes

  const refreshList = () => {
    fetch(`${GetSpecificChatHistory}/${currentUserId}`)
      .then((res) => res.json())
      .then((res) => {
        setExistingChats(res.returnStatus.data);
      });
  };

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7110/chatHub")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    // Create and start the SignalR connection

    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR");
        })
        .catch((err) => console.log("Error connecting to SignalR:", err));

      // Listen for new messages in hub
      connection.on("ReceiveMessage", (chatMessage) => {
        const dateNow = new Date();

        const localISOTime = new Date(
          dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

        setExistingChats(
          (prev) =>
            prev
              .map((convo) =>
                convo.id === chatMessage.chatHistoryId
                  ? {
                      ...convo,
                      lastUpdated: localISOTime,
                      senderRecentMessage: chatMessage.senderId,
                      mostRecentMessage: chatMessage.message,
                      recentMessageDate: localISOTime,
                      hasSeenMessages: false,
                    }
                  : convo
              )
              .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)) // Sort by lastUpdated in descending order
        );
        markChatHistorySeen(chatMessage.chatHistoryId, false); //true because it has been seen by the recipient.
      });

      connection.on("RecentMessageUnsent", (chatHistory) => {
        const dateNow = new Date();

        const localISOTime = new Date(
          dateNow.getTime() - dateNow.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, -1); // Remove the 'Z' in example: 2024-08-08T12:34:56.789Z which indicates UTC.

        setExistingChats(
          (prev) =>
            prev
              .map((convo) =>
                convo.id === chatHistory.id
                  ? {
                      ...convo,
                      lastUpdated: localISOTime,
                      mostRecentMessage: chatHistory.mostRecentMessage,
                      recentMessageId: chatHistory.recentMessageId,
                      recentMessageIsUnsent: chatHistory.recentMessageIsUnsent,
                      hasSeenMessages: false,
                    }
                  : convo
              )
              .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)) // Sort by lastUpdated in descending order
        );
        markChatHistorySeen(chatHistory.id, false); //true because it has been seen by the recipient.
      });

      // connection.on("UpdateRecentMessage", (id, message, date) => {
      //   setExistingChats((prev) =>
      //     prev.map((convo) =>
      //       convo.id === id
      //         ? {
      //             ...convo,
      //             mostRecentMessage: message,
      //             recentMessageDate: date,
      //           }
      //         : convo
      //     )
      //   );
      // });

      connection.on("MarkChatHistorySeen", (chatHistoryId, senderId) => {
        //setIsConvoSeen(senderId !== currentUserId ? true : false);
        markChatHistorySeen(chatHistoryId, true); //true because it has been seen by the recipient.

        setExistingChats((prev) =>
          prev.map((convo) =>
            convo.id === chatHistoryId
              ? { ...convo, hasSeenMessages: true }
              : convo
          )
        );
      });
    }

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

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

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role === "Patient") {
      fetch(`${GetPatient}/${currentUserId}`)
        .then((res) => res.json())
        .then((res) => {
          setPatient(res); //getting the patients' data when the currentUser is a Patient
          //it is to use their names in the InitiatorName in the <ChatConvo/> container
        });
    }
  }, []);

  const filteredData = searchData.filter((data) =>
    data.fullName.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleOpenConvo = (data) => {
    //opens a convo from the search
    setSearchField(""); //when choosing a convo, delete the texts in the searchField.
    setChosenConvo(data); //chosenConvo when opening a new convo uses the recipient's data.

    //calling function
    getChatIdFromUserId(currentUserId, data.id); //data.id is the userRecipientId and currentUserId is the userInitiatorId (Patient)
  };

  const getChatIdFromUserId = (userInitiator, userRecipientId) => {
    //this function gets the id of the Patient and the searched Practitioner, then in the backend: gets the chatHistoryId if it is existing
    //if not existing chat, then use the Patient Id to be the chatId so that when starting a new convo, it uses the Patient Id to create a new
    //chatHistoryId. To be added to the Chat History Conversations.
    fetch(GetChatHistoryIdFromUserId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userInitiatorId: userInitiator, //to look for the chatHistoryId using the users' id when they are searched in the search bar
        userRecipientId: userRecipientId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setChatId(res.returnStatus.chatId); //setting this to the chatHistoryId to find the existing chat, if not found then use Patient Id (temporarily)
        setActiveChatHistory(res.returnStatus.chatId); //setting the active chat to the chatId, if chatId is not found; then it wont highligh any chat
      });
  };

  const markChatHistorySeen = (chatHistoryId, isSeen) => {
    fetch(MarkChatHistoryAsSeen, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: chatHistoryId,
        HasSeenMessages: isSeen,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        //refreshList();
      });
  };

  const handleOpenExistingConvo = async (data) => {
    //opens an existing convo
    setChosenConvo(data);
    setChatId(data.id);
    setActiveChatHistory(data.id);
    setRecipientId(data.userInitiatorId);
    if (connection && data.senderRecentMessage !== currentUserId) {
      await connection.invoke("MarkChatHistorySeen", data.id, currentUserId);
    }
  };

  const handleReadableTimeFormat = (date) => {
    const readableTime = new Date(date).toLocaleTimeString();
    return readableTime;
  };

  return (
    <div>
      <div className="communication-container__wrapper">
        <div className="communication-profiles__wrapper">
          {currentUserRole === "Patient" ? (
            <div className="communication-search-profile__wrapper">
              <MagnifyingGlass size={20} color="#515151" />
              <input
                className="search-profile__input"
                type="text"
                placeholder="search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}

          {searchField && (
            <div className="search-container__wrapper">
              {searchLoad === false && filteredData.length === 0 ? (
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

          <p style={{ marginTop: "20px" }}>Conversations</p>
          {existingChats.map((items, index) => (
            <div
              className="profile-chatHistory-container__wrapper"
              key={items.id}
            >
              <div
                className={`profile-chathistory__wrapper ${
                  activeChatHistory === items.id
                    ? "profile-chathistory-chosen"
                    : ""
                }`}
              >
                <button
                  className={`profile-chathistory-btn ${
                    items.unopenedConversation === true &&
                    items.senderLastId !== currentUserId
                      ? "unopenedConvo"
                      : ""
                  }`}
                  onClick={() => handleOpenExistingConvo(items)}
                >
                  {currentUserRole === "Patient" //if the currentUser is a Patient then, show the one they message which is the recipient, vice versa.
                    ? items.recipientName
                    : items.initiatorName}

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      className={`profile-chatHistory-recentMessage__text ${
                        items.hasSeenMessages === false &&
                        items.senderRecentMessage !== currentUserId
                          ? "message-not-seen"
                          : ""
                      }`}
                    >
                      {items.mostRecentMessage}
                    </p>
                    <p className="profile-chatHistory-recentMessageDate">
                      {handleReadableTimeFormat(items.recentMessageDate)}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {chosenConvo.length <= 0 ? (
          <div></div>
        ) : (
          <div>
            <ChatConvo
              patient={patient}
              chosenConvo={chosenConvo}
              chatId={chatId}
              setActiveChatHistory={setActiveChatHistory}
              setChatId={setChatId}
              refreshList={refreshList}
              setChosenConvo={setChosenConvo}
              setExistingChats={setExistingChats}
              markChatHistorySeen={markChatHistorySeen}
              recipientId={recipientId}
              setRecipientId={setRecipientId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientComms;
