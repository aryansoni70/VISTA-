import { NextRequest, NextResponse } from "next/server";
import { getVerificationByVerificationId } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing verification ID" },
        { status: 400 }
      );
    }

    const verification = await getVerificationByVerificationId(id);

    if (!verification) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(verification);
  } catch (error) {
    console.error("Certificate error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve certificate" },
      { status: 500 }
    );
  }
}
