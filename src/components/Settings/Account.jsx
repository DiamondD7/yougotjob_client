import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import {
  GetaHealthPractitioner,
  CreateContact,
  GetEmergencyContact,
  DeleteContact,
  GetCertification,
  AddCertification,
  AddCertficateAttachements,
  GetTheAttachement,
  RemoveCertification,
  UpdateCertification,
  UpdateCertificationAttachment,
  UpdateEmergencyContact,
  UpdateHealthPractitionerData,
  UpdatesTimePreference,
  GetATimePreference,
  GetPatient,
  GetAPatientDateTime,
  UpdatePatientDateTime,
  UpdatePatient,
  GetPatientEmergencyContact,
  AddPatientEmergencyContact,
  UpdatePatientEmergencyContact,
  DeletePatientEmergencyContact,
} from "../../assets/js/serverApi";
import moment from "moment";
import momtimezone from "moment-timezone";

import "../../styles/accountstyles.css";
const Profile = ({ loggedUserData, setLoadData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [fullName, setFullName] = useState(loggedUserData.fullName || ""); //if loggedUserData is refreshed then use the original value else use ""
  const [mobilePhone, setMobilePhone] = useState(
    loggedUserData.mobile || loggedUserData.mobileNumber || ""
  );
  const [emailAddress, setEmailAddress] = useState(
    loggedUserData.emailAddress || ""
  );
  const [homeAddress, setHomeAddress] = useState(
    loggedUserData.homeAddress || ""
  );

  const updatePersonalInformation = (e) => {
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(`${UpdateHealthPractitionerData}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          FullName: fullName,
          Mobile: mobilePhone,
          EmailAddress: emailAddress,
          HomeAddress: homeAddress,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res); //delete c.log
          setOpenEdit(false);
          setLoadData(true);
        });
    } else if (role === "Patient") {
      fetch(`${UpdatePatient}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          FullName: fullName,
          MobileNumber: mobilePhone,
          EmailAddress: emailAddress,
          HomeAddress: homeAddress,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setOpenEdit(false);
          setLoadData(true);
        });
    }
  };

  const handleOpeningEdit = () => {
    //handles when cancelling/opening edit.
    setOpenEdit(!openEdit);
    if (openEdit === true) {
      //if the openEdit is true (which means when the user cancels updating then it will refresh the values to its original value/initial value)
      setFullName(loggedUserData.fullName);
      setMobilePhone(loggedUserData.mobile);
      setEmailAddress(loggedUserData.emailAddress);
      setHomeAddress(loggedUserData.homeAddress);
    }
  };

  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Profile</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="account-profile__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profileheader">
              Personal information
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="account-profile-edit__btn"
                onClick={handleOpeningEdit}
              >
                {openEdit === false ? (
                  <>
                    <Pencil size={15} />
                    Edit
                  </>
                ) : (
                  "Cancel"
                )}
              </button>
              {openEdit === true ? (
                <button
                  className="profile-update__btn"
                  onClick={(e) => updatePersonalInformation(e)}
                >
                  Update
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",

              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <div>
              <p className="account-profile__text profilelabel">Name</p>
            </div>
            <div>
              {openEdit === false ? (
                <p className="account-profile__text profiledetails">
                  {loggedUserData.fullName}
                </p>
              ) : (
                <input
                  className="update-details__input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <p className="account-profile__text profilelabel">Phone</p>

            {openEdit === false ? (
              <p className="account-profile__text profiledetails">
                {loggedUserData.mobile || loggedUserData.mobileNumber}
              </p>
            ) : (
              <input
                className="update-details__input"
                type="text"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
              />
            )}
          </div>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <p className="account-profile__text profilelabel">Email Address</p>
            {openEdit === false ? (
              <p className="account-profile__text profiledetails">
                {loggedUserData.emailAddress}
              </p>
            ) : (
              <input
                className="update-details__input"
                type="text"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            )}
          </div>
          <div
            className={
              openEdit === false ? "address-wrapper" : "editaddress__wrapper"
            }
          >
            <p className="account-profile__text address">Home Address</p>

            {openEdit === false ? (
              <p className="addressdetails">{loggedUserData.homeAddress}</p>
            ) : (
              <input
                className="address-input"
                type="text"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
              />
            )}
          </div>
        </div>

        {sessionStorage.getItem("role") === "Practitioner" && (
          <Certifications />
        )}
      </div>
    </div>
  );
};

const Certifications = () => {
  const [openFormCert, setOpenFormCert] = useState(false); //opens form to add cert
  const [openUpdateFormCert, setOpenUpdateFormCert] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [loadData, setLoadData] = useState(false); //for refreshing page
  const [certData, setCertData] = useState([]);

  const handleUpdateForm = (e, data) => {
    e.preventDefault();
    setOpenUpdateFormCert(true);
    setUpdateData(data);
  };

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetCertification}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCertData(res.returnStatus.data);
        setLoadData(false); //setting back to default state false
      });
  }, [loadData]); //reference loadData to refresh data.

  const handleDeleteData = (e, data) => {
    e.preventDefault();

    fetch(`${RemoveCertification}/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoadData(true); //setting true so that it detects changes. for refreshing container/data
      });
  };

  const formatDateFunction = (str) => {
    const formattedDate = moment(str).format("DD-MM-YYYY");
    return <td>{formattedDate}</td>;
  };
  const formatDate = new Date(); //to format the dates to become readable
  return (
    <div>
      <div>
        <div className="account-profile-certification__wrapper">
          <div style={{ overflow: "auto", height: "150px" }}>
            <p className="account-profile__text certificationheader">
              Certifications
            </p>
            {openFormCert === false && openUpdateFormCert === false ? (
              <div>
                <table className="certification-container__table">
                  <thead>
                    <tr>
                      <th>Certification Name</th>
                      <th>Issuing Organization</th>
                      <th>Date Issued</th>
                      <th>Expiration Date</th>
                      <th>Certification Level</th>
                      <th>Description</th>
                      <th>Attachments</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.certificationName}</td>
                        <td>{data.issuingOrganisation}</td>
                        <td>{formatDateFunction(data.dateIssued)}</td>
                        <td>{formatDateFunction(data.expirationDate)}</td>
                        <td>{data.certificationLevel}</td>
                        <td>
                          {data.certificationDescription.length < 10
                            ? data.certificationDescription
                            : `${data.certificationDescription.substring(
                                0,
                                10
                              )}...`}
                        </td>
                        <td>
                          <a
                            href={`${GetTheAttachement}/${data.certificationId}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        </td>
                        <td style={{ display: "flex", gap: "5px" }}>
                          <button onClick={(e) => handleUpdateForm(e, data)}>
                            <Pencil size={15} />
                          </button>
                          <button onClick={(e) => handleDeleteData(e, data)}>
                            <Trash size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <AddNewCertifications
                certData={certData}
                setLoadData={setLoadData}
                setOpenFormCert={setOpenFormCert}
                openUpdateFormCert={openUpdateFormCert}
                setOpenUpdateFormCert={setOpenUpdateFormCert}
                updateData={updateData}
              />
            )}
          </div>
        </div>
        {openUpdateFormCert === true ? (
          <button
            className="addnew-contact__btn"
            onClick={() => setOpenUpdateFormCert(false)}
          >
            Cancel
          </button>
        ) : (
          <button
            className="addnew-contact__btn"
            onClick={() => setOpenFormCert(!openFormCert)}
          >
            {openFormCert === true ? "Cancel" : "Add new certification"}
          </button>
        )}
      </div>
    </div>
  );
};

