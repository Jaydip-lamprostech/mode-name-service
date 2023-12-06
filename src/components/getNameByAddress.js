import { ethers } from "ethers";
import contract_abi from "../artifacts/contracts/NameRegistry.sol/NameRegistry.json";

export const getNameByAddress = async (address) => {
  //contract code starts here...............................

  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.mode.network/"
  );
  const con = new ethers.Contract(
    `${process.env.REACT_APP_CONTRACT_ADDRESS}`,
    contract_abi.abi,
    provider
  );
  const balance = await con.balanceOf(address);
  //   console.log(parseInt(balance));
  if (parseInt(balance) > 0) {
    const tokenId = await con.tokenOfOwnerByIndex(address, 0);
    // console.log(tokenId);
    const domainName = await con.tokenIdToName(tokenId);
    // console.log(domainName);
    if (domainName) {
      const domainNameCreatedTimeStamp = await con.tokenIdToCreationTimestamp(
        tokenId
      );
      // console.log(domainNameCreatedTimeStamp);
      const domainNameExpiryTimeStamp = await con.nameExpiry(domainName);
      // console.log(domainNameExpiryTimeStamp);

      const domainNameRegistrationPrice = await con.getRegistrationPrice(
        domainName
      );
      // console.log(domainNameRegistrationPrice);
      const regDate = new Date(domainNameCreatedTimeStamp * 1000);
      // console.log(regDate);
      const formattedRegDate = regDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedRegTime = regDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      const expDate = new Date(domainNameExpiryTimeStamp * 1000);

      const formattedExpDate = expDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const formattedExpTime = expDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      return {
        domain: domainName + ".mode",
        expiryDate: formattedExpDate,
        expiryTime: formattedExpTime,
        registeredDate: formattedRegDate,
        registeredTime: formattedRegTime,
        registeredPrice:
          ethers.utils.formatEther(domainNameRegistrationPrice) + " ETH",
      };
    }
  }

  //contract code ends here.................................
};
