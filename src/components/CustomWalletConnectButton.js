import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/CustomWalletConnectButton.css";
import { useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import resolverContractABI from "../artifacts/contracts/PublicResolver.json";
import reverseRegistrarABI from "../artifacts/contracts/ReverseRegistrar.json";
import AvatarGenerator from "./AvatarGenerator";
import { motion } from "framer-motion";

function CustomWalletConnectButton(props) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [ModeDomainsResolver, setmodeDomainsResolver] = useState("");

  useEffect(() => {
    // console.log("fetching the name in connect wallet");
    const fetchDomain = async () => {
      try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const { chainId } = await provider.getNetwork();

        const signer = provider.getSigner();
        const resolverContractAddress =
          chainId === 919
            ? process.env.REACT_APP_CONTRACT_ADDRESS_RESOLVER
            : chainId === 34443
            ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_RESOLVER
            : null;

        const reverseRegistrarContractAddress =
          chainId === 919
            ? process.env.REACT_APP_CONTRACT_ADDRESS_REVERSE_REGISTRAR
            : chainId === 34443
            ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_REVERSE_REGISTRAR
            : null;

        const resolverContract = new ethers.Contract(
          resolverContractAddress,
          resolverContractABI.abi,
          signer
        );

        const reverseRegistrarContract = new ethers.Contract(
          reverseRegistrarContractAddress,
          reverseRegistrarABI.abi,
          signer
        );
        // console.log(resolverContract, "resolverContract");
        const reverseNode = await reverseRegistrarContract.node(address);

        // console.log(reverseNode);
        const primaryName = await resolverContract.name(reverseNode);
        return primaryName;
      } catch (err) {
        setmodeDomainsResolver(null);
        // console.log(err.message);
      }
    };
    if (address) {
      fetchDomain().then((primaryName) => {
        setmodeDomainsResolver(primaryName);
      });
    }
  }, [address, chain]);

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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
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
                        {/* {!ModeDomainsResolver && address
                          ? address.slice(0, 4) +
                            "..." +
                            address.slice(address.length - 4, address.length)
                          : ""} */}
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
