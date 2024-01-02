import React, { useState } from "react";
import "./TransferDomainPopup.css";
import { Tooltip } from "react-tooltip";
import { toBigInt } from "web3-utils";
import { useChainModal } from "@rainbow-me/rainbowkit";
import baseContractABI from "../../artifacts/contracts/Base.json";
import resolverContractABI from "../../artifacts/contracts/Resolver.json";
import reverseRegistrarABI from "../../artifacts/contracts/ReverseRegistrar.json";

import publicResolverContractABI from "../../artifacts/contracts/PublicResolver.json";
import registryResolverContractABI from "../../artifacts/contracts/SidRegistry.json";
import { ethers } from "ethers";
import { getSubnode } from "./ProfileDetails";
import { useEffect } from "react";
import animationDataSuccess from "../../asset/Animation - 1703234774069.json";
import animationDataError from "../../asset/Animation - 1703236148033.json";
import Lottie from "react-lottie";

function TransferDomainPopup(props) {
  const { openChainModal } = useChainModal();
  const [loading, setLoading] = useState(false);
  const [txButtonText, setTxButtonText] = useState("Transfer");
  const [txErrorMessage, setTxErrorMessage] = useState(false);
  const [txSuccessfull, setTxSuccessfull] = useState(false);
  const [recepientAddress, setRecepientAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState();
  const [managerAddress, setManagerAddress] = useState();
  const [ethRecordAddress, setEthRecordAddress] = useState();

  const [transfertxStatus, setTransfertxStatus] = useState({
    owner: "pending",
    manager: "pending",
    ethrecord: "pending",
  });

  const transferDomain = async () => {
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
      setTransfertxStatus({
        ethrecord: "started",
        owner: "pending",
        manager: "pending",
      });
      if (recepientAddress !== ethRecordAddress) {
        console.log("inside ethrecord");
        const tx = await resolverContract.setAddr(subNode, recepientAddress);

        setTxButtonText("Transferring...");
        const data = await tx.wait();
        if (data) {
          setTransfertxStatus({
            owner: "pending",
            ethrecord: "completed",
            manager: "pending",
          });
        }
      }
      setTransfertxStatus({
        owner: "pending",
        ethrecord: "completed",
        manager: "started",
      });
      // contract call for changing the manager
      if (recepientAddress !== managerAddress) {
        console.log("inside manager");
        const tx = await baseContract.reclaim(
          toBigInt(tokenId),
          recepientAddress
        );

        setTxButtonText("Transferring...");
        const data = await tx.wait();
        if (data) {
          setTransfertxStatus({
            owner: "pending",
            ethrecord: "completed",
            manager: "completed",
          });
        }
      }
      // contract call for changing the owner
      setTransfertxStatus({
        owner: "started",
        ethrecord: "completed",
        manager: "completed",
      });
      if (recepientAddress !== ownerAddress) {
        console.log("inside owner");
        const tx = await baseContract.safeTransferFrom(
          props.address,
          recepientAddress,
          tokenId
        );

        setTxButtonText("Transferring...");
        const data = await tx.wait();
        if (data) {
          setTransfertxStatus({
            owner: "completed",
            ethrecord: "completed",
            manager: "completed",
          });
        }
      }
      // const tx = await contract.safeTransferFrom(
      //   props.address,
      //   recepientAddress,
      //   tokenId
      // );

      const baseNode =
        "0x9217c94fd014da21f5c43a1fcae4154a2bbfce43eb48bb33f7f6473c68ee16b6"; // Replace with your actual baseNode
      // Replace with your actual label

      // Convert baseNode to bytes32 format
      const baseNodeBytes32 = ethers.utils.hexZeroPad(baseNode, 32);

      // Concatenate baseNode and label, then take the keccak256 hash
      const nodehash = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["bytes32", "string"],
          [baseNodeBytes32, domainName]
        )
      );
      console.log(nodehash);
      // const addInBinary = formatsByName["ETH"].decoder(recepientAddress);
      // console.log(addInBinary);

      setTxErrorMessage();
      setLoading(false);
      setTxSuccessfull(true);
      setTxButtonText("OK");
    } catch (error) {
      setTxSuccessfull(false);
      setTxButtonText("Transfer");
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
      // const contract = new ethers.Contract(
      //   process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE,
      //   baseContractABI.abi,
      //   signer
      // );

      //to find a eth record address of the domain name
      const resolverContract = new ethers.Contract(
        resolverContractAddress,
        publicResolverContractABI.abi,
        signer
      );
      const node = getSubnode(domainName);
      const record = await resolverContract.addr(node);
      console.log("record  - ", record);
      setEthRecordAddress(record ? record : "");

      // to find resolver and manager address of the domain name
      const registryResolverContract = new ethers.Contract(
        registryContractAddress,
        registryResolverContractABI.abi,
        signer
      );
      const resolver = await registryResolverContract.resolver(node);
      console.log("resolver - ", resolver);
      const manager = await registryResolverContract.owner(node);
      console.log("manager - ", manager);

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
      setOwnerAddress(owner ? owner : "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOwnershipDetails();
  }, [recepientAddress]);

  const renderUpdateSection = (label, condition, status) => {
    return condition ? (
      <div className="txStatusParent">
        {status === "pending" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 502 511.82"
            fill="#e4e4e4"
            data-tooltip-id="tx_status"
            data-tooltip-content="The Tx is pending."
          >
            <path
              fill-rule="nonzero"
              d="M279.75 471.21c14.34-1.9 25.67 12.12 20.81 25.75-2.54 6.91-8.44 11.76-15.76 12.73a260.727 260.727 0 0 1-50.81 1.54c-62.52-4.21-118.77-31.3-160.44-72.97C28.11 392.82 0 330.04 0 260.71 0 191.37 28.11 128.6 73.55 83.16S181.76 9.61 251.1 9.61c24.04 0 47.47 3.46 69.8 9.91a249.124 249.124 0 0 1 52.61 21.97l-4.95-12.96c-4.13-10.86 1.32-23.01 12.17-27.15 10.86-4.13 23.01 1.32 27.15 12.18L428.8 68.3a21.39 21.39 0 0 1 1.36 6.5c1.64 10.2-4.47 20.31-14.63 23.39l-56.03 17.14c-11.09 3.36-22.8-2.9-26.16-13.98-3.36-11.08 2.9-22.8 13.98-26.16l4.61-1.41a210.71 210.71 0 0 0-41.8-17.12c-18.57-5.36-38.37-8.24-59.03-8.24-58.62 0-111.7 23.76-150.11 62.18-38.42 38.41-62.18 91.48-62.18 150.11 0 58.62 23.76 111.69 62.18 150.11 34.81 34.81 81.66 57.59 133.77 61.55 14.9 1.13 30.23.76 44.99-1.16zm-67.09-312.63c0-10.71 8.69-19.4 19.41-19.4 10.71 0 19.4 8.69 19.4 19.4V276.7l80.85 35.54c9.8 4.31 14.24 15.75 9.93 25.55-4.31 9.79-15.75 14.24-25.55 9.93l-91.46-40.2c-7.35-2.77-12.58-9.86-12.58-18.17V158.58zm134.7 291.89c-15.62 7.99-13.54 30.9 3.29 35.93 4.87 1.38 9.72.96 14.26-1.31 12.52-6.29 24.54-13.7 35.81-22.02 5.5-4.1 8.36-10.56 7.77-17.39-1.5-15.09-18.68-22.74-30.89-13.78a208.144 208.144 0 0 1-30.24 18.57zm79.16-69.55c-8.84 13.18 1.09 30.9 16.97 30.2 6.21-.33 11.77-3.37 15.25-8.57 7.86-11.66 14.65-23.87 20.47-36.67 5.61-12.64-3.13-26.8-16.96-27.39-7.93-.26-15.11 4.17-18.41 11.4-4.93 10.85-10.66 21.15-17.32 31.03zm35.66-99.52c-.7 7.62 3 14.76 9.59 18.63 12.36 7.02 27.6-.84 29.05-14.97 1.33-14.02 1.54-27.9.58-41.95-.48-6.75-4.38-12.7-10.38-15.85-13.46-6.98-29.41 3.46-28.34 18.57.82 11.92.63 23.67-.5 35.57zM446.1 177.02c4.35 10.03 16.02 14.54 25.95 9.96 9.57-4.4 13.86-15.61 9.71-25.29-5.5-12.89-12.12-25.28-19.69-37.08-9.51-14.62-31.89-10.36-35.35 6.75-.95 5.03-.05 9.94 2.72 14.27 6.42 10.02 12 20.44 16.66 31.39z"
            />
          </svg>
        )}
        {status === "started" && (
          <svg
            width="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
            data-tooltip-id="tx_status"
            data-tooltip-content="The Tx is started..."
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
        )}
        {status === "completed" && (
          <svg
            height="32"
            viewBox="0 0 32 32"
            width="32"
            data-tooltip-id="tx_status"
            data-tooltip-content="The Tx is completed."
          >
            <g>
              <g id="Complete_x5F_Symbol_1_">
                <g id="Complete_x5F_Symbol">
                  <circle
                    cx="16"
                    cy="16"
                    id="BG"
                    r="16"
                    style={{ fill: "#19D873" }}
                  />
                  <polygon
                    id="Done_x5F_Symbol"
                    points="14,17.9 14,17.9 14,17.9 10.1,14 8,16.1 14,22.1 24,12.1 21.9,10 "
                    style={{ fill: "#ffffff" }}
                  />
                </g>
              </g>
            </g>
          </svg>
        )}
        <span>{label}</span>
        <Tooltip
          id="tx_status"
          removeStyle
          style={{
            textAlign: "center",
            maxWidth: "200px",
            wordBreak: "break-word",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>
    ) : null;
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: txSuccessfull ? animationDataSuccess : animationDataError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
                  props.setTransferDomainPopup(false);
                }}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
              </svg>
            </div>
            <h2>Transfer Domain</h2>
            <div className="transferDomainInputParent">
              <div className="transferDomains_fields">
                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">
                      Domain Name
                      <span className="transferDomain_field_sub_title"></span>
                    </span>
                    <span
                      className="transferDomain_field_info"
                      data-tooltip-id="transfer_domain_tooltip"
                      data-tooltip-content="The specific domain name that will be transferred to the recipient."
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
                    <span className="transferDomains_field_input_value">
                      {props.domainName ? props.domainName : ""}
                    </span>
                  </div>
                </div>
                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">
                      Current Owner Address
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
                  </div>
                  <div className="transferDomains_field_input">
                    {/* {props.address} */}
                    <input
                      type="text"
                      placeholder="Enter Recipient's Address"
                      disabled
                      value={props.address}
                    />
                  </div>
                </div>
                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">
                      Recipient Address
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
                      onChange={(e) => {
                        setRecepientAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">
                      Summary of Transactions
                      <span className="transferDomain_field_sub_title"></span>
                    </span>
                    <span
                      className="transferDomain_field_info"
                      data-tooltip-id="recipient_address"
                      data-tooltip-content="This section provides an overview of the transaction status related to the domain transfer."
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
                      id="recipient_address"
                      removeStyle
                      style={{
                        maxWidth: "200px",
                        wordBreak: "break-word",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>
                  <div className="transferDomains_field_input">
                    {recepientAddress ? (
                      <>
                        {renderUpdateSection(
                          "Update Eth Record",
                          recepientAddress !== ethRecordAddress,
                          transfertxStatus.ethrecord
                        )}
                        {renderUpdateSection(
                          "Update Manager",
                          recepientAddress !== managerAddress,
                          transfertxStatus.manager
                        )}
                        {renderUpdateSection(
                          "Update Owner",
                          recepientAddress !== ownerAddress,
                          transfertxStatus.owner
                        )}
                      </>
                    ) : (
                      "-"
                    )}
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
                className="transfer-btn"
                onClick={() => {
                  if (txSuccessfull) {
                    document.body.classList.remove("popup-open");
                    props.setTransferDomainPopup(false);
                  }
                  transferDomain();
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

export default TransferDomainPopup;
