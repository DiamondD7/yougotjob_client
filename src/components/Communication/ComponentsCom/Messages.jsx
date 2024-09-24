import React, { useState } from "react";
import { Trash, DotsThree, X } from "@phosphor-icons/react";

import {
  DeleteChatMessage,
  UpdateRecentMessage,
} from "../../../assets/js/serverApi";
const Messages = ({
  connection,
  getMessageRefresh,
  currentUserId,
  chatUserSender,
  currentRole,
  chosenConvo,
}) => {
  const [menuDotsId, setMenuDotsId] = useState(null);
  const [deleteOptions, setDeleteOptions] = useState(false);
  const today = new Date();

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
        //console.log(res);
        //setRefreshData(true);

        getMessageRefresh();
      });
  };

  const handleDeleteSenderMessage = (e, id) => {
    e.preventDefault();

    fetch(DeleteChatMessage, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: id,
        DeleteSenderMessage: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        //setRefreshData(true);
        getMessageRefresh();
      });
  };

  const handleUnsentMessage = (e, id) => {
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
        IsUnsent: true,
        IsDeleted: true,
        DeletedById: currentUserId,
        DeletedAt: localISOTime,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        //console.log(res);
        //setRefreshData(true);
        await connection.invoke("DeleteMessage", id);
        //getMessageRefresh();
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
    //maps all messages
    const nextItem = chatUserSender[index + 1];
    const prevs = chatUserSender[index - 1];
    const lastItemIndex = chatUserSender.length - 1;
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
        {items.senderId === currentUserId ? (
          <div className="user-message-container__wrapper">
            {items.isDeleted === false &&
            items.deletedById !== currentUserId &&
            items.isRemovedById !== currentUserId ? (
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
                        <Trash size={15} color="#ed2c2c" />
                      </button>
                      <div
                        className={`menu-trash-options-container__wrapper ${
                          deleteOptions === true ? "" : "hide"
                        }`}
                      >
                        <div className="menu-trash-options__wrapper">
                          <Trash size={15} color="#f3f3f3" />

                          <button
                            onClick={(e) => handleDeleteMessage(e, items.id)}
                          >
                            Delete for yourself
                          </button>
                          <button
                            onClick={(e) => handleUnsentMessage(e, items.id)}
                          >
                            Unsend
                          </button>
                        </div>
                      </div>
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
                {items.isSeen === true && index === lastItemIndex ? (
                  <p className="seen-delivered__text">seen</p>
                ) : items.isSeen === false ? (
                  <p className="seen-delivered__text">delivered</p>
                ) : (
                  ""
                )}
              </div>
            ) : items.isUnsent === true ? (
              <div className="user-message__wrapper">
                <p>
                  <strong>You unsent a message</strong>
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="recieved-message-container__wrapper">
            {items.deleteSenderMessage === false &&
            items.isUnsent === false &&
            items.isRemovedById !== currentUserId ? (
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
                            onClick={(e) =>
                              handleDeleteSenderMessage(e, items.id)
                            }
                          >
                            Delete for yourself
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <label className="message-timestamp">
                  {handleReadableTimeFormat(items.createdAt)}
                </label>
                <div className="recieved-message__wrapper">
                  <p>{items.message}</p>
                </div>
              </div>
            ) : items.isUnsent === true && //if the sender unsent their message
              items.deleteSenderMessage === false ? ( //if recipient deletes the sender's message; if true then, just show nothing because it deleted the message already
              <div className="recieved-message__wrapper">
                {/* this is always the recipientName because the user is a patient. */}
                {currentRole === "Patient" ? (
                  <p>
                    <strong>
                      {chosenConvo.recipientName || chosenConvo.fullName} unsent
                      a message
                    </strong>
                  </p>
                ) : (
                  <p>
                    <strong>
                      {chosenConvo.initiatorName} unsent a message
                    </strong>
                  </p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  });

  return <div>{mappingData}</div>;
};

export default Messages;
