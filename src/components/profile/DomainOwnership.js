import React, { useState } from "react";
import "./DomainOwnership.css";
import AvatarGenerator from "../AvatarGenerator";
import { Tooltip } from "react-tooltip";
import TransferDomainPopup from "./TransferDomainPopup";
import DomainInformation from "../DomainInformation";

function DomainOwnership(props) {
  const [showAlternateIcon, setShowAlternateIcon] = useState(false);
  const [showTransferDomainPopup, setTransferDomainPopup] = useState(false);
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
                enableBackground="new 0 0 24 24"
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
                enableackground="new 0 0 24 24"
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
              document.body.classList.add("popup-open");
              props.setTransferDomainPopup(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m233-280 76 76q12 12 11.5 28T308-148q-12 11-28 11.5T252-148L108-292q-6-6-8.5-13T97-320q0-8 2.5-15t8.5-13l144-144q11-11 27.5-11t28.5 11q12 12 12 28.5T308-435l-75 75h567q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H233Zm494-320H160q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680h567l-76-76q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l144 144q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L708-468q-11 11-27.5 11T652-468q-12-12-12-28.5t12-28.5l75-75Z" />
            </svg>
            Transfer
          </button>
        </div>
      </div>
      <DomainInformation domainDetails={props.domainDetails} />
    </>
  );
}

export default DomainOwnership;
