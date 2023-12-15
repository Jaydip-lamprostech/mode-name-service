import React, { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/ModeDomains_Logo_modified.png";
import { Link } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [subMenuVisibility, setSubMenuVisibility] = useState({});

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setSubMenuVisibility({});
  };
  useEffect(() => {
    if (window.innerWidth > 786) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    console.log(scrollPosition);
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navbarClass = scrollPosition > 0 ? "backdrop-filter" : "";

  const toggleSubMenu = (submenuNumber) => {
    setSubMenuVisibility((prevVisibility) => ({
      ...Object.fromEntries(
        Object.entries(prevVisibility).map(([key, value]) => [key, false])
      ),
      [submenuNumber]: !prevVisibility[submenuNumber],
    }));
  };

  return (
    <div
      className={`navbar-parent ${navbarClass} ${showMenu ? "backdrop-filter" : ""
        }`}
    >
      <div className="navbar">
        <a href="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src={logo} alt="modedomains logo" />
          </div>
        </a>
        <div className="mobile-menu-icon close" onClick={toggleMenu}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </div>
        <div className="nav-links">
          <span className="nav-link submenu">
            Get Started
            <ul className="subMenuItemParent">
              <li className="subMenuItem">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M0.329385 8.28426C0.540353 8.49516 0.82645 8.61364 1.12476 8.61364C1.42307 8.61364 1.70917 8.49516 1.92013 8.28426L7.48888 2.71551L13.0576 8.28426C13.2698 8.48919 13.554 8.60258 13.849 8.60002C14.1439 8.59745 14.4261 8.47914 14.6347 8.27056C14.8433 8.06197 14.9616 7.77981 14.9641 7.48484C14.9667 7.18986 14.8533 6.90569 14.6484 6.69351L8.28426 0.329385C8.07329 0.11848 7.78719 0 7.48888 0C7.19058 0 6.90448 0.11848 6.69351 0.329385L0.329385 6.69351C0.11848 6.90448 0 7.19058 0 7.48888C0 7.78719 0.11848 8.07329 0.329385 8.28426Z"
                    fill="#F8F8F8"
                  />
                </svg>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://app.modedomains.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Claim Your Handle
                </a>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://bridge.mode.network/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bridge to Mode
                </a>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://faucet.modedomains.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mode Faucet
                </a>
              </li>
            </ul>
          </span>
          <span
            className="nav-link submenu"
            href="https://docs.modedomains.xyz/"
          >
            Documentation
            <ul className="subMenuItemParent">
              <li className="subMenuItem">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M0.329385 8.28426C0.540353 8.49516 0.82645 8.61364 1.12476 8.61364C1.42307 8.61364 1.70917 8.49516 1.92013 8.28426L7.48888 2.71551L13.0576 8.28426C13.2698 8.48919 13.554 8.60258 13.849 8.60002C14.1439 8.59745 14.4261 8.47914 14.6347 8.27056C14.8433 8.06197 14.9616 7.77981 14.9641 7.48484C14.9667 7.18986 14.8533 6.90569 14.6484 6.69351L8.28426 0.329385C8.07329 0.11848 7.78719 0 7.48888 0C7.19058 0 6.90448 0.11848 6.69351 0.329385L0.329385 6.69351C0.11848 6.90448 0 7.19058 0 7.48888C0 7.78719 0.11848 8.07329 0.329385 8.28426Z"
                    fill="#F8F8F8"
                  />
                </svg>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://docs.modedomains.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn about Mode Domains
                </a>
              </li>
              <li className="subMenuItem">
                <a href="https://mode.network" target="_blank" rel="noreferrer">
                  Learn about Mode Network
                </a>
              </li>
            </ul>
          </span>
          <span className="nav-link submenu">
            Roadmap
            <ul className="subMenuItemParent">
              <li className="subMenuItem">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M0.329385 8.28426C0.540353 8.49516 0.82645 8.61364 1.12476 8.61364C1.42307 8.61364 1.70917 8.49516 1.92013 8.28426L7.48888 2.71551L13.0576 8.28426C13.2698 8.48919 13.554 8.60258 13.849 8.60002C14.1439 8.59745 14.4261 8.47914 14.6347 8.27056C14.8433 8.06197 14.9616 7.77981 14.9641 7.48484C14.9667 7.18986 14.8533 6.90569 14.6484 6.69351L8.28426 0.329385C8.07329 0.11848 7.78719 0 7.48888 0C7.19058 0 6.90448 0.11848 6.69351 0.329385L0.329385 6.69351C0.11848 6.90448 0 7.19058 0 7.48888C0 7.78719 0.11848 8.07329 0.329385 8.28426Z"
                    fill="#F8F8F8"
                  />
                </svg>
              </li>
              <li className="subMenuItem">
                <Link to="/roadmap">Our Journey</Link>
              </li>
            </ul>
          </span>
          <span className="nav-link submenu">
            Community
            <ul className="subMenuItemParent">
              <li className="subMenuItem">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M0.329385 8.28426C0.540353 8.49516 0.82645 8.61364 1.12476 8.61364C1.42307 8.61364 1.70917 8.49516 1.92013 8.28426L7.48888 2.71551L13.0576 8.28426C13.2698 8.48919 13.554 8.60258 13.849 8.60002C14.1439 8.59745 14.4261 8.47914 14.6347 8.27056C14.8433 8.06197 14.9616 7.77981 14.9641 7.48484C14.9667 7.18986 14.8533 6.90569 14.6484 6.69351L8.28426 0.329385C8.07329 0.11848 7.78719 0 7.48888 0C7.19058 0 6.90448 0.11848 6.69351 0.329385L0.329385 6.69351C0.11848 6.90448 0 7.19058 0 7.48888C0 7.78719 0.11848 8.07329 0.329385 8.28426Z"
                    fill="#F8F8F8"
                  />
                </svg>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://x.com/mode_domains?s=21&t=juzRO27tYTu0QpldKz9fgA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://discord.gg/NTVAnkmkn9"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
              </li>
              <li className="subMenuItem">
                <a
                  href="https://t.me/modedomains"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </span>
        </div>
        <div className="cta-button">
          {/* <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          /> */}
          {/* <button>Go to app</button> */}
        </div>
      </div>

      <div className={showMenu ? "mobile-menu show" : "mobile-menu"}>
        <div className="mobile_menu_link_parent">
          <div
            className={`mobile_nav_link ${subMenuVisibility[1] ? "show" : ""}`}
          >
            <span className="nav-text-animate" onClick={() => toggleSubMenu(1)}>
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#FFFFFF"
              >
                <path d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
              </svg>
            </span>
            <ul className="mobile_header_submenu">
              <li className="mobile_header_submenu_item">
                <a
                  href="https://app.modedomains.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Claim Your Handle
                </a>
              </li>
              <li className="mobile_header_submenu_item">
                <a
                  href="https://bridge.mode.network/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bridge to Mode
                </a>
              </li>
              <li className="mobile_header_submenu_item">
                <a
                  href="https://faucet.modedomains.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mode Faucet
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`mobile_nav_link ${subMenuVisibility[2] ? "show" : ""}`}
          >
            <span className="nav-text-animate" onClick={() => toggleSubMenu(2)}>
              Documentation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#FFFFFF"
              >
                <path d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
              </svg>
            </span>
            <ul className="mobile_header_submenu">
              <li className="mobile_header_submenu_item">
                <a
                  href="https://docs.modedomains.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn about Mode Domains
                </a>
              </li>
              <li className="mobile_header_submenu_item">
                <a href="https://mode.network" target="_blank" rel="noreferrer">
                  Learn about Mode Network
                </a>
              </li>
            </ul>
          </div>
          <div
            className={`mobile_nav_link ${subMenuVisibility[3] ? "show" : ""}`}
          >
            <span className="nav-text-animate" onClick={() => toggleSubMenu(3)}>
              Roadmap
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#FFFFFF"
              >
                <path d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
              </svg>
            </span>
            <ul className="mobile_header_submenu">
              <li className="mobile_header_submenu_item">
                <a href="/roadmap">Our Journey</a>
              </li>
            </ul>
          </div>
          <div
            className={`mobile_nav_link ${subMenuVisibility[4] ? "show" : ""}`}
          >
            <span className="nav-text-animate" onClick={() => toggleSubMenu(4)}>
              Community
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#FFFFFF"
              >
                <path d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
              </svg>
            </span>
            <ul className="mobile_header_submenu">
              <li className="mobile_header_submenu_item">
                <a
                  href="https://x.com/mode_domains?s=21&t=juzRO27tYTu0QpldKz9fgA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li className="mobile_header_submenu_item">
                <a
                  href="https://discord.gg/NTVAnkmkn9"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
              </li>
              <li className="mobile_header_submenu_item">
                <a
                  href="https://t.me/modedomains"
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
