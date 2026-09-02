import { NextRequest, NextResponse } from "next/server";
import {
  getVerificationByVerificationId,
  getAllVerifications,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const hash = searchParams.get("hash");
    const list = searchParams.get("list");

    // List all verifications
    if (list === "true") {
      const verifications = await getAllVerifications(50);
      return NextResponse.json({
        success: true,
        verifications,
        count: verifications.length,
      });
    }

    // Look up specific verification
    if (!id) {
      return NextResponse.json(
        { error: "Missing verification ID" },
        { status: 400 }
      );
    }

    const verification = await getVerificationByVerificationId(id);

    if (!verification) {
      return NextResponse.json({
        found: false,
        verification: null,
      });
    }

    // Check hash match if provided
    let hashMatch: boolean | undefined;
    if (hash) {
      hashMatch = hash.toLowerCase() === verification.content_hash.toLowerCase();
    }

    return NextResponse.json({
      found: true,
      verification,
      hashMatch,
      blockchain_verified: !!verification.blockchain_tx_hash,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Verification lookup failed" },
      { status: 500 }
    );
  }
}
