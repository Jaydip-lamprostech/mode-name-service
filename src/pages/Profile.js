import React, { useCallback, useEffect, useState } from "react";
import "../styles/Profile.css";
import modenft from "../asset/images/modenft.png";
import "../styles/AccordionPanel.css";
import { useAccount } from "wagmi";
import WalletNotConnected from "../components/profile/WalletNotConnected";
import AccordionPanel from "../components/profile/AccordionPanel";
import ProfileDetails from "../components/profile/ProfileDetails";
import Subnames from "../components/profile/Subnames";
import PermissionsOfDomain from "../components/profile/PermissionsOfDomain";
import MoreAboutDomains from "../components/profile/MoreAboutDomains";
import DomainOwnership from "../components/profile/DomainOwnership";
import ProfileDomainNavbar from "../components/profile/ProfileDomainNavbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TransferDomainPopup from "../components/profile/TransferDomainPopup";

const Profile = () => {
  const { address } = useAccount();

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domainFound, setDomainFound] = useState(true);

  const [activeItems, setActiveItems] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://modedomains-nft-apis.vercel.app/api/getAllDomains/${address}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setDomainFound(true);
        setDomains(data);
      } else {
        setDomainFound(false);
        setDomains([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDomainFound(false);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      fetchData();
    }
  }, [address, fetchData]);

  const handleNavbarClick = (instanceId, itemName) => {
    setActiveItems((prevActiveItems) => ({
      ...prevActiveItems,
      [instanceId]: itemName,
    }));
  };

  if (!address) {
    return <WalletNotConnected />;
  }

  return (
    <div className="profile-container">
      <h1 className="domain_profile_page_title">Your Domain Names</h1>

      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="skeletonParentDivProfile">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                width={"100%"}
                height={50}
                style={{ margin: "10px 0" }}
              />
            ))}
          </div>
        </SkeletonTheme>
      ) : domainFound && domains.length > 0 ? (
        domains.map((domain, index) => (
          <AccordionPanel key={index} title={domain.name}>
            <ProfileDomainNavbar
              instanceId={`instance${index}`}
              onClick={(itemName) =>
                handleNavbarClick(`instance${index}`, itemName)
              }
            />

            {activeItems[`instance${index}`] === "Details" ||
            !activeItems[`instance${index}`] ? (
              <ProfileDetails
                modenft={modenft}
                domainDetails={domain}
                expiryDateInEpoch={
                  domain.attributes.find(
                    (attr) => attr.trait_type === "Expiration Date"
                  )?.value
                }
              />
            ) : activeItems[`instance${index}`] === "Ownership" ? (
              <DomainOwnership address={address} domainDetails={domain} />
            ) : activeItems[`instance${index}`] === "Subnames" ? (
              <Subnames />
            ) : activeItems[`instance${index}`] === "Permissions" ? (
              <PermissionsOfDomain />
            ) : activeItems[`instance${index}`] === "MoreDetails" ? (
              <MoreAboutDomains />
            ) : null}
          </AccordionPanel>
        ))
      ) : !domainFound && domains.length === 0 ? (
        <AccordionPanel title={"Domain not found for this address"}>
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
      ) : null}
    </div>
  );
};

export default Profile;
