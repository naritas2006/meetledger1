import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";

process.env.NO_COLOR = "1";
process.env.FORCE_COLOR = "0";

export default {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_RPC,
    },
  },
  mocha: {
    reporter: "spec",
  },
  gasReporter: {
    enabled: false,
  },
};
