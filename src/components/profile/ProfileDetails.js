import React from "react";

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

export default ProfileDetails;
