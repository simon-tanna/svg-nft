import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";

const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {},
		matic: {
			url: POLYGON_MUMBAI_RPC_URL,
			accounts: [process.env.PRIVATE_KEY!],
		},
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: ETHERSCAN_API_KEY,
	},
	solidity: "0.8.9",
	namedAccounts: {
		deployer: {
			default: 0,
		},
	},
};

export default config;
