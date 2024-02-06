import React, { useEffect, useState } from "react";
import DateComponent from "./DateComponent";
import "../styles/DomainInformation.css";
import baseContractABI from "../artifacts/contracts/Base.json";
import { ethers } from "ethers";

function DomainInformation(props) {
  const [expiryDate, setExpiryDate] = useState();
  const getExpiryDate = async () => {
    try {
      const domainName = props.domainDetails.name.replace(".mode", "");
      const { ethereum } = window; // Ensure that the user is connected to the expected chain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      const signer = provider.getSigner();
      const tokenId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(domainName)
      );
      const baseContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE
          : chainId === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID_BASE
          : null;
      //to find a owner of the domain name
      const baseContract = new ethers.Contract(
        baseContractAddress,
        baseContractABI.abi,
        signer
      );
      const expiryDateInEpoch = await baseContract.nameExpires(tokenId);
      // console.log("expiryDateInEpoch - ", expiryDateInEpoch);

      setExpiryDate(expiryDateInEpoch);
    } catch (error) {}
  };
  useEffect(() => {
    getExpiryDate();
  }, []);
  return (
    <div className="info-section">
      <div className="info-column">
        <div className="info_title">Created Date</div>
        <DateComponent
          epochTime={
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Created Date"
            )?.value
          }
        />
      </div>
      <div className="info-column">
        <div className="info_title">Registered Date</div>
        <DateComponent
          epochTime={
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Registration Date"
            )?.value
          }
        />
      </div>
      <div className="info-column">
        <div className="info_title">Expiry Date</div>
        <DateComponent epochTime={expiryDate ? expiryDate : null} />
      </div>
      <div className="info-column">
        <div className="info_title">Length</div>
        <div className="info_value_main">
          {
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Length"
            )?.value
          }
        </div>
      </div>

      <div className="info-column">
        <div className="info_title">Segment Length</div>
        <div className="info_value_main">
          {
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Segment Length"
            )?.value
          }
        </div>
      </div>
      <div className="info-column">
        <div className="info_title">Character Set</div>
        <div className="info_value_main">
          {
            props.domainDetails.attributes.find(
              (attr) => attr.trait_type === "Character Set"
            )?.value
          }
        </div>
      </div>
    </div>
  );
}

export default DomainInformation;
