import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import AppFooter from "./components/AppFooter";
// import DomainView from "./pages/DomainView";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import DomainView from "./pages/DomainView";
import Test from "./pages/Test";
import RegisterName from "./pages/RegisterName";
import InitialLoadingAnimation from "./components/InitialLoadingAnimation";
import Confetti from "react-confetti";
import UserEligibilityForFreeDomain from "./components/UserEligibilityForFreeDomain";
import Cookies from "js-cookie";

function App() {
  const { openChainModal } = useChainModal();
  const [nameRegistered, setNameRegistered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userEligibleForFreeDomain, setuserEligibleForFreeDomain] =
    useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [loadinFinal, setLoadingfinal] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hasVisited = Cookies.get("hasVisited");
        if (!hasVisited) {
          Cookies.set("hasVisited", "1", { expires: 0.0208 });
          setDisplayLoader(true);
        } else {
          setDisplayLoader(false);
        }
      } catch (error) {
        console.error("Error fetching data from cookies:", error);
      } finally {
        // Set loader to false after fetching or in case of an error
        setLoadingfinal(false);
      }
    };

    fetchData();

    return () => {
      setLoadingfinal(false);
      setDisplayLoader(false);
      // Cleanup or additional logic on component unmount
    };
  }, []);
  const { chain } = useNetwork();
  useEffect(() => {
    if (chain && chain.name !== "Mode Testnet") {
      openChainModal();
      // If connectedChain is not the predefined chain, show the chain selector popup
      // setShowChainSelector(true);
    }
  }, [chain, openChainModal]);

  return (
    <div className="App">
      {displayLoader && !loadinFinal ? <InitialLoadingAnimation /> : ""}
      {!loadinFinal ? (
        <div className="app-inside">
          <Router>
            <AppNavbar nameRegistered={nameRegistered} />
            <Routes>
              <Route
                path="/"
                element={
                  <RegisterName
                    setNameRegistered={setNameRegistered}
                    setShowConfetti={setShowConfetti}
                    nameRegistered={nameRegistered}
                    setuserEligibleForFreeDomain={setuserEligibleForFreeDomain}
                  />
                }
              />
              <Route path="profile" element={<Profile />} />
              <Route path="/domain/:domainName" element={<DomainView />} />
              <Route path="test" element={<Test />} />
              <Route path="/*" element={<RegisterName />} />
            </Routes>

            <AppFooter />
          </Router>
        </div>
      ) : null}

      {showConfetti ? (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ zIndex: "200" }}
        />
      ) : null}
      {userEligibleForFreeDomain ? (
        <UserEligibilityForFreeDomain
          setuserEligibleForFreeDomain={setuserEligibleForFreeDomain}
        />
      ) : null}
    </div>
  );
}

export default App;
