"""
Media processing utilities using FFmpeg/ffprobe.
Handles frame extraction, audio extraction, and media metadata probing.
"""
import subprocess
import json
import os
from pathlib import Path
from typing import Optional


def probe_media(file_path: str) -> Optional[dict]:
    """
    Use ffprobe to extract technical metadata from a media file.
    
    Args:
        file_path: Path to the media file.
        
    Returns:
        Dictionary with ffprobe output, or None if ffprobe fails.
    """
    try:
        result = subprocess.run(
            [
                "ffprobe",
                "-v", "quiet",
                "-print_format", "json",
                "-show_format",
                "-show_streams",
                file_path,
            ],
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode == 0:
            return json.loads(result.stdout)
        return None
    except (subprocess.TimeoutExpired, FileNotFoundError, json.JSONDecodeError):
        return None


def extract_frames(file_path: str, output_dir: str, max_frames: int = 10) -> list[str]:
    """
    Extract keyframes from a video file using FFmpeg.
    
    Args:
        file_path: Path to the video file.
        output_dir: Directory to save extracted frames.
        max_frames: Maximum number of frames to extract.
        
    Returns:
        List of paths to extracted frame images.
    """
    os.makedirs(output_dir, exist_ok=True)
    output_pattern = os.path.join(output_dir, "frame_%04d.jpg")

    try:
        subprocess.run(
            [
                "ffmpeg",
                "-i", file_path,
                "-vf", f"select='eq(pict_type\\,I)',setpts=N/FRAME_RATE/TB",
                "-frames:v", str(max_frames),
                "-q:v", "2",
                "-y",
                output_pattern,
            ],
            capture_output=True,
            text=True,
            timeout=60,
        )
    except (subprocess.TimeoutExpired, FileNotFoundError):
        # FFmpeg not available or timed out — return empty
        return []

    # Collect extracted frames
    frames = sorted(Path(output_dir).glob("frame_*.jpg"))
    return [str(f) for f in frames]


def extract_audio(file_path: str, output_path: str) -> Optional[str]:
    """
    Extract audio stream from a video file.
    
    Args:
        file_path: Path to the video file.
        output_path: Path to save the extracted audio.
        
    Returns:
        Path to extracted audio file, or None if extraction fails.
    """
    try:
        result = subprocess.run(
            [
                "ffmpeg",
                "-i", file_path,
                "-vn",
                "-acodec", "pcm_s16le",
                "-ar", "44100",
                "-ac", "1",
                "-y",
                output_path,
            ],
            capture_output=True,
            text=True,
            timeout=60,
        )
        if result.returncode == 0 and os.path.exists(output_path):
            return output_path
        return None
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return None


def get_video_duration(file_path: str) -> Optional[float]:
    """Get video duration in seconds."""
    probe = probe_media(file_path)
    if probe and "format" in probe:
        try:
            return float(probe["format"].get("duration", 0))
        except (ValueError, TypeError):
            return None
    return None


def get_video_resolution(file_path: str) -> Optional[tuple[int, int]]:
    """Get video resolution (width, height)."""
    probe = probe_media(file_path)
    if probe and "streams" in probe:
        for stream in probe["streams"]:
            if stream.get("codec_type") == "video":
                width = stream.get("width")
                height = stream.get("height")
                if width and height:
                    return (int(width), int(height))
    return None
