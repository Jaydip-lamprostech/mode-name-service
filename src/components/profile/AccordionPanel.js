import React, { useState } from "react";
import downArrowIcon from "../../asset/images/down-arrow.svg";
import upArrowIcon from "../../asset/images/up-arrow.svg";

const AccordionPanel = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-panel ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <span>{title}</span>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 0 24 24"
            width="36px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 0 24 24"
            width="36px"
            fill="#000000"
          >
            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
            <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
          </svg>
        )}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionPanel;
