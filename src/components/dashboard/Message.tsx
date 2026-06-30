"use client";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function Message({
  role,
  content,
}: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isUser
            ? `
              max-w-[68%]
              rounded-[22px]
              bg-[#1F1F1F]
              px-5
              py-3.5
              text-white
              shadow-sm
            `
            : `
              max-w-[85%]
              rounded-2xl
              border
              border-[#ECECEC]
              bg-white
              px-5
              py-4
              shadow-sm
            `
        }`}
      >
        <p
          className="
            whitespace-pre-wrap
            break-words
            text-[15px]
            leading-7
            text-[#1F1F1F]
          "
          style={{
            color: isUser ? "#ffffff" : "#1F1F1F",
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}