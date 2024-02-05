import React from "react";
import { useState } from "react";
import "../styles/DomainPurchasedPopup.css";
import { useAccount } from "wagmi";
import { add } from "lodash";
import { useEffect } from "react";

function DomainPurchasedPopup(props) {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  useEffect(() => {
    if (address) {
      console.log(address);
      let addInString = address.toString();
      console.log(addInString);
      let shortAdd =
        addInString.slice(0, 4) +
        "..." +
        addInString.slice(addInString.length - 4, addInString.length);
      setUserAddress(shortAdd);
    }
  }, [address]);

  const [isDomainFree, setIsDomainFree] = useState(
    props.showAfterDomainPurchasedPopup?.freeDomain
  );
  //   const tweetContent = `🎉 Exciting News! Just claimed my unique domain on @Mode_Domains: ${props.domainName}. 🚀✨ Crafting my digital presence with ModeDomains - the home of innovative domains! 🌐 Ready to conquer the web! 💪 #Modedomains #DigitalEmpire #ClaimYourSpace`;
  //   //   const tweetContent = "demo";
  //   const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
  //     tweetContent
  //   )}`;

  // const tweetContent = `Just minted my one-of-a-kind '.mode' handle! Be a part of the Onchain Cooperative – mint yours today! Go to ${"https://app.modedomains.xyz/"}`;
  // const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
  //   tweetContent
  // )}&url=${encodeURIComponent(
  //   "https://pbs.twimg.com/media/GByHTa1WIAAXfrX?format=png&name=small"
  // )}`;
  const tweetContent = `Just minted my one-of-a-kind '.mode' handle! @Mode_Domains\nBe a part of the Onchain Cooperative – mint yours today!\nGo to https://app.modedomains.xyz/`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetContent
  )}`;

  const handleTweetClick = () => {
    window.open(twitterUrl, "_blank");
  };
  return (
    <div className="afterpurchase_popup_overlay">
      <div className="afterpurchase_popup_container">
        <div className="afterpurchase_popup_card">
          <div className="registration_popup_close_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
              onClick={() => {
                props.setShowConfetti(false);
                props.setAfterDomainPurchasedPopup({
                  show: false,
                  freeDomain: false,
                });
                window.location.reload();
              }}
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
          </div>
          <h2>
            {isDomainFree
              ? "Congratulations 🎉"
              : "🎉 Hooray! You've just secured your digital identity! 🚀"}
          </h2>
          <p>
            {isDomainFree ? (
              "This domain was on us for a year and the cost has been reverted only the transaction fee is deducted.🌐✨"
            ) : (
              <span>
                {"We're thrilled to announce that "}
                <span
                  style={{
                    color: "#dffe00",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {userAddress}
                </span>
                {" is now the proud owner of the domain name "}
                <span
                  style={{
                    color: "#dffe00",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {props.domainName + ".mode"}
                </span>
                {" 🌐✨"}
              </span>
            )}
          </p>
          <p>
            Excitement shared is excitement doubled! Share the joy with your
            friends and followers on Twitter. Let the world know about your
            latest venture or project. <br />
            Click the tweet button below to tweet instantly!🌐✨
          </p>
          <div className="afterpurchase_popup-btns">
            <button
              className="tweet_button"
              onClick={() => {
                handleTweetClick();
              }}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DomainPurchasedPopup;
