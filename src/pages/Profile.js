import React, { useCallback, useEffect, useState } from "react";
import "../styles/Profile.css";
import modenft from "../asset/images/modenft.png";
import "../styles/AccordionPanel.css";
import contract_abi from "../artifacts/contracts/NameRegistry.json";
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
import ProfileDomainNavbar from "../components/profile/ProfileDomainNavbar";

//
import reverseRegistrarABI from "../artifacts/contracts/ReverseRegistrar.json";
import resolverABI from "../artifacts/contracts/Resolver.json";
import baseContractABI from "../artifacts/contracts/Base.json";
import TransferDomainPopup from "../components/profile/TransferDomainPopup";
const providerUrl = "https://sepolia.mode.network/";

function Profile() {
  const { address } = useAccount();
  const [ensName, setEnsName] = useState("");
  const [expiryDateInSec, setExpiryDateInSec] = useState("");
  const [regDateInSec, setRegDateInSec] = useState("");
  const [showExtendPopup, setExtendPopup] = useState(false);
  const [showTransferDomainPopup, setTransferDomainPopup] = useState(false);
  const [domainDetails, setDomainDetails] = useState({
    domain: "",
    expiryDate: "",
    expiryTime: "",
    registeredPrice: "",
    registeredDate: "",
    registeredTime: "",
  });

  const [domainFound, setDomainFound] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [activeItems, setActiveItems] = useState(""); // Track active items for each instance

  //ownership check
  const [ownerAddress, setOwnerAddress] = useState();
  const [managerAddress, setManagerAddress] = useState();
  const [ethRecordAddress, setEthRecordAddress] = useState();

  const handleNavbarClick = (instanceId, itemName) => {
    setActiveItems((prevActiveItems) => ({
      ...prevActiveItems,
      [instanceId]: itemName,
    }));
  };

  const fetchName = useCallback(async () => {
    setDomainDetails({
      domain: "Fetching...",
      expiryDate: "Fetching...",
      expiryTime: "",
      registeredPrice: "Fetching...",
      registeredDate: "Fetching...",
      registeredTime: "",
    });
    try {
      await resolveAddressToENS();
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
  }, [address, showExtendPopup]);

  const resolveAddressToENS = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const reverseRegistrar = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS_REVERSE_REGISTRAR,
        reverseRegistrarABI.abi,
        provider
      );
      console.log(reverseRegistrar);

      const reverseNode = await reverseRegistrar.node(address);
      console.log(reverseNode);
      if (reverseNode === ethers.constants.HashZero) {
        throw new Error(`No reverse resolution found for ${address}`);
      }

      const resolverContract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER,
        resolverABI.abi,
        provider
      );

      let name = await resolverContract.name(reverseNode);
      console.log(name);
      name = name.replace(".mode", "");
      console.log(name);
      setEnsName(name);
      if (name) {
        const tokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
        console.log(tokenId);
        setTokenId(tokenId);
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
        // const wallet = new ethers.Wallet(privateKey, provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE,
          baseContractABI.abi,
          signer
        );
        const expiryDate = await contract.nameExpires(tokenId);
        console.log(expiryDate);
        setExpiryDateInSec(parseInt(expiryDate));
        console.log(expiryDate);
        const expDate = new Date(expiryDate * 1000);
        // console.log(expDate);
        const formattedExpDate = expDate.toLocaleDateString("en-US", {
          // weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const formattedExpTime = expDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        });

        const uri = await contract.tokenURI(tokenId);

        console.log(uri);
        const fetchData = async () => {
          try {
            const response = await fetch(`${uri}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching data:", error.message);
          }
        };
        const uriData = await fetchData(uri);
        console.log(uriData);
        setDomainDetails({
          domain: name,
          expiryDate: formattedExpDate,
          expiryTime: formattedExpTime,
          registeredDate: "-",
          registeredTime: "",
          registeredPrice: "-",
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

      return;
    } catch (error) {
      // setError(`Error resolving address to ENS name: ${error.message}`);
      console.log(error.message);
    }
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
  }, [address, fetchName]);

  const checkOwnerShip = async () => {
    try {
      setOwnerAddress("jd676");
      setManagerAddress("jd676");
      setEthRecordAddress("jd676");
    } catch (err) {
      console.log(err);
    }
  };

  if (address)
    return (
      <div className="profile-container">
        <h1 className="domain_profile_page_title">Your Domain Names</h1>
        {domainFound ? (
          <>
            <AccordionPanel
              title={
                domainDetails.domain && domainDetails.domain !== "Fetching..."
                  ? domainDetails.domain + ".mode"
                  : "Fetching..."
              }
            >
              <ProfileDomainNavbar
                instanceId="instance1"
                onClick={(itemName) => handleNavbarClick("instance1", itemName)}
              />

              {activeItems["instance1"] === "Details" || activeItems === "" ? (
                <ProfileDetails
                  modenft={modenft}
                  address={address}
                  domainDetails={domainDetails}
                  expiryDateInSec={expiryDateInSec}
                  setExtendPopup={setExtendPopup}
                  showExtendPopup={showExtendPopup}
                  setTransferDomainPopup={setTransferDomainPopup}
                  tokenId={tokenId}
                />
              ) : activeItems["instance1"] === "Ownership" ? (
                <DomainOwnership
                  address={address}
                  domainName={domainDetails.domain}
                  domainDetails={domainDetails}
                  setTransferDomainPopup={setTransferDomainPopup}
                />
              ) : activeItems["instance1"] === "Subnames" ? (
                <Subnames />
              ) : activeItems["instance1"] === "Permissions" ? (
                <PermissionsOfDomain />
              ) : activeItems["instance1"] === "MoreDetails" ? (
                <MoreAboutDomains />
              ) : null}
            </AccordionPanel>
            <AccordionPanel title={"Other Domains"}>
              <div className="profile-section">
                <div className="dnf-address-div">
                  <p className="dnf-info">
                    Other owned domains will be visible here soon 🚀 <br />
                    for now visit
                  </p>
                  <a
                    className="claim-domain-btn"
                    href={`https://sid-marketplace-git-feat-dev-30-space-id.vercel.app/profile/domains/${address}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Space.ID
                  </a>
                </div>
              </div>
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
        {showTransferDomainPopup ? (
          <TransferDomainPopup
            setTransferDomainPopup={setTransferDomainPopup}
            domainName={domainDetails.domain}
            address={address}
            ethRecordAddress={ethRecordAddress}
            managerAddress={managerAddress}
            ownerAddress={ownerAddress}
          />
        ) : null}
      </div>
    );
  else {
    return <WalletNotConnected />;
  }
}

export default Profile;
