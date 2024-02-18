import {ethers} from "hardhat";

async function main() {
  // We get the contract to deploy
  const MyToken = await ethers.getContractFactory("MyToken");
  console.log("Deploying MyToken...");
  const myToken = await MyToken.deploy();
  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
