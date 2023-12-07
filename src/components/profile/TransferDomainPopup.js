import React from "react";
import "./TransferDomainPopup.css";
import { Tooltip } from "react-tooltip";

function TransferDomainPopup(props) {
  return (
    <div>
      <div class="transfer_popup_overlay">
        <div class="transfer_popup_container">
          <div class="transfer_popup_card">
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
                      data-tooltip-id="domain_name"
                      data-tooltip-content="The domain name which will be transfered to the recipient."
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
                      id="domain_name"
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
                      {props.domainName}
                    </span>
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
                      data-tooltip-id="recipient_address"
                      data-tooltip-content="The one who will be the owner of this domain name."
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
                    <input
                      type="text"
                      placeholder="Enter Recipient's Address"
                    />
                  </div>
                </div>
                <div className="transferDomains_field_item">
                  <div className="transferDomains_field_title">
                    <span className="field_title">Summay of changes</span>
                    <span
                      className="transferDomain_field_info"
                      data-tooltip-id="summary_of_changes"
                      data-tooltip-content=""
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
                      id="summary_of_changes"
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
                      Update Owner Role to
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup-btns">
              <button
                className="closeTransferPopup"
                onClick={() => {
                  props.setTransferDomainPopup(false);
                }}
              >
                Close
              </button>
              <button
                className="transfer-btn"
                onClick={() => {
                  props.setTransferDomainPopup(false);
                }}
              >
                Tranfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferDomainPopup;
