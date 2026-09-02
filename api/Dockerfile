FROM python:3.11-slim

# Install system dependencies for media processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create temp upload directory
RUN mkdir -p /tmp/por_uploads

# Expose port (Railway/Render will set PORT env var)
EXPOSE 8000

# Start the server
CMD ["sh", "-c", "uvicorn index:app --host 0.0.0.0 --port ${PORT:-8000}"]
