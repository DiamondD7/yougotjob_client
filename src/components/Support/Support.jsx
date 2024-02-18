import React, { useState } from "react";
import TestFile from "../../assets/pdf/Aaron-CoverLetter.pdf";
import { CaretUp, CaretDown, Folder, FilePdf } from "@phosphor-icons/react";

import "../../styles/supportstyles.css";
const Support = () => {
  const [openClinicalGuide, setOpenClinicalGuide] = useState(false);
  const [openLawsOfTriage, setOpenLawsOfTriage] = useState(false);
  const [openNewIn2024, setOpenNewIn2024] = useState(false);
  return (
    <div>
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
                href={TestFile}
                target="_blank"
                rel="noreferrer"
              >
                <FilePdf size={16} color="#ef233c" /> Aaron-CoverLetter.pdf
              </a>
            </div>
            <div className="support-inner-folder-file__wrapper">
              <a
                className="support-folder-file__anchor"
                href={TestFile}
                target="_blank"
                rel="noreferrer"
              >
                <FilePdf size={16} color="#ef233c" /> Aaron-CoverLetter.pdf
              </a>
            </div>
            <div className="support-inner-folder-file__wrapper">
              <a
                className="support-folder-file__anchor"
                href={TestFile}
                target="_blank"
                rel="noreferrer"
              >
                <FilePdf size={16} color="#ef233c" /> Aaron-CoverLetter.pdf
              </a>
            </div>
            <div className="support-inner-folder-file__wrapper">
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
            )}
          </div>
        ) : (
          ""
        )}

        <button
          className="support-folders__btn"
          onClick={() => setOpenNewIn2024(!openNewIn2024)}
        >
          <Folder size={16} weight="fill" color="#F5C800" />
          New in 2024
          {openNewIn2024 === false ? (
            <CaretUp size={16} style={{ marginLeft: "10px" }} />
          ) : (
            <CaretDown size={16} style={{ marginLeft: "10px" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Support;
