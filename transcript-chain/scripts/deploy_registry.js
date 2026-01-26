import { readFileSync } from "fs";
import path from "path";
import { ethers } from "ethers";

async function main() {
  const rpc = process.env.SEPOLIA_RPC;
  const keyRaw = process.env.PRIVATE_KEY;
  const key = keyRaw && keyRaw.startsWith("0x") ? keyRaw : (keyRaw ? "0x" + keyRaw : undefined);
  if (!rpc || !key) {
    throw new Error("Missing SEPOLIA_RPC or PRIVATE_KEY in env");
  }
  const provider = new ethers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(key, provider);
  const artifactPath = path.join(
    "artifacts",
    "contracts",
    "SummaryIntegrityRegistry.sol",
    "SummaryIntegrityRegistry.json"
  );
  const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();
  await contract.deploymentTransaction().wait();
  console.log("Registry deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});