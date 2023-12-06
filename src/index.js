import React from "react";
import "./styles/custom-cursor.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-tooltip/dist/react-tooltip.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const modeTestnet = {
  id: 919,
  name: "Mode Testnet",
  iconUrl: "https://chainlist.org/unknown-logo.png",
  iconBackground: "#000",
  network: "Mode",
  nativeCurrency: {
    decimals: 18,
    name: "Mode Testnet",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://sepolia.mode.network/"] },
    default: { http: ["https://sepolia.mode.network/"] },
  },
};

const { chains, publicClient } = configureChains(
  [modeTestnet],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Mode Domains",
  projectId: "5bc831dcf02437ce75e6b2cce2099ae0",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider
      chains={chains}
      theme={midnightTheme({
        accentColor: "#dffe00",
        accentColorForeground: "black",
        borderRadius: "medium",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
