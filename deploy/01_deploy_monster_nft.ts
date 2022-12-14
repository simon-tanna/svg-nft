import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import * as fs from "fs";
import { ethers } from "hardhat";
import { networkConfig } from "../helper-hardhat-config";

const deployMonsterNFT: DeployFunction = async function (
	hre: HardhatRuntimeEnvironment
) {
	const { getNamedAccounts, deployments, getChainId } = hre;
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = await getChainId();

	log(
		"- . - - - . - - - - . . - . - - - . - - - - . . - . - - - . - - - - . ."
	);
	const MonsterNFT = await deploy("MonsterNFT", {
		from: deployer,
		log: true,
	});
	log(`You have deployed an NFT contract to ${MonsterNFT.address}`);
	// read the svg
	let filepath = "./img/patternpad.svg";
	let svg = fs.readFileSync(filepath, { encoding: "utf8" });
	// svg will be passed in to the create function of the contract
	const monsterNFTContract = await ethers.getContractFactory("MonsterNFT");
	const accounts: any = await hre.ethers.getSigners();
	const signer = accounts[0];
	const monsterNFT = new ethers.Contract(
		MonsterNFT.address,
		monsterNFTContract.interface,
		signer
	);
	const networkName = networkConfig[chainId]["name"];
	log(
		`Verify with: \n npx hardhat verify --network ${networkName} ${monsterNFT.address}`
	);
	// call the create function
	let transactionResponse = await monsterNFT.create(svg);
	let receipt = await transactionResponse.wait(1);
	log("You've minted an NFT");
	log(`You can view the tokenURI here: ${await monsterNFT.tokenURI(0)}`);
};

// module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
// 	const { deploy, log } = deployments;
// 	const { deployer } = await getNamedAccounts();
// 	const chainId = await getChainId();

// 	log(
// 		"- . - - - . - - - - . . - . - - - . - - - - . . - . - - - . - - - - . ."
// 	);
// 	const MonsterNFT = await deploy("MonsterNFT", {
// 		from: deployer,
// 		log: true,
// 	});
// 	log(`You have deployed an NFT contract to ${MonsterNFT.address}`);
// };
export default deployMonsterNFT;
