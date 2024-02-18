const { expect } = require("chai");

describe("MyToken", function () {
    let Token;
    let token;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await Token.deploy();
        await token.deployed();
    });

    it("Should have correct name, symbol, and initial supply", async function () {
        expect(await token.name()).to.equal("Tetris");
        expect(await token.symbol()).to.equal("TET");
        expect(await token.totalSupply()).to.equal(1000000);
    });

    it("Should mint tokens to owner's address", async function () {
        const balance = await token.balanceOf(owner.address);
        expect(balance).to.equal(1000000);
    });

    it("Should mint tokens as miner reward", async function () {
        await token.connect(addr1).mintMinerReward();
        const balance = await token.balanceOf(addr1.address);
        expect(balance).to.equal(100);
    });

    it("Should set block reward", async function () {
        await token.connect(owner).setBlockReward(200);
        const balance = await token.balanceOf(owner.address);
        expect(balance).to.equal(1000200);
    });

    it("Should destroy contract and transfer remaining tokens", async function () {
        const recipient = addr1.address;
        await token.connect(owner).destroy(recipient);
        const balance = await token.balanceOf(recipient);
        expect(balance).to.equal(1000000);
    });

    it("Should revert if non-owner tries to set block reward", async function () {
        await expect(token.connect(addr1).setBlockReward(200)).to.be.revertedWith("Only owner can call this function");
    });
});
