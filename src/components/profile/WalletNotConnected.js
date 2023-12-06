import React from "react";
import "../../styles/WalletNotConnected.css";
import { useConnectModal } from "@rainbow-me/rainbowkit";

function WalletNotConnected() {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="wallect-not-connected-main">
      <div className="info-section">
        <div className="info-column">
          <div className="info_title">Connect your wallet</div>
          <div className="info_value_main">
            Connect your wallet to see the domain name which you bought on this
            platform.
          </div>
          <div className="info_value_sub">
            <button className="wnc-connect-wallet" onClick={openConnectModal}>
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletNotConnected;
