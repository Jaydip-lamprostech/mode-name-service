import React, { useState } from "react";
import "./DomainOwnership.css";
import AvatarGenerator from "../AvatarGenerator";
import { Tooltip } from "react-tooltip";
import TransferDomainPopup from "./TransferDomainPopup";

function DomainOwnership(props) {
  const [showAlternateIcon, setShowAlternateIcon] = useState(false);
  const [transferDomainPopup, setTransferDomainPopup] = useState(false);
  let address = props.address;

  const handleClick = (text) => {
    navigator.clipboard.writeText(text);
    // Show the alternate SVG for a few seconds
    setShowAlternateIcon(true);
    setTimeout(() => {
      setShowAlternateIcon(false);
    }, 2000); // Adjust the duration as needed (in milliseconds)
  };
  return (
    <>
      <div className="profileChildComponent">
        <div className="DomainOwnershipRolesTitle">
          <span>Roles</span>
        </div>
        <ul className="domainownership-list">
          <li className="domainownership-list-item">
            <span className="domainownership-item-left">
              <AvatarGenerator
                name={props.address}
                width={"20px"}
                height={"20px"}
              />
              <span className="domainownership-list-address">
                {address
                  ? address.slice(0, 7) +
                    "..." +
                    address.slice(address.length - 8, address.length)
                  : "Connect Your Wallet"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                className="copy-icon"
                onClick={() => handleClick(address)}
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                {showAlternateIcon ? (
                  <g>
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
                  </g>
                ) : (
                  <g>
                    <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                  </g>
                )}
              </svg>
            </span>
            <span
              className="domainownership-item-right"
              data-tooltip-id="InfoAboutOwner"
              data-tooltip-content="The Owner is the ultimate owner of the name. For .mode names the Owner (formerly Registrant) of a name can change the Manager and transfer ownership. Not all names will have an owner."
            >
              Owner
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0V0z" />
                  <path d="M0 0h24v24H0V0z" opacity=".87" />
                </g>
                <path d="M11 7h2v2h-2zm1 10c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1zm0-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </span>
            <Tooltip
              id="InfoAboutOwner"
              removeStyle
              style={{
                maxWidth: "200px",
                wordBreak: "break-word",
                fontFamily: "IBM Plex Sans, sans-serif",
              }}
            />
          </li>
          <li className="domainownership-list-item">
            <span className="domainownership-item-left">
              <AvatarGenerator
                name={props.address}
                width={"20px"}
                height={"20px"}
              />
              <span className="domainownership-list-address">
                {address
                  ? address.slice(0, 7) +
                    "..." +
                    address.slice(address.length - 8, address.length)
                  : "Connect Your Wallet"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                className="copy-icon"
                onClick={() => handleClick(address)}
              >
                <g>
                  <rect fill="none" height="24" width="24" />
                </g>
                {showAlternateIcon ? (
                  <g>
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
                  </g>
                ) : (
                  <g>
                    <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                  </g>
                )}
              </svg>
            </span>
            <span
              className="domainownership-item-right"
              data-tooltip-id="DomainPonitsTo"
              data-tooltip-content="The address that will receive funds sent to this name on mode mainnet."
            >
              Points To
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0V0z" />
                  <path d="M0 0h24v24H0V0z" opacity=".87" />
                </g>
                <path d="M11 7h2v2h-2zm1 10c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1zm0-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </span>
            <Tooltip
              id="DomainPonitsTo"
              removeStyle
              style={{
                maxWidth: "200px",
                wordBreak: "break-word",
                fontFamily: "IBM Plex Sans, sans-serif",
              }}
            />
          </li>
        </ul>
        <div className="domainTranferButton">
          <button
            onClick={() => {
              setTransferDomainPopup(true);
            }}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.61 2.64548C20.1948 2.19021 21.6568 3.65224 21.2016 5.23705L17.1785 19.2417C16.5079 21.5761 13.3904 22.0197 12.1096 19.9629L10.3338 17.1113C9.84262 16.3226 9.96155 15.2974 10.6207 14.6383L14.4111 10.8479C14.8022 10.4567 14.8033 9.82357 14.4134 9.43373C14.0236 9.04389 13.3905 9.04497 12.9993 9.43614L9.20901 13.2265C8.54987 13.8856 7.52471 14.0046 6.73596 13.5134L3.88412 11.7375C1.82737 10.4567 2.27092 7.33918 4.60532 6.66858L18.61 2.64548Z"
              />
            </svg>
            Transfer
          </button>
        </div>
        {transferDomainPopup ? (
          <TransferDomainPopup
            setTransferDomainPopup={setTransferDomainPopup}
            domainName={props.domainName}
          />
        ) : null}
      </div>
      <div className="info-section">
        <div className="info-column">
          <div className="info_title">Registered Date</div>
          <div className="info_value_main">
            {props.domainDetails.registeredDate
              ? props.domainDetails.registeredDate
              : "Fetching..."}
          </div>
          <div className="info_value_sub">
            {props.domainDetails.registeredTime
              ? props.domainDetails.registeredTime
              : ""}
          </div>
        </div>
        <div className="info-column">
          <div className="info_title">Expiry Date</div>
          <div className="info_value_main">
            {props.domainDetails.expiryDate
              ? props.domainDetails.expiryDate
              : "Fetching..."}
          </div>
          <div className="info_value_sub">
            {props.domainDetails.expiryTime
              ? props.domainDetails.expiryTime
              : ""}
          </div>
        </div>
        <div className="info-column">
          <div className="info_title">Last Sale</div>
          <div className="info_value_main">
            {props.domainDetails.registeredPrice
              ? props.domainDetails.registeredPrice
              : "Fetching..."}
          </div>
        </div>
      </div>
    </>
  );
}

export default DomainOwnership;
