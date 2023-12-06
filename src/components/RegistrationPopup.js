import React, { useState } from "react";
import { useAccount } from "wagmi";
import "../styles/Loader.css";
import { Tooltip } from "react-tooltip";
import InfoPopup from "./InfoPopup";
import { motion } from "framer-motion";

function RegistrationPopup(props) {
  const { address } = useAccount();

  //   const handlePeriodDecrease = () => {
  //     if (registrationPeriod !== 1) setRegistrationPeriod((prev) => prev - 1);
  //   };

  //   const handlePeriodIncrease = () => {
  //     setRegistrationPeriod((prev) => prev + 1);
  //   };
  return (
    <div className="registration_popup">
      <div className="registration_popup_inside">
        <div className="registration_form">
          <div className="registration_popup_close_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
              onClick={props.closePopup}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </div>
          <div className="registration_form_inside">
            <h1>
              Register
              <span className="mode_name">{props.domainName}.mode</span>
            </h1>
            <div className="registartion_fields">
              <div className="registration_field_item">
                <div className="registration_field_title">
                  <span className="field_title">Registration Period</span>
                  <span
                    className="field_info"
                    data-tooltip-id="registration-period"
                    data-tooltip-content="The number of years you will have right over this domain"
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
                    id="registration-period"
                    removeStyle
                    style={{
                      maxWidth: "200px",
                      wordBreak: "break-word",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div className="registartion_field_input registration_period">
                  <span className="registration_period_time">
                    <span>1</span> Year
                  </span>
                  <div
                    className="registration_period_modification"
                    data-tooltip-id="increase-decrease-period"
                    data-tooltip-content="On testnet period is fixed for 1 year right now."
                  >
                    <span
                      //   className={
                      //     registrationPeriod === 1
                      //       ? "period_decrease opacity_low"
                      //       : "period_decrease"
                      //   }
                      className="period_decrease opacity_low"

                      //   onClick={handlePeriodDecrease}
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
                      className="period_increase opacity_low"
                      //   onClick={handlePeriodIncrease}
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
                    <Tooltip
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
                    />
                  </div>
                </div>
              </div>
              <div className="registration_field_item">
                <div className="registration_field_title">
                  <span className="field_title">
                    Domain Cost{" "}
                    <span className="field-sub-title">
                      (Excluding Gas Fees)
                    </span>
                  </span>
                  <span
                    className="field_info"
                    data-tooltip-id="domain-cost"
                    data-tooltip-content="The cost is for the period selected."
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
                    id="domain-cost"
                    removeStyle
                    style={{
                      maxWidth: "200px",
                      wordBreak: "break-word",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div className="registartion_field_input">
                  <span className="registration_domain_cost">
                    {props.domainNamePrice} ETH
                  </span>
                </div>
              </div>
              <div className="registration_field_item">
                <div className="registration_field_title">
                  <span className="field_title">Payment Mode</span>
                  <span
                    className="field_info"
                    data-tooltip-id="payment-mode"
                    data-tooltip-content="The chain on which domain will be purchased"
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
                    id="payment-mode"
                    removeStyle
                    style={{
                      maxWidth: "200px",
                      wordBreak: "break-word",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
                <div className="registartion_field_input payment-mode">
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value="option1"
                        readOnly
                        className="custom-radio"
                        checked
                      />
                      Mode Testnet
                    </label>
                  </div>
                  <div>
                    <p className="registration_field_information">
                      We aim to contribute 75% of the fees collected to Optimism
                      Collective & Mode. The rest 25% will be used in
                      development,maintenance & integration of the project.
                    </p>
                  </div>
                  <div>
                    <a
                      className="claim-mode-testnet"
                      href="https://faucet.modedomains.xyz/"
                      target="_blanck"
                    >
                      Mode Testnet Faucet
                    </a>
                  </div>
                </div>
              </div>
              <div className="registration_field_item transaction-err">
                {props.errorMessage ? (
                  <div className="registartion_field_input">
                    <p>Error</p>
                    <div
                      className="error-msg"
                      data-tooltip-id="error-msg"
                      data-tooltip-content={
                        props.errorMessage.slice(0, 240) + "..."
                      }
                    >
                      {props.errorMessage}
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
                ) : null}
              </div>
              <div className="registration_field_item">
                <span className="only-one-claim-info">
                  For testnet, only one handle can be claimed by the user,
                  choose wisely.
                </span>
              </div>
              <div className="registration_field_item">
                {props.transactionState.waiting ? (
                  <div className="register loader">
                    {props.transactionState.msg}
                    <div className="sp sp-wave"></div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="register"
                    onClick={() => {
                      if (address) props.registerName();
                      else props.openConnectModal();
                    }}
                  >
                    Register
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPopup;
