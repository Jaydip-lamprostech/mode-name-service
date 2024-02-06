import React, { useState, useEffect } from "react";
import "../styles/SearchQuery.css";
import contract_abi from "../artifacts/contracts/NameRegistry.json";
import registrarController_abi from "../artifacts/contracts/RegistrarController.json";
import base_abi from "../artifacts/contracts/Base.json";
import { ethers } from "ethers";
import { toBigInt } from "web3-utils";
import { validate } from "@ensdomains/ens-validation";
import { useNetwork } from "wagmi";
function SearchQuery(props) {
  const { chain } = useNetwork();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // const timer = setTimeout(() => {
    if (searchQuery.length === 0) {
      props.setDomainAvailability("-");
      props.setDomainPrice("N/A");
      props.setDomainExpiryDate("N/A");
      props.setDomainRegisteredPrice("N/A");
      props.setLoading({
        status: false,
        cost: false,
        expiry: false,
        lastSale: false,
      });
    }
    // else if (!/^[a-zA-Z0-9\p{Emoji}]+$/u.test(searchQuery)) {
    else if (!validate(searchQuery)) {
      // Input is valid, proceed with your logic
      console.log("Invalid Input");
      props.setDomainAvailability("invalid input");
      props.setDomainPrice("N/A");
      props.setDomainExpiryDate("N/A");
      props.setDomainRegisteredPrice("N/A");
      props.setLoading({
        status: false,
        cost: false,
        expiry: false,
        lastSale: false,
      });
    } else if (searchQuery.length < 3) {
      // Set static values for card here
      props.setDomainAvailability("too short");
      props.setDomainPrice("N/A");
      props.setDomainExpiryDate("N/A");
      props.setDomainRegisteredPrice("N/A");
      props.setLoading({
        status: false,
        cost: false,
        expiry: false,
        lastSale: false,
      });
    } else {
      getName(searchQuery);
    }
    // }, 300);

    // return () => {
    //   clearTimeout(timer);
    // };
  }, [searchQuery]);

  const handleInputChange = (event) => {
    let name = event.target.value;
    if (name && name.length === 3) {
      props.setIsPremium(false);
      props.setIsVip(true);
      props.setIsRegular(false);
      props.setDisableDomainNameType({
        vip: false,
        premium: true,
        normal: true,
      });
    } else if (name && name.length === 4) {
      props.setIsVip(false);
      props.setIsPremium(true);
      props.setIsRegular(false);
      props.setDisableDomainNameType({
        vip: false,
        premium: false,
        normal: true,
      });
    } else if (name && name.length > 4) {
      props.setIsPremium(false);
      props.setIsVip(false);
      props.setIsRegular(true);
      props.setDisableDomainNameType({
        vip: false,
        premium: false,
        normal: false,
      });
    }
    setSearchQuery(event.target.value.toLowerCase());
    props.setDomainName(event.target.value.toLowerCase());
    props.setLoading({
      status: true,
      cost: true,
      expiry: true,
      lastSale: true,
    });
    props.setDomainPrice("");
    props.setDomainRegisteredPrice("");
    props.setDomainExpiryDate("");
    props.setRegisterdomainPriceInWei("");
  };

  // const getName = async (name) => {
  //   //contract code starts here...............................
  //   try {
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       "https://sepolia.mode.network/"
  //     );
  //     const con = new ethers.Contract(
  //       `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
  //       contract_abi.abi,
  //       provider
  //     );
  //     const details = await con.getNameDetails(name);
  //     console.log(details);
  //     props.setDomainAvailability("registered");
  //     const timestampExp = details.expiryTimestamp;
  //     const humanDateExp = new Date(timestampExp * 1000).toLocaleDateString(
  //       "en-US",
  //       {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       }
  //     );
  //     const timestampRgd = details.creationTimestamp;
  //     const humanDateRgd = new Date(timestampRgd * 1000).toLocaleDateString(
  //       "en-US",
  //       {
  //         month: "long",
  //         day: "numeric",
  //         year: "numeric",
  //       }
  //     );
  //     props.setDomainExpiryDate(humanDateExp);
  //     props.setDomainRegisteredDate(humanDateRgd);
  //     props.setDomainExpiryTime(details.expiryTimestamp);
  //     props.setDomainRegisteredTime(details.creationTimestamp);
  //     props.setDomainOwner(details.ownerAddress);
  //     console.log();
  //     props.setDomainRegisteredPrice(
  //       ethers.utils.formatEther(details.registrationPrice)
  //     );
  //     // props.setFilteredUsers(details);
  //   } catch (error) {
  //     if (error.message.includes("Name is not registered")) {
  //       console.log("Name is not registered");
  //       props.setDomainAvailability("available");
  //       props.setDomainExpiryDate("N/A");
  //       await domainPriceCheck(name);
  //       // Handle the case when the name is not registered
  //     } else {
  //       console.log("Error:", error);

  //       // Handle other errors
  //     }
  //   } finally {
  //     props.setLoading({
  //       status: false,
  //       cost: false,
  //       expiry: false,
  //       lastSale: false,
  //     });
  //   }
  //   //contract code ends here.................................
  // };

  const getName = async (name) => {
    //contract code starts here...............................
    try {
      const rpcUrl =
        chain.id === 919
          ? "https://sepolia.mode.network/"
          : chain.id === 34443
          ? "https://mainnet.mode.network"
          : null;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const contractAddress =
        chain.id === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID
          : chain.id === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID
          : null;

      const con = new ethers.Contract(
        contractAddress,
        registrarController_abi.abi,
        provider
      );
      const identifier =
        chain.id === 919
          ? toBigInt(process.env.REACT_APP_IDENTIFIER)
          : chain.id === 34443
          ? toBigInt(process.env.REACT_APP_MAINNET_IDENTIFIER)
          : null;
      const available = await con.available(
        identifier,
        name // Replace with a label for your domain
      );
      console.log(available);
      if (available) {
        props.setDomainAvailability("available");
        props.setDomainExpiryDate("N/A");
        await domainPriceCheck(name);
      } else {
        props.setDomainAvailability("registered");
        await domainPriceCheck(name);
        await expiryCheck(name);
      }

      // const timestampExp = details.expiryTimestamp;
      // const humanDateExp = new Date(timestampExp * 1000).toLocaleDateString(
      //   "en-US",
      //   {
      //     month: "long",
      //     day: "numeric",
      //     year: "numeric",
      //   }
      // );
      // const timestampRgd = details.creationTimestamp;
      // const humanDateRgd = new Date(timestampRgd * 1000).toLocaleDateString(
      //   "en-US",
      //   {
      //     month: "long",
      //     day: "numeric",
      //     year: "numeric",
      //   }
      // );
      // props.setDomainExpiryDate(humanDateExp);
      // props.setDomainRegisteredDate(humanDateRgd);
      // props.setDomainExpiryTime(details.expiryTimestamp);
      // props.setDomainRegisteredTime(details.creationTimestamp);
      // props.setDomainOwner(details.ownerAddress);
      // props.setDomainRegisteredPrice(
      //   ethers.utils.formatEther(details.registrationPrice)
      // );
      // props.setFilteredUsers(details);
    } catch (error) {
      console.log(error);
      // if (error.message.includes("Name is not registered")) {
      //   props.setDomainAvailability("available");
      //   props.setDomainExpiryDate("N/A");
      //   await domainPriceCheck(name);
      //   // Handle the case when the name is not registered
      // } else {
      //   console.log("Error:", error);

      //   // Handle other errors
      // }
    } finally {
      props.setLoading({
        status: false,
        cost: false,
        expiry: false,
        lastSale: false,
      });
    }
    //contract code ends here.................................
  };
  // const domainPriceCheck = async (name) => {
  //   try {
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       "https://sepolia.mode.network/"
  //     );
  //     const con = new ethers.Contract(
  //       `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
  //       contract_abi.abi,
  //       provider
  //     );
  //     const price = await con.getRegistrationPrice(name);
  //     console.log(ethers.utils.formatEther(price));
  //     props.setDomainPrice(ethers.utils.formatEther(price));
  //     props.setRegisterdomainPriceInWei(price);
  //     // const eth = ;
  //     // props.setFilteredUsers(details);
  //   } catch (error) {
  //     console.log("Error:", error);
  //     // Handle other errors
  //   }
  // };

  const expiryCheck = async (name) => {
    const { ethereum } = window; // Ensure that the user is connected to the expected chain
    const provider = new ethers.providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork();
    const baseContractAddress =
      chainId === 919
        ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID_BASE
        : chainId === 34443
        ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID_BASE
        : null;

    const con = new ethers.Contract(
      baseContractAddress,
      base_abi.abi,
      provider
    );
    const tokenId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name));
    const expiryDate = await con.nameExpires(tokenId);
    const tokenUri = await con.tokenURI(tokenId);
    // console.log(tokenUri);
    //getting metadata
    fetch(tokenUri)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Process the API response data
        // console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    const test = new Date(expiryDate * 1000);
    // console.log(test);
    const humanDateExp = new Date(expiryDate * 1000).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
    // console.log(humanDateExp);
    props.setDomainExpiryDate(humanDateExp);
  };
  const domainPriceCheck = async (name) => {
    try {
      const rpcUrl =
        chain.id === 919
          ? "https://sepolia.mode.network/"
          : chain.id === 34443
          ? "https://mainnet.mode.network"
          : null;

      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

      const contractAddress =
        chain.id === 919
          ? process.env.REACT_APP_CONTRACT_ADDRESS_SPACEID
          : chain.id === 34443
          ? process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS_SPACEID
          : null;

      const con = new ethers.Contract(
        contractAddress,
        registrarController_abi.abi,
        provider
      );
      const registrationDuration = 31556952 * props.registrationPeriod;
      // console.log(props.registrationPeriod);
      // const price = await con.getRegistrationPrice(name);
      const identifier =
        chain.id === 919
          ? toBigInt(process.env.REACT_APP_IDENTIFIER)
          : chain.id === 34443
          ? toBigInt(process.env.REACT_APP_MAINNET_IDENTIFIER)
          : null;

      const estimatedPriceArray = await con.rentPrice(
        identifier,
        name, // Replace with a label for your domain
        registrationDuration
      );
      // console.log(estimatedPriceArray);
      // Access individual BigNumber objects in the array
      const base = parseInt(estimatedPriceArray[0]);
      const premium = parseInt(estimatedPriceArray[1]);
      const price = base + premium;

      // console.log(ethers.utils.formatEther(price));
      let x = price / 10 ** 18;
      let priceshort = parseFloat(x.toFixed(7));
      props.setDomainPrice(priceshort);
      props.setRegisterdomainPriceInWei(price);
      // const eth = ;
      // props.setFilteredUsers(details);
    } catch (error) {
      console.log("Error:", error);
      // Handle other errors
    }
  };

  return (
    <div>
      <div className="search-main">
        <div className="search-one">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 0 24 24"
            width="36px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Search Domain"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <div className="dot-mode">.mode</div>
      </div>
    </div>
  );
}

export default SearchQuery;
