"""
Proof-of-Reality AI Forensic Engine
FastAPI microservice for digital content forensic analysis.
"""
import os
import uuid
import shutil
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from analyzers.video_analyzer import VideoAnalyzer
from analyzers.image_analyzer import ImageAnalyzer
from analyzers.audio_analyzer import AudioAnalyzer
from analyzers.metadata_analyzer import MetadataAnalyzer
from analyzers.score_engine import ScoreEngine
from utils.hash_utils import generate_sha256

# ──────────────────────────────────────────────
# App Configuration
# ──────────────────────────────────────────────

app = FastAPI(
    title="Proof-of-Reality AI Engine",
    description="AI Forensic Analysis Engine for digital content authenticity verification",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE_MB", "1000")) * 1024 * 1024

# File type categories
VIDEO_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".flv"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp", ".gif"}
AUDIO_EXTENSIONS = {".mp3", ".wav", ".aac", ".ogg", ".flac", ".m4a"}
ALLOWED_EXTENSIONS = VIDEO_EXTENSIONS | IMAGE_EXTENSIONS | AUDIO_EXTENSIONS | {".pdf"}


# ──────────────────────────────────────────────
# Response Models
# ──────────────────────────────────────────────

class AnalysisMetric(BaseModel):
    name: str
    score: float
    confidence: float
    details: str


class AnalysisResponse(BaseModel):
    success: bool
    file_name: str
    file_type: str
    file_size: int
    content_hash: str
    reality_score: float
    verdict: str
    verdict_label: str
    metrics: dict
    analysis_details: dict
    analysis_id: str


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str


# ──────────────────────────────────────────────
# Endpoints
# ──────────────────────────────────────────────

@app.get("/api/py/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        service="Proof-of-Reality AI Engine",
        version="1.0.0",
    )


@app.post("/api/py/analyze", response_model=AnalysisResponse)
async def analyze_content(file: UploadFile = File(...)):
    """
    Analyze uploaded digital content for authenticity.
    Accepts video, image, and audio files.
    Returns a Reality Score with detailed forensic breakdown.
    """
    # Validate file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file_ext}. Supported: {', '.join(sorted(ALLOWED_EXTENSIONS))}",
        )

    # Save file temporarily
    analysis_id = str(uuid.uuid4())[:8]
    temp_path = UPLOAD_DIR / f"{analysis_id}_{file.filename}"

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        file_size = temp_path.stat().st_size
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB",
            )

        # Generate SHA-256 hash
        content_hash = generate_sha256(temp_path)

        # Determine file category
        if file_ext in VIDEO_EXTENSIONS:
            file_type = "video"
        elif file_ext in IMAGE_EXTENSIONS:
            file_type = "image"
        elif file_ext in AUDIO_EXTENSIONS:
            file_type = "audio"
        else:
            file_type = "document"

        # Run forensic analysis
        analysis_results = {}

        # Metadata analysis (runs for all file types)
        metadata_analyzer = MetadataAnalyzer()
        metadata_result = metadata_analyzer.analyze(str(temp_path), file_type)
        analysis_results["metadata"] = metadata_result

        # Type-specific analysis
        if file_type == "video":
            video_analyzer = VideoAnalyzer()
            video_result = video_analyzer.analyze(str(temp_path))
            analysis_results["video"] = video_result

            audio_analyzer = AudioAnalyzer()
            audio_result = audio_analyzer.analyze(str(temp_path))
            analysis_results["audio"] = audio_result

        elif file_type == "image":
            image_analyzer = ImageAnalyzer()
            image_result = image_analyzer.analyze(str(temp_path))
            analysis_results["image"] = image_result

        elif file_type == "audio":
            audio_analyzer = AudioAnalyzer()
            audio_result = audio_analyzer.analyze(str(temp_path))
            analysis_results["audio"] = audio_result

        # Calculate Reality Score
        score_engine = ScoreEngine()
        reality_score, verdict, verdict_label, metrics = score_engine.calculate(
            analysis_results, file_type
        )

        return AnalysisResponse(
            success=True,
            file_name=file.filename,
            file_type=file_type,
            file_size=file_size,
            content_hash=content_hash,
            reality_score=reality_score,
            verdict=verdict,
            verdict_label=verdict_label,
            metrics=metrics,
            analysis_details=analysis_results,
            analysis_id=analysis_id,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
    finally:
        # Clean up temp file
        if temp_path.exists():
            temp_path.unlink()


# ──────────────────────────────────────────────
# Run
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "index:app",
        host=os.getenv("AI_ENGINE_HOST", "0.0.0.0"),
        port=int(os.getenv("AI_ENGINE_PORT", "8000")),
        reload=True,
    )
