import { NextRequest, NextResponse } from "next/server";
import {
  getVerificationByVerificationId,
  updateBlockchainStatus,
} from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { verification_id } = body;

    if (!verification_id) {
      return NextResponse.json(
        { error: "Missing verification_id" },
        { status: 400 }
      );
    }

    // Get verification record
    const verification = getVerificationByVerificationId(verification_id);
    if (!verification) {
      return NextResponse.json(
        { error: "Verification not found" },
        { status: 404 }
      );
    }

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const rpcUrl = process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology/";

    // Check if blockchain is configured
    if (!contractAddress || !privateKey || contractAddress === "your_deployed_contract_address_here") {
      // Blockchain not configured — simulate for demo
      const simulatedTxHash = `0x${Buffer.from(
        verification.content_hash.slice(0, 32)
      ).toString("hex")}${"0".repeat(64 - verification.content_hash.slice(0, 32).length * 2)}`;

      updateBlockchainStatus(verification_id, simulatedTxHash, "confirmed");

      return NextResponse.json({
        success: true,
        simulated: true,
        txHash: simulatedTxHash,
        message: "Blockchain registration simulated (no wallet configured). Configure PRIVATE_KEY and NEXT_PUBLIC_CONTRACT_ADDRESS for real blockchain interaction.",
      });
    }

    // Real blockchain interaction using ethers.js
    try {
      const { ethers } = await import("ethers");
      
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(privateKey, provider);

      // Minimal ABI for registerVerification
      const abi = [
        "function registerVerification(string calldata _verificationId, string calldata _contentHash, uint256 _realityScore, string calldata _verdict) external",
      ];

      const contract = new ethers.Contract(contractAddress, abi, wallet);

      const tx = await contract.registerVerification(
        verification.verification_id,
        verification.content_hash,
        Math.round(verification.reality_score),
        verification.verdict
      );

      const receipt = await tx.wait();

      updateBlockchainStatus(
        verification_id,
        receipt.hash,
        "confirmed"
      );

      return NextResponse.json({
        success: true,
        simulated: false,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        message: "Verification registered on Polygon Amoy blockchain",
      });
    } catch (blockchainError: unknown) {
      const errorMessage = blockchainError instanceof Error ? blockchainError.message : "Unknown error";
      console.error("Blockchain error:", errorMessage);

      updateBlockchainStatus(verification_id, "", "failed");

      return NextResponse.json({
        success: false,
        error: `Blockchain registration failed: ${errorMessage}`,
      });
    }
  } catch (error) {
    console.error("Blockchain route error:", error);
    return NextResponse.json(
      { error: "Blockchain operation failed" },
      { status: 500 }
    );
  }
}
