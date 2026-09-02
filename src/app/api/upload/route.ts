import { NextRequest, NextResponse } from "next/server";
import { createVerification } from "@/lib/db";
import { generateVerificationId } from "@/lib/types";
import crypto from "crypto";
import { put } from "@vercel/blob";

// Max file size: 50MB (Vercel Blob supports up to 500MB but we keep it reasonable)
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 50MB" },
        { status: 413 }
      );
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate SHA-256 hash
    const hash = crypto.createHash("sha256");
    hash.update(buffer);
    const contentHash = hash.digest("hex");

    // Determine file type
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const videoExts = ["mp4", "mov", "avi", "mkv", "webm"];
    const imageExts = ["jpg", "jpeg", "png", "bmp", "webp", "gif"];
    const audioExts = ["mp3", "wav", "ogg", "flac", "m4a"];

    let fileType = "document";
    if (videoExts.includes(ext)) fileType = "video";
    else if (imageExts.includes(ext)) fileType = "image";
    else if (audioExts.includes(ext)) fileType = "audio";

    // Generate verification ID
    const verificationId = generateVerificationId();

    // Upload to Vercel Blob (persistent cloud storage)
    const blob = await put(`uploads/${verificationId}_${file.name}`, buffer, {
      access: "public",
      contentType: file.type || "application/octet-stream",
    });

    // Create DB record with blob URL
    await createVerification({
      verification_id: verificationId,
      content_hash: contentHash,
      file_name: file.name,
      file_type: fileType,
      file_size: file.size,
      file_url: blob.url,
    });

    return NextResponse.json({
      success: true,
      verification_id: verificationId,
      content_hash: contentHash,
      file_name: file.name,
      file_type: fileType,
      file_size: file.size,
      file_url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
