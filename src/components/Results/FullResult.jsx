import React, { useState } from "react";
import ViewPDF from "../../assets/pdf/Aaron-CoverLetter.pdf";
import { PencilSimpleLine, Prescription } from "@phosphor-icons/react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const FullResult = ({ setOpenResult }) => {
  const newPlugin = defaultLayoutPlugin();
  const initialTestText =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa non ea saepe ipsam explicabo dolores eius dolorem expedita! Dolore aut impedit nostrum expedita officiis perspiciatis esse laborum quaerat neque blanditiis.";
  const [testText, setTestText] = useState(
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa non ea saepe ipsam explicabo dolores eius dolorem expedita! Dolore aut impedit nostrum expedita officiis perspiciatis esse laborum quaerat neque blanditiis."
  );

  const [prescribedMed, setPrescribedMed] = useState("Phenolynx Celyn 18/mcg");
  const [editMed, setEditMed] = useState(false);
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
          <div className="fullres-profile__wrapper">
            <div>
              <img
                className="result-profile-pic__img"
                src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile-pic"
              />
            </div>
            <div className="full-result-profile-subinfo__wrapper">
              <h3>Johnson Martin Leaso Henderson</h3>
              <h4 className="nhi-header">NHI: 3550837</h4>
              <p>DOB: 2 November 1998</p>
              <p>Age: 35</p>
              <p>Nationality: Mexican</p>
              <p>Height: 166cm</p>
              <p>Weight: 75kg</p>
            </div>
          </div>
          <div>
            <button className="fullres-viewprofile__btn">
              view patient's profile
            </button>
          </div>

          <div className="fullres-testdescription__wrapper">
            <h3>Haemoglobin Test:</h3>

            <div style={{ marginTop: "10px" }}>
              <h5>Test summary</h5>
              <textarea
                className="symptoms-textarea"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
              ></textarea>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {initialTestText !== testText ? (
                  <button className="symptoms-update__btn">
                    <PencilSimpleLine size={18} color={"#81bb30"} /> update
                  </button>
                ) : (
                  <div></div>
                )}
                <label className="symptoms-label__text">
                  last updated 3/12/2023
                </label>
              </div>
            </div>
          </div>

          <div className="fullres-prescribed__wrapper">
            <div style={{ display: "flex", gap: "5px" }}>
              <h5>Prescribed medicines</h5>
              <button
                className="fullres-btn-edit"
                onClick={() => setEditMed(!editMed)}
              >
                {editMed === true ? "cancel" : "edit"}
              </button>

              {editMed && (
                <button
                  className="fullres-btn-edit"
                  onClick={() => setEditMed(!editMed)}
                >
                  done
                </button>
              )}
            </div>
            <div className="fullres-prescription-details__wrapper">
              <Prescription size={19} />
              <div>
                {editMed === true ? (
                  <input
                    value={prescribedMed}
                    onChange={(e) => setPrescribedMed(e.target.value)}
                  />
                ) : (
                  <p>{prescribedMed}</p>
                )}
              </div>
            </div>
            <div className="fullres-prescription-details__wrapper">
              <Prescription size={19} />
              <div>
                {editMed === true ? (
                  <input
                    value={prescribedMed}
                    onChange={(e) => setPrescribedMed(e.target.value)}
                  />
                ) : (
                  <p>{prescribedMed}</p>
                )}
              </div>
            </div>
            <div className="fullres-prescription-details__wrapper">
              <Prescription size={19} />
              <div>
                {editMed === true ? (
                  <input
                    value={prescribedMed}
                    onChange={(e) => setPrescribedMed(e.target.value)}
                  />
                ) : (
                  <p>{prescribedMed}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pdf-container__wrapper">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={ViewPDF} plugins={[newPlugin]} />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default FullResult;