const AddNewCertifications = ({
  certData,
  setOpenFormCert,
  setLoadData,
  openUpdateFormCert,
  setOpenUpdateFormCert,
  updateData,
}) => {
  const [certName, setCertName] = useState(
    openUpdateFormCert === true ? updateData.certificationName : ""
  );
  const [certOrganisation, setCertOrganisation] = useState(
    openUpdateFormCert === true ? updateData.issuingOrganisation : ""
  );
  const [certIssued, setCertIssued] = useState(
    openUpdateFormCert === true ? updateData.dateIssued : ""
  );
  const [certExpirationDate, setCertExpirationDate] = useState(
    openUpdateFormCert === true ? updateData.expirationDate : ""
  );
  const [certLevel, setCertLevel] = useState(
    openUpdateFormCert === true ? updateData.certificationLevel : ""
  );
  const [certDescription, setCertDescription] = useState(
    openUpdateFormCert === true ? updateData.certificationDescription : ""
  );
  const [certFile, setCertFile] = useState(null);

  const handleAddCert = (e, formId) => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(AddCertification, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        PractitionerId: id,
        CertificationName: certName,
        IssuingOrganisation: certOrganisation,
        DateIssued: certIssued,
        ExpirationDate: certExpirationDate,
        CertificationId: formId,
        CertificationLevel: certLevel,
        CertificationDescription: certDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpenFormCert(false);
        setLoadData(true);
      });
  };

  const handleAddFile = (e) => {
    //adds the cert attachment first before calling the whole other HTTPPOST req
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", certFile);

    fetch(AddCertficateAttachements, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleAddCert(e, data.returnStatus.dataId);
      });
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    fetch(`${UpdateCertification}/${updateData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        CertificationName: certName,
        IssuingOrganisation: certOrganisation,
        DateIssued: certIssued,
        ExpirationDate: certExpirationDate,
        CertificationLevel: certLevel,
        CertificationDescription: certDescription,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setOpenUpdateFormCert(false);
        setLoadData(true);
      });
  };

  const handleUpdateCertAttachment = (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("file", certFile); //certification attachment file stream

    if (fileData != null) {
      //if fileData is not empty/null
      //HTTP PUT
      fetch(`${UpdateCertificationAttachment}/${updateData.certificationId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: fileData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          //Call handleUpdateDetails func
          handleUpdateDetails(e);
        })
        .catch((ex) => {
          throw ex;
        });
    } else {
      //if file is empty, then just only call update the details function.
      handleUpdateDetails(e);
    }
  };

  const formatDateFunction = (str) => {
    const formattedDate = moment(str).format("DD-MM-YYYY");
    return <td>{formattedDate}</td>;
  };
  const formatDate = new Date();
  return (
    <div>
      <table className="certification-container__table">
        <thead>
          <tr>
            <th>Certification Name</th>
            <th>Issuing Organization</th>
            <th>Date Issued</th>
            <th>Expiration Date</th>
            <th>Certification Level</th>
            <th>Description</th>
            <th>Attachments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certData.map((data, index) => (
            <tr key={index}>
              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    type="text"
                    value={certName}
                    placeholder="Certification Name"
                    onChange={(e) => setCertName(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.certificationName}</td>
              )}
              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    type="text"
                    value={certOrganisation}
                    placeholder="Issuing Organisation"
                    onChange={(e) => setCertOrganisation(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.issuingOrganisation}</td>
              )}
              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    type="date"
                    value={certIssued}
                    placeholder="Date Issued"
                    onChange={(e) => setCertIssued(e.target.value)}
                  />
                </td>
              ) : (
                <td>{formatDateFunction(data.dateIssued)}</td>
              )}
              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    type="date"
                    value={certExpirationDate}
                    placeholder="Expiration Date"
                    onChange={(e) =>
                      setCertExpirationDate(
                        e.target.value !== "" ? e.target.value : null
                      )
                    }
                  />
                </td>
              ) : (
                <td>{formatDateFunction(data.expirationDate)}</td>
              )}
              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    type="text"
                    value={certLevel}
                    placeholder="Certification Level"
                    onChange={(e) => setCertLevel(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.certificationLevel}</td>
              )}
              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    type="text"
                    value={certDescription}
                    placeholder="Description"
                    onChange={(e) => setCertDescription(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.certificationDescription}</td>
              )}

              {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                //use input in the <td></td> otherwise just display read-only data
                <td>
                  <input
                    className="addnewcert-attachment__input"
                    type="file"
                    onChange={(e) => setCertFile(e.target.files[0])}
                  />
                </td>
              ) : (
                <td>
                  <a
                    href={`${GetTheAttachement}/${updateData.certificationId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
              )}

              <td>
                {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                  //use add <button></button> otherwise just non
                  <button onClick={(e) => handleUpdateCertAttachment(e)}>
                    Update
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
          {openUpdateFormCert === true ? (
            ""
          ) : (
            <tr>
              <td>
                <input
                  type="text"
                  value={certName}
                  placeholder="Certification Name"
                  onChange={(e) => setCertName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={certOrganisation}
                  placeholder="Issuing Organisation"
                  onChange={(e) => setCertOrganisation(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={certIssued}
                  placeholder="Date Issued"
                  onChange={(e) => setCertIssued(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={certExpirationDate}
                  placeholder="Expiration Date"
                  onChange={(e) =>
                    setCertExpirationDate(
                      e.target.value !== "" ? e.target.value : null
                    )
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={certLevel}
                  placeholder="Certification Level"
                  onChange={(e) => setCertLevel(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={certDescription}
                  placeholder="Description"
                  onChange={(e) => setCertDescription(e.target.value)}
                />
              </td>
              <td>
                <input
                  className="addnewcert-attachment__input"
                  type="file"
                  onChange={(e) => setCertFile(e.target.files[0])}
                />
              </td>
              <td style={{ display: "flex", gap: "5px" }}>
                <button onClick={handleAddFile}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const Contacts = () => {
  const [addNewContact, setAddNewContact] = useState(false);
  const [updateContact, setUpdateContact] = useState(false);
  const [updateContactData, setUpdateContactData] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(`${GetEmergencyContact}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setEmergencyContacts(res.returnStatus.data);
          setLoadData(false);
        });
    } else if (role === "Patient") {
      fetch(`${GetPatientEmergencyContact}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setEmergencyContacts(res.returnStatus.data);
          setLoadData(false);
        });
    }
  }, [loadData]);

  const deleteHandleContact = (e, id) => {
    e.preventDefault();
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(`${DeleteContact}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res); //logging result
          setLoadData(true);
        });
    } else if (role === "Patient") {
      fetch(`${DeletePatientEmergencyContact}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res); //logging result
          setLoadData(true);
        });
    }
  };

  const handleUpdateContact = (e, data) => {
    e.preventDefault();
    setUpdateContact(!updateContact);
    setUpdateContactData(data);
  };

  return (
    <div>
      <div>
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Contacts</h3>

        <div className="account-profile-contactnums__wrapper">
          {addNewContact === false && updateContact === false ? (
            <div
              style={{ marginTop: "10px", overflow: "auto", height: "130px" }}
            >
              <table className="contactnums-container__table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Relationship</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyContacts.map((data, index) => (
                    <tr key={index}>
                      <td>{data.contactName}</td>
                      <td>{data.contactMobile}</td>
                      <td>{data.contactRelationship}</td>
                      <td>{data.contactEmailAddress}</td>
                      <td style={{ display: "flex", gap: "5px" }}>
                        <button onClick={(e) => handleUpdateContact(e, data)}>
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={(e) => deleteHandleContact(e, data.id)}
                        >
                          <Trash size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <AddNewContact
              emergencyContacts={emergencyContacts}
              addNewContact={addNewContact}
              setLoadData={setLoadData}
              setAddNewContact={setAddNewContact}
              updateContactData={updateContactData}
              setUpdateContact={setUpdateContact}
              updateContact={updateContact}
            />
          )}
        </div>
        {updateContact === true ? (
          <button
            className="addnew-contact__btn"
            onClick={() => setUpdateContact(!updateContact)}
          >
            Cancel
          </button>
        ) : (
          <button
            className="addnew-contact__btn"
            onClick={() => setAddNewContact(!addNewContact)}
          >
            {addNewContact === false && updateContact === false
              ? "Add new contact"
              : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
};

const AddNewContact = ({
  emergencyContacts,
  addNewContact,
  setLoadData,
  setAddNewContact,
  updateContactData,
  setUpdateContact,
  updateContact,
}) => {
  const [formName, setFormName] = useState(
    updateContact === true ? updateContactData.contactName : ""
  );
  //if the user decide to update the contactData the state's initial value is 'updateContactData.contactName' if the user did not decide to
  //update a data then just use an initial value of "".

  const [formNumber, setFormNumber] = useState(
    updateContact === true ? updateContactData.contactMobile : ""
  );
  //if the user decide to update the contactData the state's initial value is 'updateContactData.contactMobile' if the user did not decide to
  //update a data then just use an initial value of "".

  const [formRelationship, setFormRelationship] = useState(
    updateContact === true ? updateContactData.contactRelationship : ""
  );
  //if the user decide to update the contactData the state's initial value is 'updateContactData.contactRelationship' if the user did not decide to
  //update a data then just use an initial value of "".

  const [formEmailAddress, setFormEmailAddress] = useState(
    updateContact === true ? updateContactData.contactEmailAddress : ""
  );
  //if the user decide to update the contactData the state's initial value is 'updateContactData.contactEmailAddress' if the user did not decide to
  //update a data then just use an initial value of "".

  const addedContact = (e) => {
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(CreateContact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PractitionerId: id,
          ContactName: formName,
          ContactMobile: formNumber,
          ContactRelationship: formRelationship,
          ContactEmailAddress: formEmailAddress,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAddNewContact(false); //setting the state to false to go back to the default view of the table
          setLoadData(true); //setting the state to true so that it will refresh the data in the useEffect when something gets changed.
        });
    } else if (role === "Patient") {
      fetch(AddPatientEmergencyContact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PatientId: id,
          ContactName: formName,
          ContactMobile: formNumber,
          ContactRelationship: formRelationship,
          ContactEmailAddress: formEmailAddress,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAddNewContact(false); //setting the state to false to go back to the default view of the table
          setLoadData(true); //setting the state to true so that it will refresh the data in the useEffect when something gets changed.
        });
    }
  };

  const updateEmergencyContact = () => {
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(`${UpdateEmergencyContact}/${updateContactData.id}`, {
        //getting the id from the table when clicking update icon (pencil icon)
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ContactName: formName,
          ContactMobile: formNumber,
          ContactRelationship: formRelationship,
          ContactEmailAddress: formEmailAddress,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.returnStatus.message); //delete c.log
          setUpdateContact(false); //setting the state to false to go back to the default view of the table
          setLoadData(true); //setting the state to true so that it will refresh the data in the useEffect when something gets changed.
        });
    } else if (role === "Patient") {
      fetch(`${UpdatePatientEmergencyContact}/${updateContactData.id}`, {
        //getting the id from the table when clicking update icon (pencil icon)
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ContactName: formName,
          ContactMobile: formNumber,
          ContactRelationship: formRelationship,
          ContactEmailAddress: formEmailAddress,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.returnStatus.message); //delete c.log
          setUpdateContact(false); //setting the state to false to go back to the default view of the table
          setLoadData(true); //setting the state to true so that it will refresh the data in the useEffect when something gets changed.
        });
    }
  };
  return (
    <div className="addnewcontact__wrapper">
      <table className="contactnums-container__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Relationship</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emergencyContacts.map((data, index) => (
            <tr key={index}>
              {updateContactData.id === data.id && updateContact === true ? (
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.contactName}</td>
              )}
              {updateContactData.id === data.id && updateContact === true ? (
                <td>
                  <input
                    type="text"
                    placeholder="Number"
                    value={formNumber}
                    onChange={(e) => setFormNumber(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.contactMobile}</td>
              )}
              {updateContactData.id === data.id && updateContact === true ? (
                <td>
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={formRelationship}
                    onChange={(e) => setFormRelationship(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.contactRelationship}</td>
              )}
              {updateContactData.id === data.id && updateContact === true ? (
                <td>
                  <input
                    type="text"
                    placeholder="Email"
                    value={formEmailAddress}
                    onChange={(e) => setFormEmailAddress(e.target.value)}
                  />
                </td>
              ) : (
                <td>{data.contactEmailAddress}</td>
              )}
              {updateContactData.id === data.id && updateContact === true ? (
                <td>
                  <button
                    className="save-contact__btn"
                    onClick={updateEmergencyContact}
                  >
                    Update
                  </button>
                </td>
              ) : (
                ""
              )}
              <td style={{ display: "flex", gap: "5px" }}></td>
            </tr>
          ))}
          {addNewContact === true && updateContact === false ? (
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setFormName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Number"
                  onChange={(e) => setFormNumber(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Relationship"
                  onChange={(e) => setFormRelationship(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setFormEmailAddress(e.target.value)}
                />
              </td>
              {addNewContact === false && updateContact === false ? (
                <td style={{ display: "flex", gap: "5px" }}>
                  <button>
                    <Pencil size={15} />
                  </button>
                  <button>
                    <Trash size={15} />
                  </button>
                </td>
              ) : (
                <td>
                  <button className="save-contact__btn" onClick={addedContact}>
                    Save
                  </button>
                </td>
              )}
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
    </div>
  );
};

const TimezonesSettings = ({ setEditChanges }) => {
  const [editActive, setEditActive] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [editData, setEditData] = useState([]);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(`${GetATimePreference}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setLoadData(false);
          setEditData(res.returnStatus.data);
        });
    } else if (role === "Patient") {
      fetch(`${GetAPatientDateTime}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoadData(false);
          setEditData(data.returnStatus.data);
        });
    }
  }, [loadData]);
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Timezone</h3>
      {editActive === false ? (
        <div className="account-timezone__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profileheader">
              Timezone/Date preference
            </p>
            <button
              className="account-timezone-edit__btn"
              onClick={() => setEditActive(true)}
            >
              <Pencil size={15} />
              Edit
            </button>
          </div>
          <div style={{ width: "57%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <p className="account-timezone__text timezonelabel">Country</p>
              <p className="account-timezone__text timezonedetails">
                {editData.country}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p className="account-timezone__text timezonelabel">Timezone</p>
              <p className="account-timezone__text timezonedetails">
                {editData.timeZone}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p className="account-timezone__text timezonelabel">
                Date Format
              </p>
              <p className="account-timezone__text timezonedetails">
                {editData.dateFormat}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p className="account-timezone__text timezonelabel">
                Time Format
              </p>
              <p className="account-timezone__text timezonedetails">
                {editData.timeFormat}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <TimezoneEdit
          setEditActive={setEditActive}
          setLoadData={setLoadData}
          editData={editData}
          setEditChanges={setEditChanges}
        />
      )}
    </div>
  );
};

const TimezoneEdit = ({
  setEditActive,
  setLoadData,
  editData,
  setEditChanges,
}) => {
  const [dateFormat, setDateFormat] = useState(editData?.dateFormat || "");
  const [timeFormat, setTimeFormat] = useState(editData?.timeFormat || "");
  const [country, setCountry] = useState(editData?.country || "");
  const [timeZone, setTimeZone] = useState(editData?.timeZone || "");

  const updateTimeZone = (e) => {
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
    const role = sessionStorage.getItem("role");
    if (role === "Practitioner") {
      fetch(`${UpdatesTimePreference}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PractitionerId: id,
          DateFormat: dateFormat,
          TimeFormat: timeFormat,
          Country: country,
          TimeZone: timeZone,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setEditActive(false);
          setLoadData(true);
          setEditChanges(true); //changes to true so that the useEffect in the nav component will run to update the date/time
        });
    } else if (role === "Patient") {
      fetch(`${UpdatePatientDateTime}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          PatientId: id,
          DateFormat: dateFormat,
          TimeFormat: timeFormat,
          Country: country,
          TimeZone: timeZone,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setEditActive(false);
          setLoadData(true);
          setEditChanges(true); //changes to true so that the useEffect in the nav component will run to update the date/time
        });
    }
  };
  return (
    <div>
      <div className="account-timezone-edit__wrapper">
        <div>
          <h5>Country</h5>
          <input
            type="text"
            className="account-timezone__input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <h5>Timezone</h5>

          <select
            className="account-timezone__input"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            {momtimezone.tz.names().map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "50px",
            }}
          >
            <div>
              <h5>Date format</h5>
              <select
                className="account-date-format__select"
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="" style={{ display: "none" }}>
                  {dateFormat}
                </option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>

            <div>
              <h5>Time format</h5>
              <select
                className="account-time-format__select"
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <option value="" style={{ display: "none" }}>
                  {timeFormat === "hh:mm A" ? "12-hour" : "24-hour"}
                </option>
                <option value="hh:mm A">12-hour</option>
                <option value="HH:mm">24-hour</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        className="account-timezonesetting-cancel_btn"
        onClick={() => setEditActive(false)}
      >
        Cancel
      </button>
      <button
        className="account-timezonesetting-save__btn"
        onClick={(e) => updateTimeZone(e)}
      >
        Save
      </button>
    </div>
  );
};

const Account = ({ setEditChanges }) => {
  const [loggedUserData, setLoggedUserData] = useState([]);
  const navigate = useNavigate();
  const [loadData, setLoadData] = useState(false);
  const [loadDetails, setLoadDetails] = useState(false);
  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    const role = sessionStorage.getItem("role");

    const fetchData = async (retry = true) => {
      try {
        const response = await fetch(`${GetaHealthPractitioner}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include", // Ensure cookies are included in the request if necessary
        });

        if (response.status === 302) {
          //302 is redericting to sign in screen because refresh token and jwt are expired.
          console.warn("302 detected, redirecting...");
          // Redirect to the new path
          navigate("/");
          return; // Exit the function to prevent further execution
        }

        if (response.status === 401 && retry) {
          // Retry the request once if a 401 status is detected
          console.warn("401 detected, retrying request...");
          return fetchData(false); // Call with `retry` set to false
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLoggedUserData(data);
        setLoadData(false);
        setLoadDetails(true);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };

    if (role === "Practitioner") {
      fetchData();
    } else if (role === "Patient") {
      fetch(`${GetPatient}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setLoggedUserData(data);
          setLoadData(false);
          setLoadDetails(true);
        })
        .catch((error) => {
          console.log("Error fetching patient data:", error.message);
        });
    }
  }, [loadData]);

  return (
    <div>
      <div className="setting-contents-display-container__wrapper">
        {loadDetails && (
          <Profile loggedUserData={loggedUserData} setLoadData={setLoadData} />
        )}

        <br />
        <br />
        <Contacts />
        <br />
        <br />
        <TimezonesSettings setEditChanges={setEditChanges} />
      </div>
    </div>
  );
};

export default Account;
