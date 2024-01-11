import { useChainModal } from "@rainbow-me/rainbowkit";
import React from "react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import animationDataSuccess from "../../asset/Animation - 1703234774069.json";
import animationDataError from "../../asset/Animation - 1703236148033.json";
import baseContractABI from "../../artifacts/contracts/Base.json";
import resolverContractABI from "../../artifacts/contracts/PublicResolver.json";
import registryResolverContractABI from "../../artifacts/contracts/SidRegistry.json";
import Lottie from "react-lottie";
import { ethers } from "ethers";
import { getSubnode } from "./ProfileDetails";
import { toBigInt } from "web3-utils";
import { useAccount } from "wagmi";
import { useEffect } from "react";

function EditRolesForDomain(props) {
  const { address } = useAccount();
  const [activeItem, setActiveItem] = useState("record");
  const { openChainModal } = useChainModal();
  const [loading, setLoading] = useState(false);
  const [txButtonText, setTxButtonText] = useState("Change " + activeItem);
  const [
    currentOwnershipAddressInputText,
    setCurrentOwnershipAddressInputText,
  ] = useState();
  const [currentOwnershipAddress, setCurrentOwnershipAddress] = useState();
  const [txErrorMessage, setTxErrorMessage] = useState(false);
  const [txSuccessfull, setTxSuccessfull] = useState(false);
  const [recepientAddress, setRecepientAddress] = useState("");
  const [domainNode, setDomainNode] = useState();
  const [domainTokenID, setDomainTokenID] = useState("");
  const [baseContract, setBaseContract] = useState();

  const [resolverContract, setResolverContract] = useState();
  const [registryResolverContract, setRegistryResolverContract] = useState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: txSuccessfull ? animationDataSuccess : animationDataError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleChangeRole = async () => {
    setTxErrorMessage();
    setLoading(true);
    setTxButtonText("Waiting for the transaction");
    const domainName = props.domainName.replace(".mode", "");
    try {
      const { ethereum } = window; // Ensure that the user is connected to the expected chain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== 919 && chainId !== 34443) {
        // throw new Error("Please connect to the correct chain.");
        openChainModal();

        return;
      }
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
      // const contract = new ethers.Contract(
      //   process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE,
      //   baseContractABI.abi,
      //   signer
      // );
      const resolverContract = new ethers.Contract(
        resolverContractAddress,
        resolverContractABI.abi,
        signer
      );
      const baseContract = new ethers.Contract(
        baseContractAddress,
        baseContractABI.abi,
        signer
      );
      const tokenId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(domainName)
      );
      let subNode = await getSubnode(domainName);
      // contract call for changing the ethrecord
      if (activeItem === "record" && recepientAddress !== address) {
        console.log("inside ethrecord");
        const tx = await resolverContract.setAddr(subNode, recepientAddress);

        setTxButtonText("Changing...");
        const data = await tx.wait();
      }

      // contract call for changing the manager
      if (activeItem === "manager" && recepientAddress !== address) {
        console.log("inside manager");
        const tx = await baseContract.reclaim(
          toBigInt(tokenId),
          recepientAddress
        );

        setTxButtonText("Changing...");
        const data = await tx.wait();
      }

      if (activeItem === "owner" && recepientAddress !== address) {
        console.log("inside owner");
        const tx = await baseContract.safeTransferFrom(
          props.address,
          recepientAddress,
          tokenId
        );

        setTxButtonText("Changing...");
        const data = await tx.wait();
      }

      setTxErrorMessage();
      setLoading(false);
      setTxSuccessfull(true);
      setTxButtonText("OK");
    } catch (error) {
      setTxSuccessfull(false);
      setTxButtonText("Change " + activeItem);
      setLoading(false);
      console.log(error.message);
      if (error.message.includes("Address is already registered with a name"))
        setTxErrorMessage(
          "You already have claimed one handle, get more on Mainnet."
        );
      else if (error.data?.message.includes("insufficient funds for gas"))
        setTxErrorMessage(
          "Insufficient funds for gas. Get some from Mode Faucet."
        );
      else if (error.message.includes("Insufficient funds sent"))
        setTxErrorMessage("Insufficient funds to cover the transaction.");
      else {
        setTxErrorMessage(
          "An error occurred while processing your transaction"
        );
      }
    }
  };

  //   const customFunction = async (contract, contractFunction, parameters) => {
  //     try {
  //       const data = await contract[contractFunction](...parameters);
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  useEffect(() => {
    setCurrentOwnershipAddressInputText("");
    if (activeItem === "record") {
      setCurrentOwnershipAddressInputText(currentOwnershipAddress?.record);
    } else if (activeItem === "manager") {
      setCurrentOwnershipAddressInputText(currentOwnershipAddress?.manager);
    } else if (activeItem === "owner") {
      setCurrentOwnershipAddressInputText(currentOwnershipAddress?.owner);
    }

    setTxButtonText("Change " + activeItem);
    setRecepientAddress("");
  }, [activeItem]);

  const getOwnershipDetails = async () => {
    try {
      const domainName = props.domainName.replace(".mode", "");
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

      //to find a eth record address of the domain name
      const resolverContract = new ethers.Contract(
        resolverContractAddress,
        resolverContractABI.abi,
        signer
      );
      console.log("checking times - ", resolverContract);
      setResolverContract(resolverContract);
      const node = await getSubnode(domainName);
      setDomainNode(node);
      const record = await resolverContract.addr(node);

      // to find resolver and manager address of the domain name
      const registryResolverContract = new ethers.Contract(
        registryContractAddress,
        registryResolverContractABI.abi,
        signer
      );

      setRegistryResolverContract(registryResolverContract);
      const manager = await registryResolverContract.owner(node);

      //to find a owner of the domain name
      const baseContract = new ethers.Contract(
        baseContractAddress,
        baseContractABI.abi,
        signer
      );

      setBaseContract(baseContract);
      const tokenId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(domainName)
      );
      setDomainTokenID(tokenId);
      const owner = await baseContract.ownerOf(tokenId);

      setCurrentOwnershipAddress({
        owner: owner,
        record: record,
        manager: manager,
      });

      setCurrentOwnershipAddressInputText(
        !currentOwnershipAddressInputText
          ? record
          : currentOwnershipAddressInputText
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnershipDetails();
  }, []);

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <div>
      <div className="transfer_popup_overlay">
        <div className="transfer_popup_container">
          <div className="transfer_popup_card">
            <div className="registration_popup_close_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                onClick={() => {
                  document.body.classList.remove("popup-open");
                  props.setEditRolesPopup(false);
                }}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
              </svg>
            </div>
            <h2>Edit Roles</h2>
            <ul className="profileNavbar editRolesNavbar">
              <li
                className={
                  activeItem === "record"
                    ? "active profileNavbarItem"
                    : "profileNavbarItem"
                }
                onClick={() => handleClick("record")}
              >
                Record
              </li>
              <li
                className={
                  activeItem === "manager"
                    ? "active profileNavbarItem"
                    : "profileNavbarItem"
                }
                onClick={() => handleClick("manager")}
              >
                Manager
              </li>
              <li
                className={
                  activeItem === "owner"
                    ? "active profileNavbarItem"
                    : "profileNavbarItem"
                }
                onClick={() => handleClick("owner")}
              >
                Owner
              </li>
            </ul>
            <div className="transferDomainInputParent">
              <div className="transferDomains_fields">
                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">
                      Current Address
                      <span className="transferDomain_field_sub_title"></span>
                    </span>
                    <span
                      className="transferDomain_field_info"
                      data-tooltip-id="transfer_domain_tooltip"
                      data-tooltip-content="Current owner of the domain name."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <g>
                            <g>
                              <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z" />
                            </g>
                            <g>
                              <path d="M9,19h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v0C8,18.55,8.45,19,9,19z" />
                            </g>
                            <g>
                              <path d="M12,2C7.86,2,4.5,5.36,4.5,9.5c0,3.82,2.66,5.86,3.77,6.5h7.46c1.11-0.64,3.77-2.68,3.77-6.5C19.5,5.36,16.14,2,12,2z" />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <Tooltip
                      id="transfer_domain_tooltip"
                      removeStyle
                      style={{
                        maxWidth: "200px",
                        wordBreak: "break-word",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>
                  <div className="transferDomains_field_input">
                    {/* {props.address} */}
                    <input
                      type="text"
                      placeholder="Enter Recipient's Address"
                      disabled
                      value={
                        currentOwnershipAddressInputText
                          ? currentOwnershipAddressInputText
                          : "fetching..."
                      }
                    />
                  </div>
                </div>

                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">
                      New Address
                      <span className="transferDomain_field_sub_title"></span>
                    </span>
                    <span
                      className="transferDomain_field_info"
                      data-tooltip-id="transfer_domain_tooltip"
                      data-tooltip-content="The one who will become the owner of this domain name after the transfer process is completed."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <g>
                            <g>
                              <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z" />
                            </g>
                            <g>
                              <path d="M9,19h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v0C8,18.55,8.45,19,9,19z" />
                            </g>
                            <g>
                              <path d="M12,2C7.86,2,4.5,5.36,4.5,9.5c0,3.82,2.66,5.86,3.77,6.5h7.46c1.11-0.64,3.77-2.68,3.77-6.5C19.5,5.36,16.14,2,12,2z" />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="transferDomains_field_input">
                    <input
                      type="text"
                      placeholder="Enter Recipient's Address"
                      value={recepientAddress ? recepientAddress : ""}
                      onChange={(e) => {
                        setRecepientAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="transferDomains_field_item transaction-err"
              style={{ position: "relative" }}
            >
              {txErrorMessage ? (
                <div className="registartion_field_input">
                  <div className="after_tx_msg_parent">
                    <div className="after_tx_msg_parent_left">
                      <div style={{ width: "80%" }}>
                        <Lottie options={defaultOptions} />
                      </div>
                    </div>
                    <div className="after_tx_msg_parent_right">
                      <p className="error-p">Error</p>
                      <div
                        className="error-msg"
                        data-tooltip-id="error-msg"
                        data-tooltip-content={
                          txErrorMessage.slice(0, 240) + "..."
                        }
                      >
                        {txErrorMessage}
                        <Tooltip
                          id="error-msg"
                          removeStyle
                          style={{
                            maxWidth: "300px",
                            wordBreak: "break-word",
                            fontFamily: "Inter, sans-serif",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {txSuccessfull ? (
              <div
                className="transferDomains_field_item transaction-success"
                style={{ position: "relative" }}
              >
                <div className="registartion_field_input">
                  <div className="after_tx_msg_parent">
                    <div className="after_tx_msg_parent_left">
                      <div style={{ width: "100%" }}>
                        <Lottie options={defaultOptions} />
                      </div>
                    </div>
                    <div className="after_tx_msg_parent_right">
                      <p className="error-p">Transaction Successful</p>
                      <div className="error-msg">
                        Your transaction has been completed successfully!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="popup-btns">
              <button
                className={
                  recepientAddress !== currentOwnershipAddressInputText &&
                  recepientAddress
                    ? "transfer-btn"
                    : "disabled transfer-btn"
                }
                onClick={() => {
                  if (txSuccessfull) {
                    document.body.classList.remove("popup-open");
                    props.setEditRolesPopup(false);
                  } else {
                    handleChangeRole();
                  }
                }}
              >
                {txButtonText}
                {loading ? (
                  <>
                    <svg
                      width="22"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin"
                    >
                      <path
                        opacity="0.5"
                        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17316C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761204C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87103 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99112 2.15372 8.43928C2.4624 6.88743 3.22433 5.46196 4.34315 4.34314C5.46197 3.22432 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21446 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6568C14.1566 17.1571 12.1217 18 10 18V18Z"
                        fill="#7E9195"
                      ></path>
                      <path
                        d="M18 10H20C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRolesForDomain;
