"use client";

import { Button } from "@/components/ui/button";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MultipleImageUploaderProps {
  onFilesChange?: (files: File[], remainingInitialImages: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  initialImages?: string[];
}

export default function MultipleImageUploader({
  onFilesChange,
  maxFiles = 6,
  maxSizeMB = 3,
  initialImages = [],
}: MultipleImageUploaderProps) {
  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  const [currentInitialImages, setCurrentInitialImages] =
    useState(initialImages);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles: [],
  });

  const removeInitialImage = (index: number) => {
    setCurrentInitialImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Call onFilesChange when files change or initial images are removed
  useEffect(() => {
    const actualFiles = files
      .map((fileItem) => fileItem.file)
      .filter((file) => file instanceof File) as File[];
    onFilesChange?.(actualFiles, currentInitialImages);
  }, [files, currentInitialImages, onFilesChange]);

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-white/20 data-[dragging=true]:bg-white/10 has-[input:focus]:border-blue-500 has-[input:focus]:ring-blue-500/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] bg-white/5"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            className="bg-white/5 mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20"
            aria-hidden="true"
          >
            <ImageIcon className="size-4 opacity-60 text-white" />
          </div>
          <p className="mb-1.5 text-sm font-medium text-white">
            Drop your images here
          </p>
          <p className="text-white/70 text-xs">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB each)
          </p>
          <Button
            variant="outline"
            className="mt-4 border-white/20 bg-gray-700 text-white hover:bg-white/10 hover:text-white"
            onClick={openFileDialog}
            type="button"
          >
            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
            Select images
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-red-400 flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* Initial images list */}
      {currentInitialImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-white/70 text-sm font-medium">Current images:</p>
          {currentInitialImages.map((imageUrl, index) => (
            <div
              key={`initial-${index}`}
              className="bg-white/5 flex items-center justify-between gap-2 rounded-lg border border-white/10 p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-white/10 aspect-square shrink-0 rounded">
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    width={40}
                    height={40}
                    className="size-10 rounded-[inherit] object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium text-white">
                    Gallery image {index + 1}
                  </p>
                  <p className="text-white/50 text-xs">Current image</p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-white -me-2 size-8 hover:bg-white/10"
                onClick={() => removeInitialImage(index)}
                aria-label="Remove image"
                type="button"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* New files list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {currentInitialImages.length > 0 && (
            <p className="text-white/70 text-sm font-medium">
              New images to add:
            </p>
          )}
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white/5 flex items-center justify-between gap-2 rounded-lg border border-white/10 p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-white/10 aspect-square shrink-0 rounded">
                  <Image
                    src={file.preview || ""}
                    alt={file.file.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-[inherit] object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium text-white">
                    {file.file.name}
                  </p>
                  <p className="text-white/50 text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-white -me-2 size-8 hover:bg-white/10"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
                type="button"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files.length > 1 && (
            <div>
              <Button
                size="sm"
                variant="outline"
                onClick={clearFiles}
                className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                type="button"
              >
                Remove all new files
              </Button>
            </div>
          )}
        </div>
      )}

      <p
        aria-live="polite"
        role="region"
        className="text-white/50 mt-2 text-center text-xs"
      >
        {currentInitialImages.length + files.length} / {maxFiles} images total (
        {currentInitialImages.length} current, {files.length} new)
      </p>
    </div>
  );
}
