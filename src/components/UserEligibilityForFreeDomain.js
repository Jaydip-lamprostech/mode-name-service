import React from "react";
import "../styles/UserEligibilityForFreeDomain.css";

function UserEligibilityForFreeDomain(props) {
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
                props.setuserEligibleForFreeDomain(false);
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </div>
          <h2>🎉 Congratulations 🎉 </h2>
          <p className="free-domain-p">You are eligible for a free domain!🚀</p>
          <span>A domain with 5 or more than 5 letters.</span>
          <p>
            This domain will be on us for a year and the cost will be reverted
            to you and only the transaction fee will be deducted.🌐✨
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
                props.setuserEligibleForFreeDomain(false);
              }}
            >
              Buy One
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEligibilityForFreeDomain;
