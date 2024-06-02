import hre from "hardhat";

const { ETHERSCAN_API_KEY } = process.env;
const main = async () => {
    const SimpleStorageContractFactory = await hre.ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract...");

    const deployContract = await SimpleStorageContractFactory.deploy();

    //contract receipt

    await deployContract.waitForDeployment();

    const contractAddress = await deployContract.getAddress();

    console.log(`Contract deployed to: ${contractAddress}`);

    // if (hre.network.config.chainId == 11155111 && ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmation");
    await deployContract.deploymentTransaction()?.wait(6);
    await verifyContract(contractAddress, []);
    // }

    //interaction with the contract

    const getter = await deployContract.getter();

    console.log(getter);

    const store = await deployContract.store(27);
    await store.wait(1);

    console.log(store);

    const getter2 = await deployContract.getter();
    console.log(getter2);
};

const verifyContract = async (contractAddress: any, args: any) => {
    console.log("Verifying contract");

    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Contract already verified");
        } else {
            console.log(error);
        }
    }
};

main()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
        process.exitCode = 1;
    });
