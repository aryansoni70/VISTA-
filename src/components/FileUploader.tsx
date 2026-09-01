/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useState } from "react";
import { formatFileSize } from "@/lib/types";



const ACCEPTED_EXTENSIONS = ".mp4,.mov,.avi,.webm,.mkv,.jpg,.jpeg,.png,.webp,.gif,.bmp,.mp3,.wav,.ogg,.flac,.pdf";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isUploading?: boolean;
}

export default function FileUploader({ onFileSelected, isUploading = false }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setSelectedFile(file);

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }

      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const getFileIcon = (type: string) => {
    if (type.startsWith("video/")) return "🎬";
    if (type.startsWith("image/")) return "🖼️";
    if (type.startsWith("audio/")) return "🎵";
    if (type === "application/pdf") return "📄";
    return "📁";
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-[#0F7642] bg-[#0F7642]/5 scale-[1.02]"
            : selectedFile
            ? "border-purple-500/30 bg-purple-50"
            : "border-gray-300 bg-white hover:border-[#0F7642]/40 hover:bg-gray-50"
        } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleChange}
          disabled={isUploading}
        />

        {selectedFile ? (
          <div className="flex flex-col items-center gap-4 p-6">
            {preview ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl border border-gray-200 shadow-sm">
                {getFileIcon(selectedFile.type)}
              </div>
            )}
            <div className="text-center">
              <p className="text-gray-900 font-bold truncate max-w-xs">{selectedFile.name}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">
                {formatFileSize(selectedFile.size)} • {selectedFile.type || "Unknown type"}
              </p>
            </div>
            {!isUploading && (
              <p className="text-xs text-gray-400 font-semibold">Click or drag to replace</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F4EA] border border-[#0F7642]/20 shadow-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F7642]">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-gray-900 font-bold">
                Drop your file here, or{" "}
                <span className="text-[#0F7642] underline underline-offset-2">browse</span>
              </p>
              <p className="text-sm text-gray-500 font-medium mt-2">
                Video, Image, Audio, or PDF — up to 1GB
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["MP4", "MOV", "JPG", "PNG", "WAV", "MP3", "PDF"].map((ext) => (
                <span
                  key={ext}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-500 border border-gray-200 font-bold"
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Upload spinner overlay */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm z-10 border border-[#0F7642]/20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-[#0F7642]/30 border-t-[#0F7642] animate-spin" />
              <p className="text-sm text-[#0F7642] font-bold tracking-wide">Uploading & analyzing...</p>
            </div>
          </div>
        )}
      </label>
    </div>
  );
}
