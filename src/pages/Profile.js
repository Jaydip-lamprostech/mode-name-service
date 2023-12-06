import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import modenft from "../asset/images/modenft.png";
import "../styles/AccordionPanel.css";
import contract_abi from "../artifacts/contracts/NameRegistry.sol/NameRegistry.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import WalletNotConnected from "../components/profile/WalletNotConnected";
import AccordionPanel from "../components/profile/AccordionPanel";
import { getNameByAddress } from "../components/getNameByAddress";

function Profile() {
  const { address } = useAccount();

  const [domainDetails, setDomainDetails] = useState({
    domain: "",
    expiryDate: "",
    expiryTime: "",
    registeredPrice: "",
    registeredDate: "",
    registeredTime: "",
  });

  const [domainFound, setDomainFound] = useState(false);

  useEffect(() => {
    if (!address) {
      setDomainDetails({
        domain: "Connect wallet to check",
        expiryDate: "-",
        expiryTime: "",
        registeredPrice: "-",
        registeredDate: "-",
        registeredTime: "",
      });
    } else {
      const fetchName = async () => {
        setDomainDetails({
          domain: "Fetching...",
          expiryDate: "Fetching...",
          expiryTime: "",
          registeredPrice: "Fetching...",
          registeredDate: "Fetching...",
          registeredTime: "",
        });
        try {
          const name = await getNameByAddress(address);
          // console.log(name);
          if (name) {
            setDomainDetails({
              domain: name.domain,
              expiryDate: name.expiryDate,
              expiryTime: name.expiryTime,
              registeredDate: name.registeredDate,
              registeredTime: name.registeredTime,
              registeredPrice: name.registeredPrice,
            });
            setDomainFound(true);
          } else {
            setDomainFound(false);
            setDomainDetails({
              domain: "Domain not found for this address",
              expiryDate: "N/A",
              expiryTime: "",
              registeredPrice: "N/A",
              registeredDate: "N/A",
              registeredTime: "",
            });
          }
        } catch (err) {
          setDomainFound(false);
          setDomainDetails({
            domain: "Domain not found for this address",
            expiryDate: "N/A",
            expiryTime: "",
            registeredPrice: "N/A",
            registeredDate: "N/A",
            registeredTime: "",
          });
          // console.log(err);
        }
      };
      fetchName();
    }

    return () => {
      setDomainDetails({
        domain: "Domain not found for this address",
        expiryDate: "N/A",
        expiryTime: "",
        registeredPrice: "N/A",
        registeredDate: "N/A",
        registeredTime: "",
      });
    };
  }, [address]);

  if (address)
    return (
      <div className="profile-container">
        <h1 className="domain_profile_page_title">Domains</h1>
        <AccordionPanel
          title={domainDetails.domain ? domainDetails.domain : "Fetching..."}
        >
          {domainFound ? (
            <>
              <div className="profile-section">
                <img
                  className="profile-picture"
                  src={modenft}
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
                      ? domainDetails.registeredPrice
                      : "Fetching..."}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="profile-section">
                <div className="dnf-address-div">
                  <p className="dnf-info">
                    {" "}
                    Experience seamless, user-centric blockchain engagement on
                    the MODE network with ModeDomains.
                  </p>
                  <a className="claim-domain-btn" href="/">
                    Claim Domain
                  </a>
                </div>
              </div>
            </>
          )}
        </AccordionPanel>
      </div>
    );
  else {
    return <WalletNotConnected />;
  }
}

export default Profile;
