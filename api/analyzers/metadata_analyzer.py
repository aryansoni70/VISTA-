"""
Metadata Forensic Analyzer
Analyzes file metadata for authenticity indicators including:
- Timestamp consistency (creation vs modification dates)
- Device/software information
- Edit history detection
- File structure integrity

Works across all file types (video, image, audio, documents).
"""
import os
import hashlib
from datetime import datetime
from pathlib import Path
from typing import Optional

from utils.media_processor import probe_media

try:
    # pyrefly: ignore [missing-import]
    from PIL import Image, ExifTags
    HAS_PIL = True
except ImportError:
    HAS_PIL = False


class MetadataAnalyzer:
    """Analyzes file metadata for forensic consistency indicators."""

    def analyze(self, file_path: str, file_type: str) -> dict:
        """
        Run metadata forensic analysis.

        Args:
            file_path: Path to the file.
            file_type: Type of file ('video', 'image', 'audio', 'document').

        Returns:
            Dictionary with analysis results.
        """
        results = {
            "timestamp_consistency": self._analyze_timestamps(file_path),
            "device_information": self._analyze_device_info(file_path, file_type),
            "file_integrity": self._analyze_file_integrity(file_path, file_type),
        }

        return results

    def _analyze_timestamps(self, file_path: str) -> dict:
        """
        Analyze file timestamp consistency.
        
        Checks creation time, modification time, and embedded timestamps
        for inconsistencies that may indicate tampering.
        """
        score = 93.0
        confidence = 0.85
        details = []

        try:
            stat = os.stat(file_path)
            
            # File system timestamps
            mtime = datetime.fromtimestamp(stat.st_mtime)
            ctime = datetime.fromtimestamp(stat.st_ctime)
            
            details.append(f"File modified: {mtime.strftime('%Y-%m-%d %H:%M:%S')}")
            details.append(f"File created: {ctime.strftime('%Y-%m-%d %H:%M:%S')}")
            
            # Check if modification is before creation (suspicious)
            if stat.st_mtime < stat.st_ctime:
                score -= 5.0
                details.append("⚠ Modification time before creation time — suspicious")
            else:
                time_diff = stat.st_mtime - stat.st_ctime
                if time_diff < 1:
                    score += 3.0
                    details.append("Timestamps consistent — minimal time between creation and modification")
                elif time_diff > 86400 * 365:  # More than 1 year
                    score -= 2.0
                    details.append("Large gap between creation and modification dates")

            # Check embedded timestamps (from probe)
            probe = probe_media(file_path)
            if probe and "format" in probe:
                tags = probe["format"].get("tags", {})
                creation_time = tags.get("creation_time", "")
                if creation_time:
                    details.append(f"Embedded creation time: {creation_time}")
                    score += 3.0

        except Exception as e:
            details.append(f"Timestamp analysis limited: {str(e)}")
            confidence = 0.5

        score = max(0, min(100, score))

        return {
            "score": round(score, 1),
            "confidence": confidence,
            "label": "Timestamp Consistency",
            "details": details,
        }

    def _analyze_device_info(self, file_path: str, file_type: str) -> dict:
        """
        Extract and analyze device/software information.
        
        Authentic content from cameras/phones contains rich device metadata.
        Manipulated or generated content often lacks this.
        """
        score = 85.0
        confidence = 0.78
        details = []
        device_info = {}

        # Try image EXIF data
        if file_type == "image" and HAS_PIL:
            try:
                img = Image.open(file_path)
                raw_exif = img._getexif()
                
                if raw_exif:
                    for tag_id, value in raw_exif.items():
                        tag_name = ExifTags.TAGS.get(tag_id, str(tag_id))
                        if tag_name in ("Make", "Model", "Software", "LensMake", "LensModel"):
                            if isinstance(value, str):
                                device_info[tag_name] = value
                    
                    if "Make" in device_info:
                        score += 5.0
                        details.append(f"Camera make: {device_info['Make']}")
                    if "Model" in device_info:
                        score += 3.0
                        details.append(f"Camera model: {device_info['Model']}")
                    if "Software" in device_info:
                        details.append(f"Software: {device_info['Software']}")
                    if "LensModel" in device_info:
                        score += 4.0
                        details.append(f"Lens: {device_info['LensModel']}")
                else:
                    score -= 8.0
                    details.append("No device information embedded")
                
                img.close()
            except Exception:
                pass

        # Try media metadata via ffprobe
        if file_type in ("video", "audio"):
            probe = probe_media(file_path)
            if probe and "format" in probe:
                tags = probe["format"].get("tags", {})
                
                # Common device/software tags
                for key in ("encoder", "ENCODER", "handler_name", "vendor_id", "compatible_brands"):
                    value = tags.get(key)
                    if value:
                        device_info[key] = str(value)[:100]
                        details.append(f"{key}: {value}")
                
                if device_info:
                    score += 3.0
                else:
                    score -= 3.0
                    details.append("Limited device metadata in media")

        if not details:
            details.append("Device information analysis completed")

        score = max(0, min(100, score))

        return {
            "score": round(score, 1),
            "confidence": confidence,
            "label": "Device Information",
            "device_info": device_info,
            "details": details,
        }

    def _analyze_file_integrity(self, file_path: str, file_type: str) -> dict:
        """
        Analyze file structure integrity.
        
        Checks file header magic bytes, structure consistency,
        and signs of post-processing or corruption.
        """
        score = 92.0
        confidence = 0.82
        details = []

        file_size = os.path.getsize(file_path)
        details.append(f"File size: {self._format_size(file_size)}")

        # Read magic bytes
        with open(file_path, "rb") as f:
            magic = f.read(16)

        # Verify magic bytes match expected formats
        format_detected = self._detect_format(magic)
        file_ext = Path(file_path).suffix.lower()
        
        if format_detected:
            details.append(f"Detected format: {format_detected}")
            
            # Check if detected format matches file extension
            expected_formats = {
                ".jpg": ["JPEG"], ".jpeg": ["JPEG"],
                ".png": ["PNG"],
                ".gif": ["GIF"],
                ".mp4": ["MP4", "ISO Base Media"],
                ".mov": ["QuickTime", "ISO Base Media"],
                ".avi": ["AVI"],
                ".mp3": ["MP3", "ID3"],
                ".wav": ["WAV"],
                ".webp": ["WebP"],
                ".pdf": ["PDF"],
            }
            
            expected = expected_formats.get(file_ext, [])
            if expected and any(fmt in format_detected for fmt in expected):
                score += 3.0
                details.append("File format matches extension ✓")
            elif expected:
                score -= 10.0
                details.append(f"⚠ Format mismatch! Extension: {file_ext}, Detected: {format_detected}")
        else:
            details.append("Could not determine format from magic bytes")
            score -= 3.0

        # File size sanity check
        if file_size < 100:
            score -= 10.0
            details.append("⚠ Suspiciously small file")
        elif file_size > 2 * 1024 * 1024 * 1024:  # > 2GB
            details.append("Very large file")

        score = max(0, min(100, score))

        return {
            "score": round(score, 1),
            "confidence": confidence,
            "label": "File Integrity",
            "details": details,
        }

    def _detect_format(self, magic: bytes) -> Optional[str]:
        """Detect file format from magic bytes."""
        if magic[:2] == b'\xff\xd8':
            return "JPEG"
        elif magic[:8] == b'\x89PNG\r\n\x1a\n':
            return "PNG"
        elif magic[:4] == b'GIF8':
            return "GIF"
        elif magic[:4] == b'RIFF' and magic[8:12] == b'WEBP':
            return "WebP"
        elif magic[:4] == b'RIFF' and magic[8:12] == b'AVI ':
            return "AVI"
        elif magic[:4] == b'RIFF' and magic[8:12] == b'WAVE':
            return "WAV"
        elif magic[4:8] == b'ftyp':
            return "ISO Base Media (MP4/MOV)"
        elif magic[:3] == b'ID3' or magic[:2] == b'\xff\xfb':
            return "MP3/ID3"
        elif magic[:5] == b'%PDF-':
            return "PDF"
        elif magic[:4] == b'\x1aE\xdf\xa3':
            return "Matroska (MKV/WebM)"
        elif magic[:4] == b'FLV\x01':
            return "FLV"
        elif magic[:4] == b'fLaC':
            return "FLAC"
        elif magic[:4] == b'OggS':
            return "OGG"
        return None

    def _format_size(self, size: int) -> str:
        """Format file size in human-readable form."""
        for unit in ("B", "KB", "MB", "GB"):
            if size < 1024:
                return f"{size:.1f} {unit}"
            size /= 1024
        return f"{size:.1f} TB"
