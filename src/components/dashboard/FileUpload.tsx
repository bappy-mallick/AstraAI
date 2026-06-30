"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";

interface FileUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const MAX_FILES = 10;

export default function FileUpload({
  files,
  setFiles,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);

    const validFiles = selected.filter((file) =>
      ALLOWED_TYPES.includes(file.type)
    );

    if (validFiles.length !== selected.length) {
      alert(
        "Only PDF, JPG, JPEG, PNG and WEBP files are allowed."
      );
    }

    const updated = [...files, ...validFiles];

    if (updated.length > MAX_FILES) {
      alert("Maximum 10 files allowed.");
      return;
    }

    setFiles(updated);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        onChange={handleFiles}
      />

      <button
        onClick={openPicker}
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-100"
      >
        <Paperclip size={16} />
        Add Files
      </button>
    </>
  );
}