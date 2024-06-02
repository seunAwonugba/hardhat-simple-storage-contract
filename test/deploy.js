const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage Contract", function () {
    let contractFactory;
    let simpleStorageContract;
    beforeEach(async function () {
        contractFactory = await ethers.getContractFactory("SimpleStorage");

        simpleStorageContract = await contractFactory.deploy();

        await simpleStorageContract.waitForDeployment();
    });

    it("State variable favorite number should be initialized to 0", async function () {
        const favoriteNumber = await simpleStorageContract.favouriteNumber();

        expect(favoriteNumber == 0);
    });

    it("State variable favorite number should throw error when its not initialized to 0", async function () {
        const favoriteNumber = await simpleStorageContract.favouriteNumber();
        const anyOtherNumber = 5;

        expect(favoriteNumber != anyOtherNumber);
    });

    it("Getter should return state variable favourite number", async () => {
        const favoriteNumber = await simpleStorageContract.favouriteNumber();
        const getter = await simpleStorageContract.getter();

        expect(favoriteNumber).to.equal(getter);
    });

    it("Update state variable favourite number when, store function is called", async () => {
        const store = await simpleStorageContract.store("27");
        await store.wait(1);

        const favouriteNumber = await simpleStorageContract.favouriteNumber();

        expect(store).to.equal(favouriteNumber);
    });
});
