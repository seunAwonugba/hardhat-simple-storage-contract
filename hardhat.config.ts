import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";

const {
    SEPOLIA_URL,
    ACCOUNT_PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    COIN_MARKET_CAP_API_KEY,
} = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
    defaultNetwork: "sepolia",
    solidity: "0.8.24",
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [String(ACCOUNT_PRIVATE_KEY)],
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        currency: "USD",
        L1: "ethereum",
        coinmarketcap: COIN_MARKET_CAP_API_KEY,
    },
};

export default config;
