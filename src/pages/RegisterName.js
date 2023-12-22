import React, { useEffect, useState } from "react";
import { toBigInt } from "web3-utils";
import "../styles/Home.css";
import "../styles/RegistrationForm.css";
import SearchQuery from "../components/SearchQuery";
import AvatarGenerator from "../components/AvatarGenerator";
import { ethers } from "ethers";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useConnectModal, useChainModal } from "@rainbow-me/rainbowkit";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import "../styles/Loader.css";
import contract_abi from "../artifacts/contracts/NameRegistry.json";
import registrarController_abi from "../artifacts/contracts/RegistrarController.json";
import RegistrationPopup from "../components/RegistrationPopup";
import { useNavigate } from "react-router-dom";
import InfoPopup from "../components/InfoPopup";
import { useAccount, useFeeData } from "wagmi";
import { motion } from "framer-motion";
import Wrapper from "../components/dynamicNFT/Wrapper";
import NFTGenerator from "../components/dynamicNFT/DesignCanvas";
import testNetTreeData from "../asset/testNetTreeData.json";
import { Buffer } from "buffer";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import Web3 from "web3";
import axios from "axios";
import DomainPurchasedPopup from "../components/DomainPurchasedPopup";
import animationData from "../asset/Animation - 1703236148033.json"; // replace with the path to your animation JSON file

