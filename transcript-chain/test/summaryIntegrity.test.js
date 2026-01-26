import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("SummaryIntegrityRegistry", function () {
  it("anchors and verifies event", async function () {
    const factory = await ethers.getContractFactory("SummaryIntegrityRegistry");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const [signer] = await ethers.getSigners();
    const contentHash = ethers.hexlify(ethers.randomBytes(32));
    const meetingId = "TestMeeting";
    const ts = 123456789n;
    const eventHash = ethers.solidityPackedKeccak256(
      ["bytes32", "string", "uint64", "address"],
      [contentHash, meetingId, ts, await signer.getAddress()]
    );
    const tx = await contract.anchorSummary(contentHash, eventHash, meetingId);
    await tx.wait();
    const ok = await contract.verifyEvent(eventHash);
    expect(ok).to.equal(true);
  });

  it("rejects duplicate eventHash", async function () {
    const factory = await ethers.getContractFactory("SummaryIntegrityRegistry");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const [signer] = await ethers.getSigners();
    const contentHash = ethers.hexlify(ethers.randomBytes(32));
    const meetingId = "M2";
    const ts = 42n;
    const eventHash = ethers.solidityPackedKeccak256(
      ["bytes32", "string", "uint64", "address"],
      [contentHash, meetingId, ts, await signer.getAddress()]
    );
    await (await contract.anchorSummary(contentHash, eventHash, meetingId)).wait();
    await expect(contract.anchorSummary(contentHash, eventHash, meetingId)).to.be.revertedWith("Event already exists");
  });
});
