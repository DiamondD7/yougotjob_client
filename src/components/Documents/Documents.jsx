import React, { useState } from "react";
import TestFile from "../../assets/pdf/Aaron-CoverLetter.pdf";
import ClinicalLeadershipPDF from "../../assets/pdf/clinical-leadership-in-manatu-hauora-12-23.pdf";
import ClinicalCareerGuide from "../../assets/pdf/Te-Awa-Tārai-Allied-Health.pdf";
import StrategicImmunisation from "../../assets/pdf/Strategic-Approach-to-Immunisation-in-New-Zealand-2025-2030.pdf";
import { CaretUp, CaretDown, Folder, FilePdf } from "@phosphor-icons/react";

import "../../styles/supportstyles.css";
const Documents = () => {
  const [openClinicalGuide, setOpenClinicalGuide] = useState(false);
  const [openLawsOfTriage, setOpenLawsOfTriage] = useState(false);
  const [openNewIn2025, setOpenNewIn2025] = useState(false);
  return (
    <div>
      <h1 className="support-header__text">Documents</h1>
      <div className="support-folders__wrapper">
        <button
          className="support-folders__btn"
          onClick={() => setOpenClinicalGuide(!openClinicalGuide)}
        >
          <Folder size={16} weight="fill" color="#F5C800" />
          Clinical guide
          {openClinicalGuide === false ? (
            <CaretUp size={16} style={{ marginLeft: "10px" }} />
          ) : (
            <CaretDown size={16} style={{ marginLeft: "10px" }} />
          )}
        </button>
        {openClinicalGuide === true ? (
          <div className="support-folder-file-container__wrapper">
            <div className="support-inner-folder-file__wrapper">
              <a
                className="support-folder-file__anchor"
                href={ClinicalLeadershipPDF}
                target="_blank"
                rel="noreferrer"
              >
                <FilePdf size={16} color="#ef233c" /> Clinical Leadership
              </a>
            </div>
            <div className="support-inner-folder-file__wrapper">
              <a
                className="support-folder-file__anchor"
                href={ClinicalCareerGuide}
                target="_blank"
                rel="noreferrer"
              >
                <FilePdf size={16} color="#ef233c" /> Clinical Career Guide
              </a>
            </div>
            {/* <div className="support-inner-folder-file__wrapper">
              <button
                className="support-inner-folders__btn"
                onClick={() => setOpenLawsOfTriage(!openLawsOfTriage)}
              >
                <Folder size={16} weight="fill" color="#F5C800" />
                35 laws of the Triage
                {openLawsOfTriage === false ? (
                  <CaretUp size={16} style={{ marginLeft: "10px" }} />
                ) : (
                  <CaretDown size={16} style={{ marginLeft: "10px" }} />
                )}
              </button>
            </div>

            {openLawsOfTriage === true ? (
              <div className="support-inner-folder-file__wrapper twolevelinner">
                <a
                  className="support-folder-file__anchor"
                  href={TestFile}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FilePdf size={16} color="#ef233c" /> Aaron-CoverLetter.pdf
                </a>
              </div>
            ) : (
              ""
            )} */}
          </div>
        ) : (
          ""
        )}

        <button
          className="support-folders__btn"
          onClick={() => setOpenNewIn2025(!openNewIn2025)}
        >
          <Folder size={16} weight="fill" color="#F5C800" />
          New in 2025
          {openNewIn2025 === false ? (
            <CaretUp size={16} style={{ marginLeft: "10px" }} />
          ) : (
            <CaretDown size={16} style={{ marginLeft: "10px" }} />
          )}
        </button>

        {openNewIn2025 === true ? (
          <div className="support-folder-file-container__wrapper">
            <div className="support-inner-folder-file__wrapper">
              <a
                className="support-folder-file__anchor"
                href={StrategicImmunisation}
                target="_blank"
                rel="noreferrer"
              >
                <FilePdf size={16} color="#ef233c" /> Strategic Approach To
                Immunisation in NZ
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Documents;
