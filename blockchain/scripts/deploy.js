/* eslint-disable @typescript-eslint/no-require-imports */
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying ProofOfReality contract...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "POL\n");

  // Deploy the contract
  const ProofOfReality = await hre.ethers.getContractFactory("ProofOfReality");
  const contract = await ProofOfReality.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ ProofOfReality deployed to:", contractAddress);
  console.log("\n📋 Add this to your frontend .env.local:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`\n🔍 View on Polygonscan: https://amoy.polygonscan.com/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
