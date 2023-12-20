import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/AppNavbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../asset/ModeDomains_Logo_modified.png";
import CustomWalletConnectButton from "./CustomWalletConnectButton";
import NotificationBanner from "./NotificationBanner";
import { Link } from "react-router-dom";

function AppNavbar(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {" "}
      <div className="navbar-parent">
        <div className="navbar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo">
              <img src={logo} alt="modedomains logo" />
              {/* DOMAINS */}
            </div>
          </Link>
          <div className="mobile-menu-icon close" onClick={toggleMenu}>
            {showMenu ? <FaTimes /> : <FaBars />}
          </div>
          <div className="nav-links">
            <a className="nav-link" href="https://docs.modedomains.xyz/">
              Docs
            </a>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
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
      {/* <NotificationBanner text="Your notification content goes here!" /> */}
    </>
  );
}

export default AppNavbar;
