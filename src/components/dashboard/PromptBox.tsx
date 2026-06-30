"use client";

import { extractText } from "../../services/extractText";
import { useRef, useState } from "react";
import FileUpload from "./FileUpload";
import {
  ArrowUp,
  Globe,
  Sparkles,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";

interface PromptBoxProps {
  onSend: (prompt: string) => Promise<void> | void;
  isChat?: boolean;
}

export default function PromptBox({
  onSend,
  isChat = false,
}: PromptBoxProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

 async function handleSend() {
  const value = prompt.trim();

  if ((!value && files.length === 0) || loading) return;

  try {
    setLoading(true);

    let extractedText = "";

    if (files.length > 0) {
      extractedText = await extractText(files);
    }

    const finalPrompt =
      extractedText.length > 0
        ? `Uploaded Content:

${extractedText}

----------------------------------------

User Prompt:

${value || "Analyze the uploaded file."}`
        : value;

    await onSend(finalPrompt);

    setPrompt("");
    setFiles([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  } catch (error) {
    console.error(error);
    alert("Failed to process uploaded files.");
  } finally {
    setLoading(false);
  }
}

  function handleInput(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setPrompt(e.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "44px";

    textarea.style.height =
      Math.min(textarea.scrollHeight, 160) + "px";
  }

  return (
    <div
      className={`mx-auto w-full transition-all duration-300 ${
        isChat ? "max-w-5xl" : "max-w-4xl"
      }`}
    >
      <div
        className={`
          rounded-[28px]
          border
          border-[#E8E8E8]
          bg-white
          shadow-sm
          transition-all
          duration-300
          ${isChat ? "p-3" : "p-5"}
        `}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={prompt}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask AstraAI anything..."
          className="
            min-h-[44px]
            max-h-[160px]
            w-full
            resize-none
            overflow-y-auto
            bg-transparent
            text-[16px]
            leading-6
            text-[#1F1F1F]
            placeholder:text-[#9CA3AF]
            outline-none
          "
        />
      {files.length > 0 && (
  <div className="mt-3 flex flex-wrap gap-2">

    {files.map((file, index) => {
      const isPdf = file.type === "application/pdf";

      return (
        <div
          key={index}
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#E6E6E6]
            bg-[#F8F8F8]
            px-3
            py-2
            text-sm
          "
        >
          {isPdf ? (
            <FileText
              size={16}
              className="text-red-500"
            />
          ) : (
            <ImageIcon
              size={16}
              className="text-blue-500"
            />
          )}

          <span className="max-w-[170px] truncate">
            {file.name}
          </span>

          <button
            onClick={() =>
              setFiles((prev) =>
                prev.filter((_, i) => i !== index)
              )
            }
            className="
              rounded-full
              p-1
              transition
              hover:bg-red-100
            "
          >
            <X
              size={14}
              className="text-red-500"
            />
          </button>
        </div>
      );
    })}

  </div>
)}  
{/*Bottom toolbar*/}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">

            <FileUpload files={files} setFiles={setFiles} />

            <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-100">
              <Globe size={16} />
              Web
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-100">
              <Sparkles size={16} />
              AI
            </button>

          </div>

          <button
            onClick={handleSend}
            disabled={(!prompt.trim() && files.length === 0) || loading}
            className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition-all
              ${
                prompt.trim() && !loading
                  ? "bg-[#1F1F1F] text-white hover:scale-105"
                  : "cursor-not-allowed bg-gray-300"
              }
            `}
          >
            <ArrowUp
              size={20}
              strokeWidth={3}
              className="text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
}