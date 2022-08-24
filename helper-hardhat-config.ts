export interface networkConfigItem {
	name?: string;
}

export interface networkConfigInfo {
	[key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
	31337: {
		name: "localhost",
	},
};

// export const networkConfig = {
// 	31337: {
// 		name: "localhost",
// 	},
// };
