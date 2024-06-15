import React, { useEffect, useState } from "react";
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
} from "../../assets/js/serverApi";
import moment from "moment";

import "../../styles/accountstyles.css";
const Profile = ({ loggedUserData }) => {
  return (
    <div>
      <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Profile</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="account-profile__wrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="account-profile__text profileheader">
              Personal information
            </p>
            <button className="account-profile-edit__btn">
              <Pencil size={15} /> Edit
            </button>
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
              <p className="account-profile__text profiledetails">
                {loggedUserData.fullName}
              </p>
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

            <p className="account-profile__text profiledetails">
              {loggedUserData.mobile}
            </p>
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
            <p className="account-profile__text profiledetails">
              {loggedUserData.emailAddress}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              width: "410px",
              justifyContent: "space-between",
            }}
          >
            <p className="account-profile__text address">Home Address</p>
            <ul style={{ paddingTop: "10px" }}>
              <li className="account-profile__text addressdetails">
                <p className="addressdetails">1/88 Hunters Drive,</p> Auckland
                2330{" "}
              </li>
            </ul>
          </div>
        </div>

        <Certifications />
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
                    value={formatDate.toLocaleDateString("en-nz", certIssued)}
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
                    value={formatDateFunction(certExpirationDate)}
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
              <td></td>
              <td>
                {data.id === updateData.id && openUpdateFormCert === true ? ( //checking if the data id and the chosen id to update is equal then
                  //use add <button></button> otherwise just non
                  <button onClick={(e) => handleUpdateDetails(e)}>
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
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetEmergencyContact}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setEmergencyContacts(res.returnStatus.data);
        setLoadData(false);
      });
  }, []);

  const deleteHandleContact = (e, id) => {
    e.preventDefault();
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
      });
  };
  return (
    <div>
      <div>
        <h3 style={{ color: "#9dcd5a", fontWeight: "bold" }}>Contacts</h3>

        <div className="account-profile-contactnums__wrapper">
          {addNewContact === false ? (
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
                        <button>
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
            />
          )}
        </div>
        <button
          className="addnew-contact__btn"
          onClick={() => setAddNewContact(!addNewContact)}
        >
          {addNewContact === false ? "Add new contact" : "Cancel"}
        </button>
      </div>
    </div>
  );
};

const AddNewContact = ({
  emergencyContacts,
  addNewContact,
  setLoadData,
  setAddNewContact,
}) => {
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [formRelationship, setFormRelationship] = useState("");
  const [formEmailAddress, setFormEmailAddress] = useState("");

  const addedContact = (e) => {
    e.preventDefault();
    const id = parseInt(sessionStorage.getItem("id"));
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
        setAddNewContact(false);
        setLoadData(true);
      });
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
              <td>{data.contactName}</td>
              <td>{data.contactMobile}</td>
              <td>{data.contactRelationship}</td>
              <td>{data.contactEmailAddress}</td>
              <td style={{ display: "flex", gap: "5px" }}></td>
            </tr>
          ))}
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
            {addNewContact === false ? (
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
        </tbody>
      </table>
    </div>
  );
};

const TimezonesSettings = () => {
  const [editActive, setEditActive] = useState(false);

  const TimezoneEdit = () => {
    return (
      <div>
        <div className="account-timezone-edit__wrapper">
          <div>
            <h5>Country</h5>
            <input
              type="text"
              className="account-timezone__input"
              value="New Zealand"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <h5>Timezone</h5>
            <input
              type="text"
              className="account-timezone__input"
              value="Pacific/Auckland"
            />
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
                <select className="account-date-format__select">
                  <option value=""></option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                </select>
              </div>

              <div>
                <h5>Time format</h5>
                <select className="account-time-format__select">
                  <option value=""></option>
                  <option value={true}>12-hour</option>
                  <option value={false}>24-hour</option>
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
        <button className="account-timezonesetting-save__btn">Save</button>
      </div>
    );
  };
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
                New Zealand
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
                Pacific/Auckland
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
                DD/MM/YYYY
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
              <p className="account-timezone__text timezonedetails">24-Hour</p>
            </div>
          </div>
        </div>
      ) : (
        <TimezoneEdit />
      )}
    </div>
  );
};

const Account = () => {
  const [loggedUserData, setLoggedUserData] = useState([]);
  useEffect(() => {
    const id = parseInt(sessionStorage.getItem("id"));
    fetch(`${GetaHealthPractitioner}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedUserData(data);
      });
  }, []);
  return (
    <div>
      <div className="setting-contents-display-container__wrapper">
        <Profile loggedUserData={loggedUserData} />
        <br />
        <br />
        <Contacts />
        <br />
        <br />
        <TimezonesSettings />
      </div>
    </div>
  );
};

export default Account;
