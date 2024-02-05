const { ethers } = require("ethers");
const web3Utils = require("web3-utils");

const { toBigInt, toHex, hexToBytes, bytesToHex, sha3 } = web3Utils;

// Replace these values with your actual contract and account details
// const contractAddress = "0xC5005a0027CcD013622940202693795973991dd4";
// const resolverAddress = "0xf675259f989f95e15d7923AccC6883D2e1fdd735";
const contractAddress = "0xD7b837A0E388B4c25200983bdAa3EF3A83ca86b7";
const resolverAddress = "0x6d3b3f99177fb2a5de7f9e928a9bd807bf7b5bad";
const privateKey =
  "0x1f02b4b3c3904d718ee3796afdd2b9b15f901acc2e2b6dcf77dc42c82ef772fd";
// const identifier = "24788734048738952657326481919470860950418461592552443182906243034561913"
const identifier =
  "928593986118297001133743495696716959653430091213802595039423673029279097";

// const providerUrl = "https://sepolia.mode.network/";

const providerUrl = "https://mainnet.mode.network/";
// const baseContractAddress = "0xca3a57e014937c29526de98e4a8a334a7d04792b"
// const baseContractABI = require("../artifacts/contracts/base/Base.sol/Base.json")
// const publicResolverABI = require("../artifacts/contracts/resolvers/PublicResolver.sol/PublicResolver.json")
// const publicResolverAddress = "0xf675259f989f95e15d7923AccC6883D2e1fdd735"

const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Replace these values with the actual domain and registration details
const domainToRegister = "akash1114";
const registrationDuration = 31556952; // 1 year in seconds

async function registerDomain() {
  // Load your contract ABI and connect to the contract
  const contractABI = require("../artifacts/contracts/controller/RegistrarController.sol/RegistrarController.json"); // Replace with your actual ABI
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    wallet
  );
  //2264379541407608
  const estimatedPriceArray = await contract.rentPrice(
    toBigInt(identifier),
    domainToRegister, // Replace with a label for your domain
    registrationDuration
  );
  console.log(estimatedPriceArray);
  // Access individual BigNumber objects in the array
  const base = estimatedPriceArray[0];
  const premium = estimatedPriceArray[1];

  console.log("Base Price (Wei):", base.toString());
  console.log("Premium Price (Wei):", premium.toString());
  // const USE_GIFTCARD_EXTRA_DATA = encodeHookExtraData("", true);

  const available = await contract.available(
    toBigInt(identifier),
    domainToRegister // Replace with a label for your domain
  );
  console.log(available);
  try {
    // Submit the registration transaction
    const registrationTx = await contract.bulkRegister(
      toBigInt(identifier),
      [domainToRegister],
      wallet.address,
      registrationDuration,
      resolverAddress,
      true,
      [
        "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000002e00000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000f073d150c6ebd6416d242ed6defb8958bd11d86b3d23671e4436ef6c59d0875e94dfafab78e0a66c3b84340eea3013bbd8b70e6a6b9ec2a791ed3bc0380e86e75777834382f75b47abcdcbf01694d957084698a84b6dfc26636294adb41f879814e1c71e4aa71aa550087c90683a5407851f60aca874bc8a786d67dd38b0f52d3a5ba781a8a9e8cb34c41ac6ff842f9205793af1b5075199b20f41f21bea478d80483e313409b992482f41920e95634e3e956eaf1f477480c1a855d4d1260987efd92dcf33398014f85e872aab3c24572e6bdd5a8ff0d60852b9ec46fb13fa3752c6a40226c004d2ce7d7ca025a47556d6472cbeea357d93e5beff19247ebc655073f6f9597292fe3eca40b3cd6583967d434f8df284ce6770be0dc5c4072284f769ddf7bf499f1a77384be578c9912beba9918b6b82c062c3bae69a8a01b5c5eb403c27ca9dac5ed94dfe17ba36310d7a7487307103ba3e9ddf2ce90f278fa08e4570847f61d1777d275125800e6e3d4faba487e350449d090878c30676dce8b1faaacb681bccdfeabb3040458160ff8e2e671ca4bf90f1d8fa181e24a5c836840e9d2e74c8dc082606b55f822ffd12ecf7bed57fc66276e65c705297c1277de45d8b40c2bf814f7e94148e0ed7049494582a15e0a9b3a9f5cb9952378b2747b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ],
      {
        value: (parseInt(base) + parseInt(premium)).toString(),
        // gasLimit: 2000000, // Manually set a sufficient gas limit
      }
    );

    // Wait for the transaction to be mined
    const receipt = await registrationTx.wait();
    console.log(
      "Registration successful. Transaction hash:",
      receipt.transactionHash
    );
  } catch (error) {
    console.error("Error registering domain:", error.message);
  }
}

// Call the registration function
registerDomain();
