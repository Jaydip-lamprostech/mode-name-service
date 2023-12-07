import React from "react";

function ProfileDetails(props) {
  let address = props.address ? props.address : "";
  return (
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
  );
}

export default ProfileDetails;
