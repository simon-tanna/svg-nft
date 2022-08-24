import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {},
	},
	solidity: "0.8.9",
	namedAccounts: {
		deployer: {
			default: 0,
		},
	},
};

export default config;
