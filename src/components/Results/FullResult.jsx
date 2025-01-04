import React, { useEffect, useState } from "react";
import { FileX } from "@phosphor-icons/react";
import { GetFiles, GetFile } from "../../assets/js/serverApi";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import ViewPDF from "../../assets/pdf/Aaron-CoverLetter.pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
const PatientDetails = ({ chosenView }) => {
  return (
    <div className="fullres-details__wrapper">
      <h5>Patient Details</h5>

      <div className="fullres-details-infos__wrapper">
        <div>
          <p>Patient: {chosenView.fullName}</p>
          <p>Email: {chosenView.emailAddress}</p>
        </div>
        <div>
          <p>NHI: {chosenView.nhi}</p>
          <p>Contact: {chosenView.contactNumber}</p>
        </div>
      </div>
    </div>
  );
};

const PractitionerDetails = ({ chosenView }) => {
  return (
    <div className="fullres-details__wrapper">
      <h5>Practitioner Details</h5>
      <div className="fullres-details-infos__wrapper">
        <div>
          <p>Practitioner: {chosenView.practitionerName}</p>
          <p>Email: {chosenView.practitionerEmail}</p>
        </div>
        <div>
          <p>Practitioner Type: {chosenView.healthPractitionerType}</p>
        </div>
      </div>
    </div>
  );
};

const AppointmentDetails = ({ chosenView }) => {
  return (
    <div className="fullres-details__wrapper">
      <h5>Appointment Details</h5>
      <div className="fullres-details-infos__wrapper">
        <div>
          <p>Appointment Agenda: {chosenView.appointmentAgenda}</p>
          <p>Appointment Type: {chosenView.appointmentType}</p>
          {chosenView.appointmentType === "on-site" ? (
            <div>
              <p>Address: {chosenView.streetAddress} </p>
              <p>
                {chosenView.suburb} {chosenView.city}, {chosenView.postCode}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <p>
            Preferred Date:{" "}
            {new Date(chosenView.preferredAppointmentDate).toLocaleString(
              "en-nz"
            )}
          </p>
          <p>
            Accepted Job At:{" "}
            {new Date(chosenView.acceptedJobDate).toLocaleString("en-nz")}
          </p>
          <p>
            Completed Job At:{" "}
            {new Date(chosenView.appointmentDateCompleted).toLocaleString(
              "en-nz"
            )}
          </p>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "12px" }}>Patient's comments</p>
        <textarea
          className="fullres-textarea-comments"
          value={chosenView.comments}
        ></textarea>
      </div>
      <div>
        <p style={{ fontSize: "12px" }}>Practitioner's findings</p>
        <textarea
          className="fullres-textarea-comments"
          value={chosenView.conclusion}
        ></textarea>
      </div>
    </div>
  );
};

const ConclusionContainer = ({ chosenView }) => {
  return (
    <div className="fullres-details__wrapper">
      <h5>Conclusion</h5>
      <div className="fullres-details-infos__wrapper">
        <div>
          <p>Reschedule meeting: No</p>
          <p>New meeting date: </p>
          <p>Reasons for reschedule (if yes):</p>
        </div>
        <div>
          <p>Practitioner Name: {chosenView.practitionerName}</p>
        </div>
      </div>
      <p className="fullres-conclusion__p">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum quas
        suscipit voluptatibus quam! Qui saepe doloribus, fugiat, aliquam
        doloremque, est harum culpa tenetur porro sint optio minima. Ea, enim
        molestiae! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
        veniam ea quia repellendus, magnam, saepe aut vitae aliquam quam commodi
        quis fugit ducimus laborum magni voluptates voluptate natus? Quisquam,
        exercitationem?
      </p>
    </div>
  );
};

const DocumentsContainer = ({ chosenView }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    try {
      fetch(`${GetFiles}/${chosenView.id}`)
        .then((res) => res.json())
        .then((res) => {
          setFiles(res.returnStatus.files);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="fullres-documents__wrapper">
      <h5>Documents</h5>
      <table className="fullres-documents__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Type</th>
            <th>Name</th>
          </tr>
        </thead>

        {files.length <= 0 ? (
          <div
            style={{
              textAlign: "center",
              position: "relative",
              left: "235px",
              top: "20px",
            }}
          >
            <FileX size={25} color="rgba(0,0,0,0.4)" />
            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "13px" }}>
              No files included
            </p>
          </div>
        ) : (
          <tbody>
            {files &&
              files.map((items, index) => (
                <tr key={items.id}>
                  <td>{index + 1}</td>
                  <td>12/09/2025</td>
                  <td>{items.contentType}</td>
                  <td>{items.name}</td>
                  <td>
                    <a
                      className="fullres-documents__btn"
                      href={`${GetFile}/${items.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      view
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
const FullResult = ({ setOpenResult, chosenView }) => {
  const newPlugin = defaultLayoutPlugin();
  return (
    <div>
      <button
        className="fullres-back__btn"
        onClick={() => setOpenResult(false)}
      >
        back
      </button>
      <div className="fullres-profile-container__wrapper">
        <div>
          <PatientDetails chosenView={chosenView} />

          <PractitionerDetails chosenView={chosenView} />
          <AppointmentDetails chosenView={chosenView} />

          <ConclusionContainer chosenView={chosenView} />
        </div>

        <div>
          <DocumentsContainer chosenView={chosenView} />
          {/* <div className="pdf-container__wrapper">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={ViewPDF} plugins={[newPlugin]} />
            </Worker>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FullResult;
