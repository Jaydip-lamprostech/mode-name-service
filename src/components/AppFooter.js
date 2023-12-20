import React from "react";
import "../styles/Footer.css";
import modedark from "../asset/images/logoiconblack.png";
import twitterdark from "../asset/images/twitterdark.png";
import discorddark from "../asset/images/discorddark.png";
import telegramdark from "../asset/images/telegram.png";
import { Link } from "react-router-dom";

function AppFooter() {
  return (
    <div className="footer_container">
      <div className="footer_main">
        <div className="footer_left">
          <div className="social_icons">
            <a
              href="https://modedomains.xyz/"
              target="_blank"
              rel="noreferrer"
              aria-label="Mode Domains"
            >
              <img src={modedark} alt="mode domains" />
            </a>
            <a
              href="https://twitter.com/Mode_Domains"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Mode Domains"
            >
              <img src={twitterdark} alt="twitter mode domains" />
            </a>
            <a
              href="https://discord.com/invite/XdmEgUDGGf"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord Mode Domains"
            >
              <img src={discorddark} alt="discord mode domains" />
            </a>
            <a
              href="https://t.me/modedomains"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram Mode Domains"
            >
              <img src={telegramdark} alt="telegram mode domains" />
            </a>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AppFooter;
