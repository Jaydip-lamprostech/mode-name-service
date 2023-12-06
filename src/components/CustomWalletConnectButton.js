import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/CustomWalletConnectButton.css";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contract_abi from "../artifacts/contracts/NameRegistry.sol/NameRegistry.json";
import AvatarGenerator from "./AvatarGenerator";
import { motion } from "framer-motion";

function CustomWalletConnectButton(props) {
  const { address } = useAccount();
  const [ModeDomainsResolver, setmodeDomainsResolver] = useState("");

  useEffect(() => {
    // console.log("fetching the name in connect wallet");
    const fetchDomain = async () => {
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
          `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
          contract_abi.abi,
          provider
        );
        const balance = await contract.balanceOf(address);
        // console.log(parseInt(balance));
        if (parseInt(balance)) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, 0);
          // console.log(tokenId);
          const domainName = await contract.tokenIdToName(tokenId);
          // console.log(data);
          if (domainName) setmodeDomainsResolver(domainName + ".mode");
          else setmodeDomainsResolver(null);
        } else {
          setmodeDomainsResolver(null);
        }
      } catch (err) {
        setmodeDomainsResolver(null);
        // console.log(err.message);
      }
    };
    if (address) {
      fetchDomain();
    }
  }, [address, props.nameRegistered]);
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openConnectModal}
                    type="button"
                    className="connect-wallet"
                  >
                    Connect Wallet
                  </motion.button>
                );
              }

              if (chain.unsupported) {
                return (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openChainModal}
                    type="button"
                    className="wrong_network_btn"
                  >
                    <span>Wrong network</span>
                    <svg
                      fill="none"
                      height="7"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        xmlns="http://www.w3.org/2000/svg"
                      ></path>
                    </svg>
                  </motion.button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 3 }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="chain-button disable-mobile"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={openAccountModal}
                    type="button"
                    className="address-balance"
                  >
                    <span className="disable-mobile">
                      {account.displayBalance
                        ? ` ${account.displayBalance}`
                        : ""}
                    </span>
                    <span className="account-balance">
                      <AvatarGenerator
                        name={address}
                        width={"20px"}
                        height={"20px"}
                      />
                      <span className="account-name">
                        {ModeDomainsResolver
                          ? ModeDomainsResolver
                          : account.displayName}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#FFFFFF"
                      >
                        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                        <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
                      </svg>
                    </span>

                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                  </motion.button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default CustomWalletConnectButton;
