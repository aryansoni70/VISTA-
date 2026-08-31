"""
SHA-256 hashing utilities for content fingerprinting.
"""
import hashlib
from pathlib import Path


def generate_sha256(file_path: str | Path, chunk_size: int = 8192) -> str:
    """
    Generate a SHA-256 hash of a file.
    Processes the file in chunks to handle large files efficiently.
    
    Args:
        file_path: Path to the file to hash.
        chunk_size: Size of each chunk to read (default 8KB).
        
    Returns:
        Hexadecimal SHA-256 hash string.
    """
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            sha256_hash.update(chunk)
    return sha256_hash.hexdigest()
