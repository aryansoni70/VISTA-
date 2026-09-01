import { NextRequest, NextResponse } from "next/server";
import { createVerification } from "@/lib/db";
import { generateVerificationId } from "@/lib/types";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Upload directory
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

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

    // Validate file size (1000MB max)
    if (file.size > 1000 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 1000MB" },
        { status: 413 }
      );
    }

    // Create uploads directory
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate SHA-256 hash
    const hash = crypto.createHash("sha256");
    hash.update(buffer);
    const contentHash = hash.digest("hex");

    // Determine file type
    const ext = path.extname(file.name).toLowerCase();
    const videoExts = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    const imageExts = [".jpg", ".jpeg", ".png", ".bmp", ".webp", ".gif"];
    const audioExts = [".mp3", ".wav", ".ogg", ".flac", ".m4a"];

    let fileType = "document";
    if (videoExts.includes(ext)) fileType = "video";
    else if (imageExts.includes(ext)) fileType = "image";
    else if (audioExts.includes(ext)) fileType = "audio";

    // Generate verification ID
    const verificationId = generateVerificationId();

    // Save file temporarily for AI analysis
    const tempFilePath = path.join(UPLOAD_DIR, `${verificationId}_${file.name}`);
    fs.writeFileSync(tempFilePath, buffer);

    // Create DB record
    createVerification({
      verification_id: verificationId,
      content_hash: contentHash,
      file_name: file.name,
      file_type: fileType,
      file_size: file.size,
    });

    return NextResponse.json({
      success: true,
      verification_id: verificationId,
      content_hash: contentHash,
      file_name: file.name,
      file_type: fileType,
      file_size: file.size,
      temp_file_path: tempFilePath,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
