"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Message from "./Message";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatAreaProps {
  messages: ChatMessage[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    if (distanceFromBottom < 150) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      setShowScrollButton(true);
    }
  }, [messages]);

  function handleScroll() {
    const container = containerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setShowScrollButton(distanceFromBottom > 150);
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    setShowScrollButton(false);
  }

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="relative h-full">

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scroll-smooth"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-8 pt-8 pb-8">

          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}

          <div ref={bottomRef} />

        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#1F1F1F] p-3 text-white shadow-xl transition hover:scale-105"
        >
          <ArrowDown size={18} />
        </button>
      )}

    </div>
  );
}