function RegisterName(props) {
  const web3 = new Web3();
  const { address } = useAccount();
  const navigate = useNavigate();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const [registrationForm, setRegistrationForm] = useState(false);
  const [domainName, setDomainName] = useState("");
  const [domainOwner, setDomainOwner] = useState("");
  const [domainNameAvailability, setDomainAvailability] = useState("");
  const [domainNamePrice, setDomainPrice] = useState("");
  const [domainNameExpiryDate, setDomainExpiryDate] = useState("-");
  const [domainNameExpiryTime, setDomainExpiryTime] = useState("-");
  const [domainNameRegisteredDate, setDomainRegisteredDate] = useState("-");
  const [domainNameRegisteredTime, setDomainRegisteredTime] = useState("-");
  const [domainNameRegisteredPrice, setDomainRegisteredPrice] = useState("-");
  const [showAfterDomainPurchasedPopup, setAfterDomainPurchasedPopup] =
    useState({ show: false, freeDomain: false });
  const [isPremium, setIsPremium] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [isRegular, setIsRegular] = useState(false);

  const [disabledomainNameType, setDisableDomainNameType] = useState({
    vip: false,
    premium: false,
    normal: false,
  });
  const [registrationPeriod, setRegistrationPeriod] = useState(1);
  const [highGasPopup, setHighGasPopup] = useState(false);
  const [registerdomainPriceInWei, setRegisterdomainPriceInWei] = useState("");
  const [extrData, setExtrData] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const [transactionState, setTransactionState] = useState({
    waiting: false,
    msg: "",
  });

  const [loading, setLoading] = useState({
    status: false,
    cost: false,
    expiry: false,
    lastSale: false,
  });
  const openPopup = () => {
    setRegistrationForm(true);
    document.body.classList.add("popup-open");
  };

  const closePopup = () => {
    // props.setShowConfetti(false);
    setTransactionState({
      waiting: false,
      msg: "",
    });
    setErrorMessage("");
    setRegistrationForm(false);
    document.body.classList.remove("popup-open");
    // window.location.reload();
  };

  const redirectToUserProfile = () => {
    navigate(`domain/${domainName}`, {
      state: {
        domainName: domainName,
        domainOwner: domainOwner,
        domainNameRegisteredPrice: domainNameRegisteredPrice,
        domainNameExpiryDate: domainNameExpiryDate,
        domainNameRegisteredDate: domainNameRegisteredDate,
        domainNameExpiryTime: domainNameExpiryTime,
        domainNameRegisteredTime: domainNameRegisteredTime,
      },
    });
  };

  useEffect(() => {
    const popupContainer = document.querySelector(".registration_popup");

    if (registrationForm) {
      popupContainer.classList.add("animate");
    } else {
      popupContainer.classList.remove("animate");
    }
  }, [registrationForm]);

  // useEffect(() => {
  //   setRegistrationCost(registrationPeriod * 0.005);
  // }, [registrationPeriod]);

  const uploadMetadata = async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "4455109c-4819-40f5-9ec5-5882af32a7ed",
      },
      body: JSON.stringify({
        name: domainName + ".mode",
        description: "NFT from ModeDomains",
        file_url:
          "https://ipfs.io/ipfs/bafkreigidagcwbeqvlgnxwk27kmsh4vpfiyrimkesivgifrl5saqrmxvjq",
      }),
    };
    try {
      const response = await fetch(
        "https://api.nftport.xyz/v0/metadata",
        options
      );
      if (response.ok) {
        const responseJson = await response.json();
        console.log("got response");

        console.log(responseJson.metadata_uri);
        return responseJson.metadata_uri;
      } else {
        console.error("Error uploading metadata:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading metadata:", error);
    }
  };
  const getExtraData = async (address) => {
    try {
      const priceHookTreeData = testNetTreeData;
      const leafNodes = priceHookTreeData.leaves.map((leaf) =>
        Buffer.from(leaf, "hex")
      );

      // Reconstruct the Merkle tree
      const priceHookMerkleTree = new MerkleTree(leafNodes, keccak256, {
        sortLeaves: true,
        sortPairs: true,
      });

      // Get the Merkle proof for the specified address
      const priceHookArray = priceHookMerkleTree.getHexProof(
        keccak256(address)
      );

      // Encode parameters for extraData
      const PriceHookExtraData = web3.eth.abi.encodeParameters(
        ["bytes32[] merkleProof"],
        [priceHookArray]
      );

      // Construct the complete extraData
      const hookExtraData = {
        QualificationHookExtraData: "0x",
        PriceHookExtraData: PriceHookExtraData,
        PointHookExtraData: "0x",
        RewardHookExtraData: "0x",
      };

      const extraData = web3.eth.abi.encodeParameters(
        [
          "(bytes QualificationHookExtraData, bytes PriceHookExtraData, bytes PointHookExtraData, bytes RewardHookExtraData)",
        ],
        [Object.values(hookExtraData)]
      );

      setExtrData(extraData);
      console.log(extraData);
      return extraData;
    } catch (error) {
      console.error("Error fetching extraData:", error);
      throw error;
    }
  };

  const checkEligibility = async () => {
    try {
      // Create a new contract instance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS_TESTNET_HOLDERS_DISCOUNT_HOOK,
        [
          "function isEligibleToClaimFreeDomain(address, bytes) view returns (bool)",
        ],
        provider
      );
      console.log(contract);
      // Call the isEligibleToClaimFreeDomain function
      const result = await contract.isEligibleToClaimFreeDomain(
        address,
        extrData
      );

      // Update state based on the result
      setAfterDomainPurchasedPopup({ show: false, freeDomain: result });
      console.log(result);
      if (result) {
        props.setuserEligibleForFreeDomain(true);
      }
    } catch (error) {
      console.error("Error checking eligibility:", error.message);
    }
  };
  useEffect(() => {
    if (address) {
      const etdata = async () => {
        await getExtraData(address);
      };
      etdata();
    }
  }, [address]);

  useEffect(() => {
    if (address && extrData) checkEligibility();
  }, [extrData]);

  const registerName = async (metadatau) => {
    setErrorMessage("");
    setTransactionState({ waiting: true, msg: "Waiting for Transaction" });
    try {
      const { ethereum } = window; // Ensure that the user is connected to the expected chain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== 919 && chainId !== 34443) {
        // throw new Error("Please connect to the correct chain.");
        openChainModal();
        setErrorMessage("");
        setTransactionState({ waiting: false, msg: "" });
        return;
      }
      const signer = provider.getSigner();

      const contractAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID
          : chainId === 34443
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID
          : null;

      const resolverAddress =
        chainId === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER
          : chainId === 34443
          ? process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER
          : null;

      const identifier =
        chainId === 919
          ? toBigInt(process.env.REACT_APP_IDENTIFIER)
          : chainId === 34443
          ? toBigInt(process.env.REACT_APP_IDENTIFIER)
          : null;

      const contract = new ethers.Contract(
        contractAddress,
        // contract_abi.abi,
        registrarController_abi.abi,
        signer
      );

      const name = domainName;

      const registrationDuration = 31556952 * registrationPeriod; // 1 year in seconds

      const estimatedPriceArray = await contract.rentPrice(
        identifier,
        name, // Replace with a label for your domain
        registrationDuration
      );
      console.log(estimatedPriceArray);
      // Access individual BigNumber objects in the array
      const base = parseInt(estimatedPriceArray[0]);
      const premium = parseInt(estimatedPriceArray[1]);
      let finalPrice = base + premium;
      finalPrice = finalPrice * 1.1;
      console.log(finalPrice);
      // console.log("Base Price (Wei):", base.toString());
      // console.log("Premium Price (Wei):", premium.toString());
      console.log(
        identifier,
        [name],
        address,
        registrationDuration,
        resolverAddress,
        finalPrice
      );

      const tx = await contract.bulkRegister(
        identifier,
        [name],
        address,
        registrationDuration,
        resolverAddress,
        true,
        [extrData],
        {
          value: parseInt(finalPrice).toString(),
          // gasLimit: 2000000, // Manually set a sufficient gas limit
        }
      );
      setTransactionState({ waiting: true, msg: "Transacting..." });
      await tx.wait();
      // await tx2.wait();
      setAfterDomainPurchasedPopup({
        ...showAfterDomainPurchasedPopup,
        show: true,
      });
      setErrorMessage("");
      console.log("Name registered successfully!");
      props.setNameRegistered(true);
      setTransactionState({
        waiting: true,
        msg: "Name registered successfully!",
      });

      props.setShowConfetti(true);
      closePopup();
      // setTimeout(() => {

      //   navigate("/profile", { state: { reload: true } });
      // }, 2000);
    } catch (error) {
      // console.log(error);
      // console.log(Object.keys(error));
      // console.log(error.code);
      // console.log(error.reason);

      setTransactionState({ waiting: false, msg: "" });
      // const parsedEthersError = getParsedEthersError(error);
      // // const err = parsedEthersError.context?.split("(")[0];
      console.log(error.reason ? error.reason : error);
      if (error.message.includes("Address is already registered with a name"))
        setErrorMessage(
          "You already have claimed one handle, get more on Mainnet."
        );
      else if (error.data?.message.includes("insufficient funds for gas"))
        setErrorMessage(
          "Insufficient funds for gas. Get some from Mode Faucet."
        );
      else if (error.message.includes("Insufficient funds sent"))
        setErrorMessage("Insufficient funds to cover the transaction.");
      else {
        setErrorMessage("An error occurred while processing your transaction");
      }
      props.setNameRegistered(false);
      // setErrorMessage(error.message);
    }
  };
  const handleDomainNameTypeChange = (event) => {
    let type = event.target.value;
    if (type === "vip") {
      setIsVip(true);
      setIsPremium(false);
      setIsRegular(false);
    } else if (type === "premium") {
      setIsVip(false);
      setIsPremium(true);
      setIsRegular(false);
    } else {
      console.log("changed to normal");
      setIsPremium(false);
      setIsRegular(true);
      setIsVip(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div className="home-main">
        <div className="home-top">
          {/* <h1>
            Streamline Blockchain with ModeDomains <br />
            Grab your '
            <span className="glitch">
              <span aria-hidden="true">.mode</span>
              .mode
              <span aria-hidden="true">.mode</span>
            </span>
            ' domain now!
          </h1>
          <p>
            Experience seamless, user-centric blockchain engagement on the MODE
            network with ModeDomains.
            <br />
            Claim your unique '.mode' domain on testnet today.
          </p> */}
          <h1 className="new-h1">
            Secure your <span>.mode domain</span>, setup your Dashboard and
            start growing today
          </h1>
          <p>
            The mainnet of Mode is now live, offering a platform where user
            growth and development are intertwined with the project's success.
            It features a unique reward system that benefits users, builders,
            and protocol participants through lifetime rewards, referral fees,
            and sequencer fee sharing.
          </p>
          <div className="search-bar">
            <SearchQuery
              setDomainName={setDomainName}
              setDomainAvailability={setDomainAvailability}
              setDomainPrice={setDomainPrice}
              setDomainExpiryDate={setDomainExpiryDate}
              setDomainRegisteredPrice={setDomainRegisteredPrice}
              setRegisterdomainPriceInWei={setRegisterdomainPriceInWei}
              setDomainRegisteredDate={setDomainRegisteredDate}
              setDomainExpiryTime={setDomainExpiryTime}
              setDomainRegisteredTime={setDomainRegisteredTime}
              setDomainOwner={setDomainOwner}
              setLoading={setLoading}
              loading={loading}
              setIsPremium={setIsPremium}
              setIsVip={setIsVip}
              setIsRegular={setIsRegular}
              setDisableDomainNameType={setDisableDomainNameType}
              registrationPeriod={registrationPeriod}
            />
          </div>
        </div>

        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="home-bottom">
            <div className="search-results">
              <div
                className="result-item hover-element"
                // onClick={() => {
                //   if (domainNameAvailability === "Registered") {
                //     redirectToUserProfile();
                //   } else if (domainNameAvailability === "Available") {
                //     openPopup();
                //   }
                // }}
              >
                <div className="result-item-left">
                  {/* <Wrapper
                    input={domainName}
                    isPremium={isPremium}
                    setIsPremium={setIsPremium}
                    isVip={isVip}
                    setIsVip={setIsVip}
                    isRegular={isRegular}
                    setIsRegular={setIsRegular}
                  /> */}
                </div>

                <div className="result-item-right">
                  <div className="domain-card">
                    {/* <AvatarGenerator
                        name={domainName}
                        width={"50px"}
                        height={"50px"}
                      /> */}
                    <p className="domain-card-name">
                      {domainName.length > 0 ? domainName + ".mode" : ".mode"}{" "}
                      {/* <span className="domainType">
                        {domainName.length > 2 && isVip
                          ? "( VIP )"
                          : isPremium
                          ? "( Premium )"
                          : ""}
                      </span> */}
                    </p>
                  </div>
                  {/* <p className="domain-card-sub-item">
                    <label
                      className={disabledomainNameType.vip ? "disabled" : ""}
                    >
                      <input
                        type="radio"
                        name="domainNameTypeInput"
                        value="vip"
                        className="custom-radio-name-type"
                        checked={domainName.length > 2 && isVip}
                        onChange={handleDomainNameTypeChange}
                        disabled={disabledomainNameType.vip}
                      />
                      Vip
                    </label>
                    <label
                      className={
                        disabledomainNameType.premium ? "disabled" : ""
                      }
                    >
                      <input
                        type="radio"
                        name="domainNameTypeInput"
                        value="premium"
                        className="custom-radio-name-type"
                        checked={domainName.length > 2 && isPremium}
                        onChange={handleDomainNameTypeChange}
                        disabled={disabledomainNameType.premium}
                      />
                      Premium
                    </label>
                    <label
                      className={disabledomainNameType.normal ? "disabled" : ""}
                    >
                      <input
                        type="radio"
                        name="domainNameTypeInput"
                        value="normal"
                        className="custom-radio-name-type"
                        checked={
                          domainName.length > 2 &&
                          !isVip &&
                          !isPremium &&
                          isRegular
                        }
                        onChange={handleDomainNameTypeChange}
                        disabled={disabledomainNameType.normal}
                      />
                      Normal
                    </label>
                  </p> */}
                  <p className="domain-card-sub-item">
                    Status:
                    <span className="domain-card-sub-item-value">
                      {!loading.status ? (
                        <span
                          className={
                            domainNameAvailability === "registered"
                              ? "domain-name-checking domain-name registered-domain"
                              : domainNameAvailability === "available"
                              ? "domain-name-checking domain-name available-domain"
                              : domainNameAvailability === "too short"
                              ? "domain-name-checking domain-name not-valid-domain"
                              : "domain-name-checking"
                          }
                        >
                          <span className="domain-name-square"></span>
                          {domainNameAvailability}
                        </span>
                      ) : (
                        <Skeleton />
                      )}
                    </span>
                  </p>
                  <p className="domain-card-sub-item">
                    Cost:
                    <span className="domain-card-sub-item-value">
                      {!loading.cost ? (
                        <span className="domain-name-checking">
                          {domainNamePrice && domainNamePrice !== "N/A"
                            ? parseFloat(domainNamePrice.toFixed(7)) + " ETH"
                            : "N/A"}
                        </span>
                      ) : (
                        <Skeleton />
                      )}
                    </span>
                  </p>
                  <p className="domain-card-sub-item">
                    Expiry Date:
                    <span className="domain-card-sub-item-value">
                      {!loading.expiry ? (
                        <span className="domain-name-checking">
                          {domainNameExpiryDate}
                        </span>
                      ) : (
                        <Skeleton />
                      )}
                    </span>
                  </p>
                  <p className="domain-card-sub-item">
                    Last Sale:
                    <span className="domain-card-sub-item-value">
                      {!loading.lastSale ? (
                        <span className="domain-name-checking">
                          {domainNameRegisteredPrice &&
                          domainNameRegisteredPrice !== "N/A"
                            ? domainNameRegisteredPrice + " ETH"
                            : "N/A"}
                        </span>
                      ) : (
                        <Skeleton />
                      )}
                    </span>
                  </p>
                  <p className="domain-card-sub-item">
                    Genesis:
                    <span className="domain-card-sub-item-value">
                      {!loading.lastSale ? (
                        <span className="domain-name-checking">-</span>
                      ) : (
                        <Skeleton />
                      )}
                    </span>
                  </p>
                  <div className="get-domain-btn-parent">
                    {!loading.status ? (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={
                          domainNameAvailability === "available"
                            ? "get-domain"
                            : "get-domain disabled"
                        }
                        onClick={() => {
                          openPopup();
                        }}
                      >
                        Get domain
                      </motion.button>
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      </div>
      <RegistrationPopup
        closePopup={closePopup}
        domainName={domainName}
        registrationPeriod={registrationPeriod}
        setRegistrationPeriod={setRegistrationPeriod}
        domainNamePrice={domainNamePrice}
        registerName={registerName}
        openConnectModal={openConnectModal}
        errorMessage={errorMessage}
        transactionState={transactionState}
        setHighGasPopup={setHighGasPopup}
        nameRegistered={props.nameRegistered}
        defaultOptions={defaultOptions}
      />
      {showAfterDomainPurchasedPopup.show ? (
        <DomainPurchasedPopup
          setAfterDomainPurchasedPopup={setAfterDomainPurchasedPopup}
          showAfterDomainPurchasedPopup={showAfterDomainPurchasedPopup}
          setShowConfetti={props.setShowConfetti}
          domainName={domainName}
        />
      ) : null}
      {highGasPopup ? (
        <InfoPopup
          setHighGasPopup={setHighGasPopup}
          registerName={registerName}
        />
      ) : null}
    </div>
  );
}

export default RegisterName;
