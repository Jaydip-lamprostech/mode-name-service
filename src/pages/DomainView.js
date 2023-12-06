import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import modenft from "../asset/images/modenft.png";
import AccordionPanel from "../components/profile/AccordionPanel";
import { useLocation } from "react-router-dom";

function DomainView() {
  const location = useLocation();
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const [domainDetails, setDomainDetails] = useState({
    domainOwner: "",
    domain: "",
    expiryDate: "",
    expiryTime: "",
    registeredPrice: "",
    registeredDate: "",
    registeredTime: "",
  });

  const handleCopyIconClick = (text) => {
    setShowCopyIcon(true);
    navigator.clipboard.writeText(text);

    setTimeout(() => {
      setShowCopyIcon(false);
    }, 1000);
  };
  useEffect(() => {
    if (location.state) {
      const data = location.state;
      console.log(data);
      const regDate = new Date(data.domainNameRegisteredTime * 1000);
      const formattedRegTime = regDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      const expDate = new Date(data.domainNameExpiryTime * 1000);

      const formattedExpTime = expDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      setDomainDetails({
        domainOwner: data.domainOwner,
        domain: data.domainName,
        expiryDate: data.domainNameExpiryDate,
        expiryTime: formattedExpTime,
        registeredPrice: data.domainNameRegisteredPrice,
        registeredDate: data.domainNameRegisteredDate,
        registeredTime: formattedRegTime,
      });
    }
  }, [location.state]);
  return (
    <div className="profile-container">
      <AccordionPanel
        title={
          domainDetails.domain ? domainDetails.domain + ".mode" : "Fetching..."
        }
      >
        <>
          <div className="profile-section">
            <img
              className="profile-picture"
              src={modenft}
              alt="mode nft domain name"
            />
            <div className="address-div">
              <p className="wallet-address-title">Owner Address</p>
              <p className="wallet-address">
                {domainDetails.domainOwner ? (
                  <>
                    {domainDetails.domainOwner.slice(0, 6) +
                      "..." +
                      domainDetails.domainOwner.slice(
                        domainDetails.domainOwner.length - 6,
                        domainDetails.domainOwner.length
                      )}
                    {showCopyIcon ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 20 20"
                        height="36px"
                        viewBox="0 0 20 20"
                        width="36px"
                        fill="#dffe00"
                      >
                        <g>
                          <rect fill="none" height="20" width="20" />
                        </g>
                        <g>
                          <path d="M18,10l-1.77-2.03l0.25-2.69l-2.63-0.6l-1.37-2.32L10,3.43L7.53,2.36L6.15,4.68L3.53,5.28l0.25,2.69L2,10l1.77,2.03 l-0.25,2.69l2.63,0.6l1.37,2.32L10,16.56l2.47,1.07l1.37-2.32l2.63-0.6l-0.25-2.69L18,10z M13.18,8.47l-4.24,4.24 c-0.2,0.2-0.51,0.2-0.71,0L6.82,11.3c-0.2-0.2-0.2-0.51,0-0.71s0.51-0.2,0.71,0l1.06,1.06l3.89-3.89c0.2-0.2,0.51-0.2,0.71,0 S13.38,8.28,13.18,8.47z" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="36px"
                        viewBox="0 0 24 24"
                        width="36px"
                        fill="#ffffff80"
                        onClick={() =>
                          handleCopyIconClick(domainDetails.domainOwner)
                        }
                      >
                        <g>
                          <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                          <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                        </g>
                      </svg>
                    )}
                  </>
                ) : (
                  "Connect Your Wallet"
                )}
              </p>
              <p className="wallet-address-title">Parent</p>
              <p className="wallet-address">mode</p>
            </div>
          </div>
          <div className="info-section">
            <div className="info-column">
              <div className="info_title">Registered Date</div>
              <div className="info_value_main">
                {domainDetails.registeredDate
                  ? domainDetails.registeredDate
                  : "Fetching..."}
              </div>
              <div className="info_value_sub">
                {domainDetails.registeredTime
                  ? domainDetails.registeredTime
                  : ""}
              </div>
            </div>
            <div className="info-column">
              <div className="info_title">Expiry Date</div>
              <div className="info_value_main">
                {domainDetails.expiryDate
                  ? domainDetails.expiryDate
                  : "Fetching..."}
              </div>
              <div className="info_value_sub">
                {domainDetails.expiryTime ? domainDetails.expiryTime : ""}
              </div>
            </div>
            <div className="info-column">
              <div className="info_title">Last Sale</div>
              <div className="info_value_main">
                {domainDetails.registeredPrice
                  ? domainDetails.registeredPrice + " ETH"
                  : "Fetching..."}
              </div>
            </div>
          </div>
        </>
      </AccordionPanel>
    </div>
  );
}

export default DomainView;
