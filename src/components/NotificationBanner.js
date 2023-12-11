import React, { useEffect, useRef, useState } from "react";
import "../styles/NotificationBanner.css";
import Marquee from "react-fast-marquee";

function NotificationBanner() {
  return (
    <div className="banner_container">
      <div className="block-list">
        <ul className="marquee-list">
          <Marquee pauseOnHover="true">
            <li>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa,
              illo.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              voluptate!
            </li>
          </Marquee>
        </ul>
      </div>
    </div>
  );
}

export default NotificationBanner;
