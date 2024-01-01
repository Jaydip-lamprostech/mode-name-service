import React from "react";
import DateComponent from "./DateComponent";
import "../styles/DomainInformation.css";

function DomainInformation(props) {
  return (
    <div className="info-section">
      <div className="info-column">
        <div className="info_title">Created Date</div>
        <DateComponent
          epochTime={
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Created Date"
            )?.value
          }
        />
      </div>
      <div className="info-column">
        <div className="info_title">Registered Date</div>
        <DateComponent
          epochTime={
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Registration Date"
            )?.value
          }
        />
      </div>
      <div className="info-column">
        <div className="info_title">Expiry Date</div>
        <DateComponent
          epochTime={
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Expiration Date"
            )?.value
          }
        />
      </div>
      <div className="info-column">
        <div className="info_title">Length</div>
        <div className="info_value_main">
          {
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Length"
            )?.value
          }
        </div>
      </div>

      <div className="info-column">
        <div className="info_title">Segment Length</div>
        <div className="info_value_main">
          {
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Segment Length"
            )?.value
          }
        </div>
      </div>
      <div className="info-column">
        <div className="info_title">Character Set</div>
        <div className="info_value_main">
          {
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Character Set"
            )?.value
          }
        </div>
      </div>
    </div>
  );
}

export default DomainInformation;
