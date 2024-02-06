import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "./ExtendExpiryDate.css";
import { ethers } from "ethers";
import registrarController_abi from "../../artifacts/contracts/RegistrarController.json";
import { toBigInt } from "web3-utils";
import axios from "axios";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import animationDataSuccess from "../../asset/Animation - 1703234774069.json";
import animationDataError from "../../asset/Animation - 1703236148033.json";
import { useAccount, useNetwork } from "wagmi";
import Lottie from "react-lottie";

function ExtendExpiryDate(props) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const [extendPeriodInYear, setExtendPeriodInYear] = useState(1);
  const [extendCostInEth, setExtendCostInEth] = useState(0);
  const [domainExtentCostInUSD, setDomainExtentCostInUSD] = useState();
  const [ethPrice, setEthPrice] = useState(0);
  const [newExpiryDate, setnewExpiryDate] = useState(null);
  const [currentExpiryDate, setCurrentExpiryDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txButtonText, setTxButtonText] = useState("Extend");
  const [fetchingValue, setfetchingValue] = useState(false);
  const [txErrorMessage, setTxErrorMessage] = useState(false);
  const [txSuccessfull, setTxSuccessfull] = useState(false);

  const handlePeriodDecrease = () => {
    if (extendPeriodInYear !== 1) setExtendPeriodInYear((prev) => prev - 1);
  };

  const handlePeriodIncrease = () => {
    setExtendPeriodInYear((prev) => prev + 1);
  };

  const domainPriceCheck = async (name) => {
    try {
      setfetchingValue("fetching...");
      const rpcUrl =
        chain.id === 919
          ? "https://sepolia.mode.network/"
          : chain.id === 34443
          ? "https://mainnet.mode.network"
          : null;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const contractAddress =
        chain.id === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID
          : chain.id === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID
          : null;

      const identifier =
        chain.id === 919
          ? toBigInt(process.env.REACT_APP_IDENTIFIER)
          : chain.id === 34443
          ? toBigInt(process.env.REACT_APP_MAINNET_IDENTIFIER)
          : null;

      const con = new ethers.Contract(
        contractAddress,
        registrarController_abi.abi,
        provider
      );
      const registrationDuration = 31556952 * extendPeriodInYear;
      // const price = await con.getRegistrationPrice(name);
      const estimatedPriceArray = await con.rentPrice(
        identifier,
        name, // Replace with a label for your domain
        registrationDuration
      );
      //   console.log(estimatedPriceArray);
      // Access individual BigNumber objects in the array
      const base = parseInt(estimatedPriceArray[0]);
      const premium = parseInt(estimatedPriceArray[1]);
      const price = base + parseInt(premium);
      //   console.log(price);
      //   console.log(price / 10 ** 18);

      // console.log(ethers.utils.formatEther(price));
      let x = price / 10 ** 18;
      let priceshort = parseFloat(x.toFixed(5));
      //   console.log(priceshort);
      setExtendCostInEth(priceshort);
      setfetchingValue(false);
      // props.setRegisterdomainPriceInWei(price);
      // const eth = ;
      // props.setFilteredUsers(details);
    } catch (error) {
      console.log("Error:", error);

      // Handle other errors
    }
  };

  useEffect(() => {
    const checking = async () => {
      await domainPriceCheck(props.domainName);
    };
    if (props.domainName) {
      const currentexpDate = new Date(props.expiryDateInEpoch * 1000);

      // console.log(expDate);
      const formattedCurrentExpDate = currentexpDate.toLocaleDateString(
        "en-US",
        {
          // weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );
      const formattedCurrentExpTime = currentexpDate.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        }
      );
      setCurrentExpiryDate(
        `${formattedCurrentExpDate} ${formattedCurrentExpTime}`
      );
      let newExpdate =
        props.expiryDateInEpoch + 31556952 * parseInt(extendPeriodInYear);
      //   console.log(newExpdate);
      const expDate = new Date(newExpdate * 1000);
      let newExpDateUTCString = expDate.toUTCString();
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
        timeZoneName: "short",
      });
      setnewExpiryDate(`${formattedExpDate} ${formattedExpTime}`);
      checking();
    }
  }, [extendPeriodInYear]);

  // useEffect to fetch data from the CoinGecko API
  useEffect(() => {
    // Function to fetch ETH price
    const fetchEthPrice = async () => {
      try {
        // Make a GET request to the CoinGecko API
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "ethereum",
              vs_currencies: "usd",
            },
          }
        );

        // Extract the ETH price from the response
        const price = response.data.ethereum.usd;
        // console.log(price);

        // Set the ETH price in the component state
        setEthPrice(price);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    // Call the fetchEthPrice function
    fetchEthPrice();
    // Fetch data every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchEthPrice, 200000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const calculateValueInUSD = (ethAmount) => {
      if (ethAmount !== "fetching...")
        return (parseFloat(ethAmount) * ethPrice).toFixed(4);
      else return 0;
    };
    setDomainExtentCostInUSD(calculateValueInUSD(extendCostInEth));
  }, [extendCostInEth]);

  const extendDomain = async () => {
    setTxErrorMessage();
    setLoading(true);
    setTxButtonText("Waiting for the transaction ");
    try {
      const { ethereum } = window; // Ensure that the user is connected to the expected chain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== 919) {
        // throw new Error("Please connect to the correct chain.");
        openChainModal();

        return;
      }
      const signer = provider.getSigner();

      const contractAddress =
        chain.id === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID
          : chain.id === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID
          : null;

      const contract = new ethers.Contract(
        contractAddress,
        // contract_abi.abi,
        registrarController_abi.abi,
        signer
      );

      const name = props.domainName;
      const registrationDuration = 31556952 * extendPeriodInYear; // 1 year in seconds

      const identifier =
        chain.id === 919
          ? toBigInt(process.env.REACT_APP_IDENTIFIER)
          : chain.id === 34443
          ? toBigInt(process.env.REACT_APP_MAINNET_IDENTIFIER)
          : null;

      const estimatedPriceArray = await contract.rentPrice(
        identifier,
        name, // Replace with a label for your domain
        registrationDuration
      );
      // Access individual BigNumber objects in the array
      const base = parseInt(estimatedPriceArray[0]);
      const premium = parseInt(estimatedPriceArray[1]);
      let finalPrice = base + premium;
      finalPrice = finalPrice * 1.1;
      // console.log(identifier, [name], registrationDuration, finalPrice);
      const tx = await contract.bulkRenew(
        identifier,
        [name],
        registrationDuration,
        ["0x"],
        {
          value: parseInt(finalPrice).toString(),
          // gasLimit: 2000000, // Manually set a sufficient gas limit
        }
      );
      setTxButtonText("Transacting");
      await tx.wait();
      setTxErrorMessage();
      setLoading(false);
      setTxSuccessfull(true);
      setTxButtonText("OK");
    } catch (error) {
      setTxSuccessfull(false);
      setTxButtonText("Extend");
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: txSuccessfull ? animationDataSuccess : animationDataError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="extend_popup_overlay">
      <div className="extend_popup_container">
        <div className="extend_popup_card">
          <div className="registration_popup_close_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
              onClick={() => {
                document.body.classList.remove("popup-open");
                props.setExtendPopup(false);
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </div>
          <h2>Extend</h2>
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
                    data-tooltip-id="extend_tooltip"
                    data-tooltip-content="The domain name whose expiry date will be extended."
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
                    id="extend_tooltip"
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
                    {props.domainName ? props.domainName + ".mode" : ""}
                  </span>
                </div>
              </div>
              <div className="transferDomains_field_item">
                <div className="transferDomains_field_title">
                  <span className="field_title">
                    Current Expiry Date
                    <span className="transferDomain_field_sub_title"></span>
                  </span>
                  <span
                    className="transferDomain_field_info"
                    data-tooltip-id="extend_tooltip"
                    data-tooltip-content="The current expiry date of the domain."
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
                  {currentExpiryDate}
                </div>
              </div>
              <div className="transferDomains_field_item">
                <div className="transferDomains_field_title">
                  <span className="field_title">
                    Extend Registration Period
                  </span>
                  <span
                    className="field_info"
                    data-tooltip-id="extend_tooltip"
                    data-tooltip-content="Choose the number of years you want to extend your registration. This determines the duration of your continued ownership over the domain."
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
                <div className="transferDomains_field_input registration_period">
                  <span className="registration_period_time">
                    <span>{extendPeriodInYear}</span> Year
                  </span>
                  <div className="registration_period_modification">
                    <span
                      className={
                        extendPeriodInYear === 1
                          ? "period_decrease opacity_low"
                          : "period_decrease"
                      }
                      // className="period_decrease opacity_low"
                      onClick={handlePeriodDecrease}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
                      </svg>
                    </span>
                    <span
                      className="period_increase"
                      onClick={handlePeriodIncrease}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
                      </svg>
                    </span>
                    {/* <Tooltip
                      id="increase-decrease-period"
                      removeStyle
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        lineHeight: "normal",
                        maxWidth: "200px",
                        wordBreak: "break-word",
                        fontFamily: "Inter, sans-serif",
                      }}
                    /> */}
                  </div>
                </div>
              </div>
              <div className="transferDomains_field_item">
                <div className="transferDomains_field_title">
                  <span className="field_title">
                    New Expiry Date
                    <span className="transferDomain_field_sub_title"></span>
                  </span>
                  <span
                    className="transferDomain_field_info"
                    data-tooltip-id="extend_tooltip"
                    data-tooltip-content="The updated expiry date for the domain registration. This reflects the new expiration date after extending the registration period."
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
                  {newExpiryDate}
                </div>
              </div>
              <div className="transferDomains_field_item">
                <div className="transferDomains_field_title">
                  <span className="field_title">Extend Cost</span>
                  <span
                    className="transferDomain_field_info"
                    data-tooltip-id="extend_tooltip"
                    data-tooltip-content="The cost associated with extending the registration period for your domain."
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
                  <span className="transferDomains_field_input_value">
                    {fetchingValue ? fetchingValue : extendCostInEth + " ETH"}
                  </span>
                </div>
                <p
                  style={{
                    color: "#ffffff80",
                    fontSize: "1.2rem",
                    margin: "10px",
                  }}
                >
                  {"Approx. : $ " + domainExtentCostInUSD + " USD"}
                </p>
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
            {/* <button
              className="closeTransferPopup"
              onClick={() => {
                document.body.classList.remove("popup-open");
                props.setExtendPopup(false);
              }}
            >
              Close
            </button> */}
            <button
              className="transfer-btn"
              onClick={() => {
                if (txSuccessfull) {
                  document.body.classList.remove("popup-open");
                  props.setExtendPopup(false);
                }
                extendDomain();
              }}
              disabled={fetchingValue && !extendCostInEth}
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
  );
}

export default ExtendExpiryDate;
