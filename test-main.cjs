const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_URL);

  const CONTROLLER_ADDR = process.env.CONTROLLER_ADDR;
  const RECIPIENT = process.env.RECIPIENT;

  const abi = ["function withdraw() external"];
  const controller = new ethers.Contract(CONTROLLER_ADDR, abi, provider);

  const balBefore = await provider.getBalance(RECIPIENT);
  console.log("Recipient balance before:", ethers.utils.formatEther(balBefore));

  try {
    await controller.callStatic.withdraw();
    console.log("withdraw() callStatic succeeded (no revert)");
  } catch (e) {
    console.log("withdraw() simulation reverted:", e.message);
  }

  const balAfter = await provider.getBalance(RECIPIENT);
  console.log("Recipient balance after:", ethers.utils.formatEther(balAfter));

  // ذخیره لاگ در فایل
  fs.writeFileSync(
    "test-main-log.txt",
    `Before: ${ethers.utils.formatEther(balBefore)} ETH\n` +
    `After: ${ethers.utils.formatEther(balAfter)} ETH\n`
  );
}

main().catch(console.error);

