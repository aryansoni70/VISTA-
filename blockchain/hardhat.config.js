/* eslint-disable @typescript-eslint/no-require-imports */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    amoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology/",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.length === 64
        ? [process.env.PRIVATE_KEY]
        : process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.startsWith("0x") && process.env.PRIVATE_KEY.length === 66
          ? [process.env.PRIVATE_KEY]
          : [],
      chainId: 80002,
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
};
