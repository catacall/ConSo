"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { useFileContext } from "@/context/FileContext";
import { useToast } from "@/context/ToastContext";
import { ArrowUpTrayIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedButton from "@/components/Animatedbutton";
import { FcImageFile, FcDocument, FcSettings, FcSignature } from "react-icons/fc";

interface FileUploaderProps {
  onUploadSuccess?: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const router = useRouter();
  const { addFile } = useFileContext();
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [lastUploadedType, setLastUploadedType] = useState<"image" | "document" | null>(null);

  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length) {
      await handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    setIsUploading(true);
    setUploadError("");
    setUploadedCount(0);
    setShowPopup(false);
    let successCount = 0;
    const errors: string[] = [];
    let hasImage = false;
    let hasDoc = false;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!acceptedFileTypes.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type`);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name}: File too large (max 10MB)`);
        continue;
      }

      if (file.type.startsWith("image/")) hasImage = true;
      else hasDoc = true;

      try {
        const objectUrl = URL.createObjectURL(file);
        addFile({
          id: `${Date.now()}-${i}`,
          name: file.name,
          type: file.type,
          size: file.size,
          url: objectUrl,
          dateAdded: new Date().toISOString(),
          processed: false,
          isSignature: false,
          blob: file,
        });

        successCount++;
        setUploadedCount(successCount);
      } catch (error) {
        console.error("Error processing file:", error);
        errors.push(`${file.name}: Failed to process`);
      }
    }

    if (successCount > 0) {
      showToast(`Uploaded ${successCount} file${successCount > 1 ? "s" : ""}`, "success");
      setLastUploadedType(hasImage ? "image" : "document");
      setShowPopup(true);
      if (onUploadSuccess) onUploadSuccess();
    }
    if (errors.length > 0) {
      showToast("Some files failed to upload. Check details below.", "error");
      setUploadError(errors.join("\n"));
    }

    setIsUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full bg-canvas rounded-lg p-6 shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a] border border-hairline">
      <div
        className={`border border-dashed rounded-lg p-8 transition-colors duration-200 flex flex-col items-center justify-center bg-canvas-soft ${
          dragActive ? "border-primary bg-canvas" : "border-hairline-strong"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <ArrowUpTrayIcon className={`w-12 h-12 mb-4 ${dragActive ? "text-primary" : "text-mute"}`} />
        <p className="mb-2 text-ink text-center font-medium">
          Drag and drop your files here
        </p>
        <p className="text-sm text-mute mb-4 text-center">Max 10 MB per file.</p>
        <AnimatedButton
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 font-medium text-sm transition-opacity disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Select Files"}
        </AnimatedButton>
        <input
          ref={inputRef}
          onChange={handleChange}
          type="file"
          multiple
          accept={acceptedFileTypes.join(",")}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="mt-4 p-3 bg-canvas-soft-2 rounded-md flex items-center border border-hairline">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ink mr-3"></div>
          <p className="text-sm text-ink">Uploading files... ({uploadedCount} uploaded)</p>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 p-3 bg-error-soft border border-error-deep rounded-md">
          <p className="text-sm text-error-deep font-medium mb-1">Upload errors:</p>
          <pre className="text-xs text-error-deep whitespace-pre-wrap">{uploadError}</pre>
        </div>
      )}

      {/* Success Modal / Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-canvas w-full max-w-md rounded-lg shadow-[0px_1px_1px_#00000005,0px_8px_16px_-4px_#0000000a,0px_24px_32px_-8px_#0000000f] border border-hairline p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-mute hover:text-ink transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-5">
              <CheckCircleIcon className="w-6 h-6 text-success" />
              <h3 className="text-lg font-semibold text-ink">Upload Successful</h3>
            </div>
            
            <p className="text-sm text-body mb-5">
              What would you like to do with your {lastUploadedType === "image" ? "images" : "documents"}?
            </p>
            
            <div className="space-y-2">
              {lastUploadedType === "image" ? (
                <>
                  <button onClick={() => router.push("/background-remover")} className="w-full flex items-center gap-3 p-3 text-left rounded-md hover:bg-canvas-soft border border-transparent hover:border-hairline transition-all">
                    <FcImageFile className="w-6 h-6" />
                    <span className="text-sm font-medium text-ink">Remove Background</span>
                  </button>
                  <button onClick={() => router.push("/image-compressor")} className="w-full flex items-center gap-3 p-3 text-left rounded-md hover:bg-canvas-soft border border-transparent hover:border-hairline transition-all">
                    <FcSettings className="w-6 h-6" />
                    <span className="text-sm font-medium text-ink">Compress Image</span>
                  </button>
                  <button onClick={() => router.push("/image-to-pdf")} className="w-full flex items-center gap-3 p-3 text-left rounded-md hover:bg-canvas-soft border border-transparent hover:border-hairline transition-all">
                    <FcDocument className="w-6 h-6" />
                    <span className="text-sm font-medium text-ink">Convert to PDF</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => router.push("/pdf-compress")} className="w-full flex items-center gap-3 p-3 text-left rounded-md hover:bg-canvas-soft border border-transparent hover:border-hairline transition-all">
                    <FcSettings className="w-6 h-6" />
                    <span className="text-sm font-medium text-ink">Compress PDF</span>
                  </button>
                  <button onClick={() => router.push("/pdf-to-word")} className="w-full flex items-center gap-3 p-3 text-left rounded-md hover:bg-canvas-soft border border-transparent hover:border-hairline transition-all">
                    <FcDocument className="w-6 h-6" />
                    <span className="text-sm font-medium text-ink">Convert to Word</span>
                  </button>
                  <button onClick={() => router.push("/signature")} className="w-full flex items-center gap-3 p-3 text-left rounded-md hover:bg-canvas-soft border border-transparent hover:border-hairline transition-all">
                    <FcSignature className="w-6 h-6" />
                    <span className="text-sm font-medium text-ink">Sign Document</span>
                  </button>
                </>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-hairline">
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full py-2.5 bg-canvas-soft hover:bg-hairline text-ink text-sm font-medium rounded-full transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
