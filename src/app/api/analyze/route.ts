import { NextRequest, NextResponse } from "next/server";
import {
  getVerificationByVerificationId,
  updateVerificationAnalysis,
} from "@/lib/db";

// AI Engine URL — points to external Python service (Railway/Render)
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:8000";

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

    // Get verification record from database
    const verification = await getVerificationByVerificationId(verification_id);
    if (!verification) {
      return NextResponse.json(
        { error: "Verification not found" },
        { status: 404 }
      );
    }

    // Require a file_url (uploaded via Vercel Blob)
    if (!verification.file_url) {
      return NextResponse.json(
        { error: "No file URL found for this verification. The file may not have been uploaded correctly." },
        { status: 400 }
      );
    }

    let analysisResult;

    try {
      // Call the Python AI engine with the blob URL
      const aiResponse = await fetch(`${AI_ENGINE_URL}/py/analyze-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_url: verification.file_url,
          file_name: verification.file_name,
        }),
        signal: AbortSignal.timeout(120000), // 2 minute timeout for AI analysis
      });

      if (!aiResponse.ok) {
        const errorBody = await aiResponse.text();
        console.error("AI Engine error:", aiResponse.status, errorBody);
        return NextResponse.json(
          {
            error: `AI analysis failed (HTTP ${aiResponse.status}). Please ensure the AI engine is running and accessible.`,
            details: errorBody,
          },
          { status: 502 }
        );
      }

      analysisResult = await aiResponse.json();
    } catch (aiError) {
      // AI engine not available — return a real error, not fake results
      console.error("AI Engine connection error:", aiError);
      return NextResponse.json(
        {
          error: "Could not connect to the AI forensic engine. Please ensure the AI engine is deployed and AI_ENGINE_URL is configured correctly.",
          ai_engine_url: AI_ENGINE_URL,
        },
        { status: 503 }
      );
    }

    // Update DB with real analysis results
    await updateVerificationAnalysis(verification_id, {
      reality_score: analysisResult.reality_score,
      verdict: analysisResult.verdict,
      verdict_label: analysisResult.verdict_label,
      analysis_results: JSON.stringify(analysisResult),
    });

    return NextResponse.json({
      success: true,
      verification_id,
      reality_score: analysisResult.reality_score,
      verdict: analysisResult.verdict,
      verdict_label: analysisResult.verdict_label,
      metrics: analysisResult.metrics,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
