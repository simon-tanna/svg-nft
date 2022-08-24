export interface networkConfigItem {
	name?: string;
	blockConfirmations?: number;
}

export interface networkConfigInfo {
	[key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
	31337: {
		name: "localhost",
	},
	80001: {
		name: "matic",
	},
};

export const INITIAL_SUPPLY = "1000000000000000000000000000";

export const developmentChains = ["hardhat", "localhost"]

// export const networkConfig = {
// 	31337: {
// 		name: "localhost",
// 	},
// };
