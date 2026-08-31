/**
 * Blockchain Integration Layer
 * Handles ethers.js v6 interaction with the ProofOfReality smart contract
 * on Polygon Amoy Testnet.
 */

// Contract ABI — only the functions we need
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "string", name: "verificationId", type: "string" },
      { indexed: false, internalType: "string", name: "contentHash", type: "string" },
      { indexed: false, internalType: "uint256", name: "realityScore", type: "uint256" },
      { indexed: false, internalType: "string", name: "verdict", type: "string" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    name: "VerificationRegistered",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_verificationId", type: "string" },
      { internalType: "string", name: "_contentHash", type: "string" },
      { internalType: "uint256", name: "_realityScore", type: "uint256" },
      { internalType: "string", name: "_verdict", type: "string" },
    ],
    name: "registerVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_verificationId", type: "string" }],
    name: "getVerification",
    outputs: [
      { internalType: "string", name: "verificationId", type: "string" },
      { internalType: "string", name: "contentHash", type: "string" },
      { internalType: "uint256", name: "realityScore", type: "uint256" },
      { internalType: "string", name: "verdict", type: "string" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_verificationId", type: "string" },
      { internalType: "string", name: "_contentHash", type: "string" },
    ],
    name: "verifyContentHash",
    outputs: [{ internalType: "bool", name: "matches", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_verificationId", type: "string" }],
    name: "verificationExists",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVerifications",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Contract address — set after deployment
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

// Polygon Amoy Testnet config
export const POLYGON_AMOY = {
  chainId: 80002,
  name: "Polygon Amoy Testnet",
  rpcUrl: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology/",
  blockExplorer: "https://amoy.polygonscan.com",
  currency: "POL",
};

/**
 * Register a verification on the blockchain.
 * This runs server-side via the API route.
 */
export async function registerOnBlockchain(
  verificationId: string,
  contentHash: string,
  realityScore: number,
  verdict: string
): Promise<{ success: boolean; txHash: string; error?: string }> {
  try {
    const response = await fetch("/api/blockchain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        verificationId,
        contentHash,
        realityScore: Math.round(realityScore),
        verdict,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      txHash: "",
      error: error instanceof Error ? error.message : "Blockchain registration failed",
    };
  }
}

/**
 * Get the Polygonscan URL for a transaction.
 */
export function getPolygonscanUrl(txHash: string): string {
  return `${POLYGON_AMOY.blockExplorer}/tx/${txHash}`;
}

/**
 * Get the Polygonscan URL for the contract.
 */
export function getContractUrl(): string {
  return `${POLYGON_AMOY.blockExplorer}/address/${CONTRACT_ADDRESS}`;
}
