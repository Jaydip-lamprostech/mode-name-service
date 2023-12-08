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
import ProfileDetails from "../components/profile/ProfileDetails";
import Subnames from "../components/profile/Subnames";
import PermissionsOfDomain from "../components/profile/PermissionsOfDomain";
import MoreAboutDomains from "../components/profile/MoreAboutDomains";
import DomainOwnership from "../components/profile/DomainOwnership";

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
  const [activeItem, setActiveItem] = useState("Details");

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

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
        <h1 className="domain_profile_page_title">Your Domain Names</h1>
        {domainFound ? (
          <>
            <AccordionPanel
              title={
                domainDetails.domain ? domainDetails.domain : "Fetching..."
              }
            >
              <ul className="profileNavbar">
                <li
                  className={
                    activeItem === "Details"
                      ? "active profileNavbarItem"
                      : "profileNavbarItem"
                  }
                  onClick={() => handleClick("Details")}
                >
                  Details
                </li>
                <li
                  className={
                    activeItem === "Ownership"
                      ? "active profileNavbarItem"
                      : "profileNavbarItem"
                  }
                  onClick={() => handleClick("Ownership")}
                >
                  Ownership
                </li>
                <li
                  className={
                    activeItem === "Subnames"
                      ? "active profileNavbarItem"
                      : "profileNavbarItem"
                  }
                  onClick={() => handleClick("Subnames")}
                >
                  Subnames
                </li>
                <li
                  className={
                    activeItem === "Permissions"
                      ? "active profileNavbarItem"
                      : "profileNavbarItem"
                  }
                  onClick={() => handleClick("Permissions")}
                >
                  Permissions
                </li>
                <li
                  className={
                    activeItem === "More"
                      ? "active profileNavbarItem"
                      : "profileNavbarItem"
                  }
                  onClick={() => handleClick("More")}
                >
                  More
                </li>
              </ul>

              {activeItem === "Details" ? (
                <ProfileDetails
                  modenft={modenft}
                  address={address}
                  domainDetails={domainDetails}
                />
              ) : activeItem === "Ownership" ? (
                <DomainOwnership
                  address={address}
                  domainName={domainDetails.domain}
                  domainDetails={domainDetails}
                />
              ) : activeItem === "Subnames" ? (
                <Subnames />
              ) : activeItem === "Permissions" ? (
                <PermissionsOfDomain />
              ) : (
                <MoreAboutDomains />
              )}
            </AccordionPanel>
          </>
        ) : (
          <AccordionPanel
            title={domainDetails.domain ? domainDetails.domain : "Fetching..."}
          >
            <div className="profile-section">
              <div className="dnf-address-div">
                <p className="dnf-info">
                  Experience seamless, user-centric blockchain engagement on the
                  MODE network with ModeDomains.
                </p>
                <a className="claim-domain-btn" href="/">
                  Claim Domain
                </a>
              </div>
            </div>
          </AccordionPanel>
        )}
      </div>
    );
  else {
    return <WalletNotConnected />;
  }
}

export default Profile;
