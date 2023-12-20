import React from "react";
import "../styles/InfoPopup.css";

function InfoPopup(props) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-card">
          <h2>High Gas Fees</h2>
          <p>We are fixing the high gas spend issue! 🙈</p>
          <p>Avoid minting till midnight today. 🎊</p>
          <div className="popup-btns">
            <button
              className="move-forward"
              onClick={() => {
                props.setHighGasPopup(false);
                props.registerName();
              }}
            >
              Mint with HighGasUsage
            </button>
            <button
              className="close-popup"
              onClick={() => props.setHighGasPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
