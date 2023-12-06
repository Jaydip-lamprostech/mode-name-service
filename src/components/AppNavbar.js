import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/AppNavbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../asset/mode_logo.png";
import CustomWalletConnectButton from "./CustomWalletConnectButton";

function AppNavbar(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar-parent">
      <div className="navbar">
        <a href="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src={logo} alt="modedomains logo" />
            DOMAINS
          </div>
        </a>
        <div className="mobile-menu-icon close" onClick={toggleMenu}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </div>
        <div className="nav-links">
          <a className="nav-link" href="https://docs.modedomains.xyz/">
            Docs
          </a>
          <a className="nav-link" href="/profile">
            Profile
          </a>
        </div>
        <div className="cta-button">
          {/* <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          /> */}
          <CustomWalletConnectButton nameRegistered={props.nameRegistered} />
        </div>
      </div>

      <div className={showMenu ? "mobile-menu show" : "mobile-menu"}>
        <div className="mobile_menu_link_parent">
          <a className="nav-link" href="https://docs.modedomains.xyz/">
            <span className="nav-text-animate">Docs</span>
          </a>
          <a className="nav-link" href="/profile">
            <span className="nav-text-animate">Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppNavbar;
