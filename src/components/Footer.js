import React from "react";
import "../styles/Footer.css";
import modedark from "../assets/logoiconblack.png";
import twitterdark from "../assets/twitterdark.png";
import discorddark from "../assets/discorddark.png";

function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_main">
        <div className="footer_left">
          <div className="social_icons">
            <img src={modedark} alt="mode domains" />
            <img src={twitterdark} alt="twitter mode domains" />
            <img src={discorddark} alt="discord mode domains" />
          </div>
          <div className="copyrights">
            <span>Copyright © 2023 MODE DOMAIN. All rights reserved.</span>
          </div>
        </div>
        <div className="footer_right">
          <ul className="footer_navmenu">
            <li className="footer_navmenu_item">
              Get Started
              <ul className="footer_submenu_parent">
                <li className="footer_submenu_item">
                  <a
                    href="https://app.modedomains.xyz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Claim Your Handle
                  </a>
                </li>
                <li className="footer_submenu_item">
                  <a
                    href="https://bridge.mode.network/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Bridge to Mode
                  </a>
                </li>
                <li className="footer_submenu_item">
                  <a
                    href="https://faucet.modedomains.xyz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mode Faucet
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer_navmenu_item">
              Documentation
              <ul className="footer_submenu_parent">
                <li className="footer_submenu_item">
                  <a
                    href="https://docs.modedomains.xyz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn about Mode Domains
                  </a>
                </li>
                <li className="footer_submenu_item">
                  <a
                    href="https://mode.network"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn about Mode Network
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer_navmenu_item">
              Roadmap
              <ul className="footer_submenu_parent">
                <li className="footer_submenu_item">
                  <a href="/roadmap">Our Journey</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
