import React from "react";

function Info2Popup(props) {
  return (
    <div className="UserEligibilityForFreeDomain_popup_overlay">
      <div className="afterpurchase_popup_container">
        <div className="afterpurchase_popup_card">
          <div className="registration_popup_close_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
              onClick={() => {
                props.setSecondInfoPopup(false);
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </div>
          <h2 style={{ fontSize: "1.5rem" }}>
            🌟Mode Domains: Transitioning to .mode Excellence! 🌐🚀
          </h2>

          <p style={{ margin: "20px auto" }}>
            For the sake of fostering the Mode ecosystem and our deep
            appreciation for the Mode team, Mode Domains is undergoing a sunset,
            consolidating into a single on-chain TLD, .mode. 🌐 Mode NS will
            serve as the primary naming service on Mode, while ModeDomains will
            function as a frontend to facilitate interaction with these
            contracts temporarily.
          </p>
          <p style={{ margin: "20px auto" }}>
            🙌 We extend our heartfelt gratitude to all testnet minters! As a
            token of thanks, we're thrilled to announce the distribution of
            $10,000 worth of Mode to testnet minters. 💰 If you're interested in
            participating, please join our Discord for further updates.
          </p>
          <p style={{ margin: "20px auto" }}>
            🌟 We extend our best wishes for Mode's success and eagerly look
            forward to contributing to its growth. Cheers to the Mode community!
            🚀🌱
          </p>

          <div className="afterpurchase_popup-btns">
            {/* <button
          className="close_afterpurchase_popup"
          onClick={() => {
            props.handleCloseUserEligibilityPopup(false);
          }}
        >
          Close
        </button> */}
            <button
              className="tweet_button"
              onClick={() => {
                props.setSecondInfoPopup(false);
              }}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info2Popup;
