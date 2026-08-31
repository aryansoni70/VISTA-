/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-expressions */
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProofOfReality", function () {
  let contract;
  let owner;
  let otherAccount;

  const SAMPLE_VERIFICATION = {
    id: "POR-2026-00001",
    hash: "8f7c2a91b6d4e5f3a2c1d0e9f8b7a6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0",
    score: 96,
    verdict: "HIGH_CONFIDENCE_AUTHENTIC",
  };

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const ProofOfReality = await ethers.getContractFactory("ProofOfReality");
    contract = await ProofOfReality.deploy();
    await contract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the deployer as owner", async function () {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it("Should start with zero verifications", async function () {
      expect(await contract.totalVerifications()).to.equal(0);
    });
  });

  describe("Registration", function () {
    it("Should register a new verification", async function () {
      const tx = await contract.registerVerification(
        SAMPLE_VERIFICATION.id,
        SAMPLE_VERIFICATION.hash,
        SAMPLE_VERIFICATION.score,
        SAMPLE_VERIFICATION.verdict
      );

      await expect(tx)
        .to.emit(contract, "VerificationRegistered")
        .withArgs(
          SAMPLE_VERIFICATION.id,
          SAMPLE_VERIFICATION.hash,
          SAMPLE_VERIFICATION.score,
          SAMPLE_VERIFICATION.verdict,
          await getBlockTimestamp(tx)
        );

      expect(await contract.totalVerifications()).to.equal(1);
    });

    it("Should reject duplicate verification IDs", async function () {
      await contract.registerVerification(
        SAMPLE_VERIFICATION.id,
        SAMPLE_VERIFICATION.hash,
        SAMPLE_VERIFICATION.score,
        SAMPLE_VERIFICATION.verdict
      );

      await expect(
        contract.registerVerification(
          SAMPLE_VERIFICATION.id,
          SAMPLE_VERIFICATION.hash,
          SAMPLE_VERIFICATION.score,
          SAMPLE_VERIFICATION.verdict
        )
      ).to.be.revertedWith("ProofOfReality: verification already exists");
    });

    it("Should reject score > 100", async function () {
      await expect(
        contract.registerVerification(
          SAMPLE_VERIFICATION.id,
          SAMPLE_VERIFICATION.hash,
          101,
          SAMPLE_VERIFICATION.verdict
        )
      ).to.be.revertedWith("ProofOfReality: score must be 0-100");
    });

    it("Should reject non-owner callers", async function () {
      await expect(
        contract.connect(otherAccount).registerVerification(
          SAMPLE_VERIFICATION.id,
          SAMPLE_VERIFICATION.hash,
          SAMPLE_VERIFICATION.score,
          SAMPLE_VERIFICATION.verdict
        )
      ).to.be.revertedWith("ProofOfReality: caller is not the owner");
    });

    it("Should reject empty verification ID", async function () {
      await expect(
        contract.registerVerification(
          "",
          SAMPLE_VERIFICATION.hash,
          SAMPLE_VERIFICATION.score,
          SAMPLE_VERIFICATION.verdict
        )
      ).to.be.revertedWith("ProofOfReality: empty verification ID");
    });

    it("Should reject empty content hash", async function () {
      await expect(
        contract.registerVerification(
          SAMPLE_VERIFICATION.id,
          "",
          SAMPLE_VERIFICATION.score,
          SAMPLE_VERIFICATION.verdict
        )
      ).to.be.revertedWith("ProofOfReality: empty content hash");
    });
  });

  describe("Retrieval", function () {
    beforeEach(async function () {
      await contract.registerVerification(
        SAMPLE_VERIFICATION.id,
        SAMPLE_VERIFICATION.hash,
        SAMPLE_VERIFICATION.score,
        SAMPLE_VERIFICATION.verdict
      );
    });

    it("Should retrieve a stored verification", async function () {
      const [vId, vHash, vScore, vVerdict, vTimestamp] =
        await contract.getVerification(SAMPLE_VERIFICATION.id);

      expect(vId).to.equal(SAMPLE_VERIFICATION.id);
      expect(vHash).to.equal(SAMPLE_VERIFICATION.hash);
      expect(vScore).to.equal(SAMPLE_VERIFICATION.score);
      expect(vVerdict).to.equal(SAMPLE_VERIFICATION.verdict);
      expect(vTimestamp).to.be.greaterThan(0);
    });

    it("Should revert for non-existent verification", async function () {
      await expect(
        contract.getVerification("POR-NONEXISTENT")
      ).to.be.revertedWith("ProofOfReality: verification not found");
    });

    it("Should check if verification exists", async function () {
      expect(await contract.verificationExists(SAMPLE_VERIFICATION.id)).to.be.true;
      expect(await contract.verificationExists("POR-NONEXISTENT")).to.be.false;
    });
  });

  describe("Hash Verification", function () {
    beforeEach(async function () {
      await contract.registerVerification(
        SAMPLE_VERIFICATION.id,
        SAMPLE_VERIFICATION.hash,
        SAMPLE_VERIFICATION.score,
        SAMPLE_VERIFICATION.verdict
      );
    });

    it("Should return true for matching hash", async function () {
      expect(
        await contract.verifyContentHash(SAMPLE_VERIFICATION.id, SAMPLE_VERIFICATION.hash)
      ).to.be.true;
    });

    it("Should return false for non-matching hash", async function () {
      expect(
        await contract.verifyContentHash(SAMPLE_VERIFICATION.id, "different_hash_value")
      ).to.be.false;
    });
  });

  describe("Enumeration", function () {
    it("Should enumerate verification IDs", async function () {
      await contract.registerVerification("POR-001", "hash1", 90, "AUTHENTIC");
      await contract.registerVerification("POR-002", "hash2", 50, "SUSPICIOUS");

      expect(await contract.getVerificationIdAtIndex(0)).to.equal("POR-001");
      expect(await contract.getVerificationIdAtIndex(1)).to.equal("POR-002");
      expect(await contract.totalVerifications()).to.equal(2);
    });

    it("Should revert for out-of-bounds index", async function () {
      await expect(contract.getVerificationIdAtIndex(0)).to.be.revertedWith(
        "ProofOfReality: index out of bounds"
      );
    });
  });
});

// Helper to get block timestamp from a transaction
async function getBlockTimestamp(tx) {
  const receipt = await tx.wait();
  const block = await ethers.provider.getBlock(receipt.blockNumber);
  return block.timestamp;
}
