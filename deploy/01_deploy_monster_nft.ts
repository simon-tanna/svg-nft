import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

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
