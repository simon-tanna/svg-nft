import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import verify from "../utils/verify";
import {
	networkConfig,
	// developmentChains,
	INITIAL_SUPPLY,
} from "../helper-hardhat-config";

const deployMonsterCoin: DeployFunction = async function (
	hre: HardhatRuntimeEnvironment
) {
	const { getNamedAccounts, deployments, getChainId } = hre;
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = await getChainId();

	log(
		"- . - - - . - - - - . . - . - - - . - - - - . . - . - - - . - - - - . ."
	);

	const monsterCoin = await deploy("MonsterCoin", {
		from: deployer,
		args: [INITIAL_SUPPLY],
		log: true,
	});

	log(`Monster Coin deployed at ${monsterCoin.address}`);

	const networkName = networkConfig[chainId]["name"];
	log(
		`Verify with: \n npx hardhat verify --network ${networkName} ${monsterCoin.address}`
	);
};

// const deployMonsterCoin: DeployFunction = async function (
// 	hre: HardhatRuntimeEnvironment
// ) {
// 	const { getNamedAccounts, deployments, getChainId } = hre;
// 	const { deploy, log } = deployments;
// 	const { deployer } = await getNamedAccounts();
// 	const chainId = await getChainId();

// 	log(
// 		"- . - - - . - - - - . . - . - - - . - - - - . . - . - - - . - - - - . ."
// 	);
// 	const MonsterCoin = await deploy("MonsterCoin", {
// 		from: deployer,
// 		log: true,
// 	});
// 	log(`You are now deploying an NFT contract to ${MonsterCoin.address}`);

// 	const monsterCoinContract = await ethers.getContractFactory("MonsterCoin");
// 	const accounts: any = await hre.ethers.getSigners();
// 	const signer = accounts[0];
// 	const monsterCoin = new ethers.Contract(
// 		MonsterCoin.address,
// 		monsterCoinContract.interface,
// 		signer
// 	);

// 	log(`Your account is: ${signer.address}`);

// 	const networkName = networkConfig[chainId]["name"];
// 	log(
// 		`Verify with: \n npx hardhat verify --network ${networkName} ${monsterCoin.address}`
// 	);

// 	const weiAmount: string = (await signer.getBalance()).toString();

// 	log(
// 		`The balance Monster Coin is ${weiAmount}`
// 	);

// 	log(`Token Address: ${monsterCoin.address}`);
// };

export default deployMonsterCoin;
deployMonsterCoin.tags = ["all"];
