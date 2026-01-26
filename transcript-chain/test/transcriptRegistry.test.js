import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("TranscriptRegistry", function () {
  it("stores and verifies hash", async function () {
    const factory = await ethers.getContractFactory("TranscriptRegistry");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const fileHash = ethers.hexlify(ethers.randomBytes(32));
    await (await contract.storeHash(fileHash)).wait();
    const ok = await contract.verifyHash(fileHash);
    expect(ok).to.equal(true);
  });

  it("rejects duplicate hash", async function () {
    const factory = await ethers.getContractFactory("TranscriptRegistry");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const fileHash = ethers.hexlify(ethers.randomBytes(32));
    await (await contract.storeHash(fileHash)).wait();
    await expect(contract.storeHash(fileHash)).to.be.revertedWith("Hash already exists");
  });
});
