import React, { useState } from "react";
import "./DomainOwnership.css";
import AvatarGenerator from "../AvatarGenerator";
import { Tooltip } from "react-tooltip";
import TransferDomainPopup from "./TransferDomainPopup";
import baseContractABI from "../../artifacts/contracts/Base.json";
import resolverContractABI from "../../artifacts/contracts/PublicResolver.json";
import registryResolverContractABI from "../../artifacts/contracts/SidRegistry.json";
import DomainInformation from "../DomainInformation";
import { ethers } from "ethers";
import { getSubnode } from "./ProfileDetails";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import EditRolesForDomain from "./EditRolesForDomain";

function DomainOwnership(props) {
  const [ownershipDetails, setOwnershipDetails] = useState({});
  const [loading, setloading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAlternateIcon, setShowAlternateIcon] = useState(false);
  const [showTransferDomainPopup, setTransferDomainPopup] = useState(false);
  const [showEditRolesPopup, setEditRolesPopup] = useState(false);

  const handleClick = (text, index) => {
    navigator.clipboard.writeText(text);
    // Show the alternate SVG for a few seconds
    setSelectedItem(index);
    setShowAlternateIcon(true);

    setTimeout(() => {
      setShowAlternateIcon(false);
    }, 2000); // Adjust the duration as needed (in milliseconds)
  };

  const getOwnershipDetails = async () => {
    try {
      const domainName = props.domainDetails.name.replace(".mode", "");
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

      const baseContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE
          : chainId === 34443
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE
          : null;

      const registryContractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_REGISTRY
          : chainId === 34443
          ? process.env.REACT_APP_CONTRACT_ADDRESS_REGISTRY
          : null;
      // const contract = new ethers.Contract(
      //   process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE,
      //   baseContractABI.abi,
      //   signer
      // );

      //to find a eth record address of the domain name
      const resolverContract = new ethers.Contract(
        resolverContractAddress,
        resolverContractABI.abi,
        signer
      );
      const node = getSubnode(domainName);
      const record = await resolverContract.addr(node);

      // to find resolver and manager address of the domain name
      const registryResolverContract = new ethers.Contract(
        registryContractAddress,
        registryResolverContractABI.abi,
        signer
      );
      const resolver = await registryResolverContract.resolver(node);
      const manager = await registryResolverContract.owner(node);

      //to find a owner of the domain name
      const baseContract = new ethers.Contract(
        baseContractAddress,
        baseContractABI.abi,
        signer
      );
      const tokenId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(domainName)
      );
      const owner = await baseContract.ownerOf(tokenId);
      console.log("owner - ", owner);

      const addressToRoles = transformRolesToAddressRoles({
        owner: owner,
        record: record,
        manager: manager,
      });
      console.log(addressToRoles);
      setOwnershipDetails(addressToRoles);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnershipDetails();
  }, []);

  const transformRolesToAddressRoles = (roles) => {
    const addressToRoles = {};

    Object.entries(roles).forEach(([role, address]) => {
      if (!addressToRoles[address]) {
        addressToRoles[address] = [];
      }
      addressToRoles[address].push(role);
    });

    return addressToRoles;
  };
  const getTooltipContent = (role) => {
    switch (role) {
      case "owner":
        return "The Owner is the ultimate owner of the name. For .mode names the Owner (formerly Registrant) of a name can change the Manager and transfer ownership. Not all names will have an owner.";
      case "record":
        return "The address that will receive funds sent to this name on mode mainnet.";
      case "manager":
        return "The address that can change the profile, settings and profile editors.";
      // Add cases for other roles as needed
      default:
        return "Default tooltip content.";
    }
  };

  return (
    <>
      <div className="profileChildComponent">
        <div className="DomainOwnershipRolesTitle">
          <span>Roles</span>
        </div>
        <ul className="domainownership-list">
          {!loading ? (
            Object.entries(ownershipDetails).map(([address, roles], index) => (
              <li className="domainownership-list-item" key={index}>
                <span className="domainownership-item-left">
                  <AvatarGenerator
                    name={address}
                    width={"20px"}
                    height={"20px"}
                  />
                  <span className="domainownership-list-address">
                    {address
                      ? address.slice(0, 7) +
                        "..." +
                        address.slice(address.length - 8, address.length)
                      : "Connect Your Wallet"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    className="copy-icon"
                    onClick={() => handleClick(address, index)}
                  >
                    <g>
                      <rect fill="none" height="24" width="24" />
                    </g>
                    {selectedItem === index && showAlternateIcon ? (
                      <g>
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
                      </g>
                    ) : (
                      <g>
                        <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                      </g>
                    )}
                  </svg>
                </span>
                <span className="domainownership-item-right">
                  {roles.map((role, i) => (
                    <span
                      key={i}
                      data-tooltip-id="InfoAboutOwner"
                      data-tooltip-content={getTooltipContent(role)}
                    >
                      {role}
                    </span>
                  ))}
                </span>
                <Tooltip
                  id="InfoAboutOwner"
                  removeStyle
                  style={{
                    maxWidth: "200px",
                    wordBreak: "break-word",
                    fontFamily: "IBM Plex Sans, sans-serif",
                  }}
                />
              </li>
            ))
          ) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  width={"100%"}
                  height={50}
                  style={{ margin: "0px 0" }}
                />
              ))}
            </SkeletonTheme>
          )}
        </ul>
        <div className="domainTranferButton">
          <div className="editRolesbtn">
            <button
              onClick={() => {
                document.body.classList.add("popup-open");
                setEditRolesPopup(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              Edit Roles
            </button>
          </div>
          <button
            onClick={() => {
              document.body.classList.add("popup-open");
              setTransferDomainPopup(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m233-280 76 76q12 12 11.5 28T308-148q-12 11-28 11.5T252-148L108-292q-6-6-8.5-13T97-320q0-8 2.5-15t8.5-13l144-144q11-11 27.5-11t28.5 11q12 12 12 28.5T308-435l-75 75h567q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H233Zm494-320H160q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680h567l-76-76q-12-12-11.5-28t12.5-28q12-11 28-11.5t28 11.5l144 144q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L708-468q-11 11-27.5 11T652-468q-12-12-12-28.5t12-28.5l75-75Z" />
            </svg>
            Transfer
          </button>
        </div>
      </div>
      <DomainInformation domainDetails={props.domainDetails} />
      {showTransferDomainPopup && (
        <TransferDomainPopup
          setTransferDomainPopup={setTransferDomainPopup}
          address={props.address}
          domainName={props.domainDetails.name}
        />
      )}
      {showEditRolesPopup && (
        <EditRolesForDomain
          setEditRolesPopup={setEditRolesPopup}
          address={props.address}
          domainName={props.domainDetails.name}
        />
      )}
    </>
  );
}

export default DomainOwnership;
