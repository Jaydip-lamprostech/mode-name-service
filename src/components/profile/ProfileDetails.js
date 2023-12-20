import React, { useState } from "react";
import ExtendExpiryDate from "./ExtendExpiryDate";
import { toBigInt } from "web3-utils";

function ProfileDetails(props) {
  let address = props.address ? props.address : "";

  return (
    <>
      <div className="profile-section">
        <img
          className="profile-picture"
          src={props.modenft}
          alt="mode nft domain name"
        />
        <div className="address-div">
          <p className="wallet-address-title">Address</p>
          <p className="wallet-address">
            {address
              ? address.slice(0, 6) +
                "..." +
                address.slice(address.length - 6, address.length)
              : "Connect Your Wallet"}
          </p>
          <p className="wallet-address-title">Parent</p>
          <p className="wallet-address">MODE</p>
        </div>
      </div>
      <div className="domainActionButtons">
        <button
          onClick={() => {
            document.body.classList.add("popup-open");
            props.setExtendPopup(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
          </svg>
          Extend
        </button>
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
        <button
          onClick={() =>
            window.open(
              `https://sid-marketplace-git-feat-dev-30-space-id.vercel.app/name/7439/${toBigInt(
                props.tokenId
              )}`
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M201-120q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518v318q0 33-23.5 56.5T761-120H201Zm368-440q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z" />
          </svg>
          List Now
        </button>
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
      {props.showExtendPopup ? (
        <ExtendExpiryDate
          setExtendPopup={props.setExtendPopup}
          domainCurrentexpiryDate={props.domainDetails.expiryDate}
          domainName={props.domainDetails.domain}
          expiryDateInSec={props.expiryDateInSec}
        />
      ) : null}
    </>
  );
}

export default ProfileDetails;
