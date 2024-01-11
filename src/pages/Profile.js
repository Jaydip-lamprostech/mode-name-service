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
import resolverContractABI from "../artifacts/contracts/PublicResolver.json";
import reverseRegistrarABI from "../artifacts/contracts/ReverseRegistrar.json";
import { ethers } from "ethers";

const Profile = () => {
  const { address } = useAccount();
  const [primaryDomain, setPrimaryDomain] = useState(null);
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domainFound, setDomainFound] = useState(true);

  //if the primary name can be fetched separately
  const [isPrimaryDomain, setIsPrimaryDomain] = useState("");

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
        setIsPrimaryDomain("raj.mode");
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

  const getPrimaryName = async () => {
    try {
      const { ethereum } = window; // Ensure that the user is connected to the expected chain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();

      const signer = provider.getSigner();

      const resolverContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER
          : chainId === 34443
          ? process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER
          : null;

      const reverseRegistrarContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_REVERSE_REGISTRAR
          : chainId === 34443
          ? process.env.REACT_APP_CONTRACT_ADDRESS_REVERSE_REGISTRAR
          : null;

      const resolverContract = new ethers.Contract(
        resolverContractAddress,
        resolverContractABI.abi,
        signer
      );

      const reverseRegistrarContract = new ethers.Contract(
        reverseRegistrarContractAddress,
        reverseRegistrarABI.abi,
        signer
      );

      const reverseNode = await reverseRegistrarContract.node(address);

      // console.log(reverseNode);
      const primaryName = await resolverContract.name(reverseNode);
      console.log(primaryName);

      return primaryName;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (address) {
      getPrimaryName().then((primaryName) => {
        setPrimaryDomain(primaryName);
      });
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
          <AccordionPanel
            key={index}
            title={domain.name}
            isPrimary={domain.name === isPrimaryDomain}
          >
            <ProfileDomainNavbar
              instanceId={`instance${index}`}
              activeItems={activeItems[`instance${index}`]}
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
                isNotPrimaryDomain={domain.name !== isPrimaryDomain}
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
