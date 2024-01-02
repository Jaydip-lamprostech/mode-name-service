import React, { useState } from "react";

function ProfileDomainNavbar({ onClick, activeItems }) {
  const [activeItem, setActiveItem] = useState(
    activeItems ? activeItems : "Details"
  );

  const handleClick = (itemName) => {
    setActiveItem(itemName);
    onClick(itemName); // Pass the clicked item to the parent
  };
  return (
    <div>
      <ul className="profileNavbar">
        <li
          className={
            activeItem === "Details"
              ? "active profileNavbarItem"
              : "profileNavbarItem"
          }
          onClick={() => handleClick("Details")}
        >
          Details
        </li>
        <li
          className={
            activeItem === "Ownership"
              ? "active profileNavbarItem"
              : "profileNavbarItem"
          }
          onClick={() => handleClick("Ownership")}
        >
          Ownership
        </li>
        <li
          className={
            activeItem === "Subnames"
              ? "active profileNavbarItem"
              : "profileNavbarItem"
          }
          onClick={() => handleClick("Subnames")}
        >
          Subnames
        </li>
        <li
          className={
            activeItem === "Permissions"
              ? "active profileNavbarItem"
              : "profileNavbarItem"
          }
          onClick={() => handleClick("Permissions")}
        >
          Permissions
        </li>
        <li
          className={
            activeItem === "MoreDetails"
              ? "active profileNavbarItem"
              : "profileNavbarItem"
          }
          onClick={() => handleClick("MoreDetails")}
        >
          More
        </li>
      </ul>
    </div>
  );
}

export default ProfileDomainNavbar;
