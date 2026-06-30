"use client";

import { motion } from "framer-motion";
import { useEffect,useState } from "react";
import { signIn } from "@/services/auth";
import { generateContent } from "@/services/generate";

import Sidebar from "@/components/layouts/Sidebar";
import Hero from "@/components/dashboard/Hero";
import PromptBox from "@/components/dashboard/PromptBox";
import ChatArea from "@/components/dashboard/ChatArea";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
interface ChatHistory {
  id: number;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [templatePrompt, setTemplatePrompt] = useState("");
  useEffect(() => {
  const saved = localStorage.getItem("astra-history");

  if (!saved) return;

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  const chats: ChatHistory[] = JSON.parse(saved);

  const validChats = chats.filter(
    (chat) => Date.now() - chat.createdAt < THIRTY_DAYS
  );

  setHistory(validChats);

  localStorage.setItem(
    "astra-history",
    JSON.stringify(validChats)
  );
}, []);

useEffect(() => {
  localStorage.setItem(
    "astra-history",
    JSON.stringify(history)
  );
}, [history]);
  async function handleSend(userPrompt: string) {
    if (!userPrompt.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    try {
      const response = await generateContent({
        content: userPrompt,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.result,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "AI service is temporarily unavailable. Please try again in a few moments.",
        },
      ]);
    }
  }
 
function handleNewChat() {
  if (messages.length > 0) {
    const newChat: ChatHistory = {
      id: Date.now(),
      title:
        messages[0].content.length > 40
          ? messages[0].content.slice(0, 40) + "..."
          : messages[0].content,
      messages,
      createdAt: Date.now(),
    };

    setHistory((prev) => {
      const alreadyExists = prev.some(
        (chat) =>
          JSON.stringify(chat.messages) ===
          JSON.stringify(messages)
      );

      if (alreadyExists) return prev;

      return [newChat, ...prev];
    });
  }

  setMessages([]);
}

function openChat(id: number) {
  const chat = history.find((item) => item.id === id);

  if (!chat) return;

  setMessages(chat.messages);
}
function renameChat(id: number, title: string) {
  setHistory((prev) =>
    prev.map((chat) =>
      chat.id === id
        ? {
            ...chat,
            title,
          }
        : chat
    )
  );
}
function deleteChat(id: number) {
  setHistory((prev) => prev.filter((chat) => chat.id !== id));

  // If the currently opened chat is deleted,
  // return to landing page.
  const current = history.find((chat) => chat.id === id);

  if (
    current &&
    JSON.stringify(current.messages) === JSON.stringify(messages)
  ) {
    setMessages([]);
  }
}

  return (
    <main className="h-screen bg-[#ECECEC] p-4">
      <div className="mx-auto flex h-full max-w-[1700px] gap-5">

        {/* Sidebar */}
        <Sidebar
  onNewChat={handleNewChat}
  history={history}
  onOpenChat={openChat}
  onDeleteChat={deleteChat}
  onRenameChat={renameChat}
/>
        {/* Main */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="relative flex flex-1 flex-col overflow-hidden rounded-[34px] bg-[#F4F4F2] shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
        >

          {/* Sign In only on landing */}
          {messages.length === 0 && (
            <div className="absolute right-8 top-8 z-20">
              <button
                onClick={async () => {
                  try {
                    await signIn();
                  } catch (error) {
                    console.error(error);
                  }
                }}
                className="rounded-2xl bg-[#1F1F1F] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-black"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Landing */}
          {messages.length === 0 ? (
            <>
              <div className="flex flex-1 items-center justify-center">
                <Hero />
              </div>

              <div className="px-10 pb-8">
                <PromptBox
                  onSend={handleSend}
                />
              </div>
            </>
          ) : (
            /* Chat Layout */
            <div className="flex h-full min-h-0 flex-col">

              {/* Scrollable Chat */}
              <div className="flex-1 min-h-0">
                <ChatArea
                  messages={messages}
                />
              </div>

              {/* Fixed Prompt */}
              <div className="shrink-0 border-t border-[#E8E8E8] bg-[#F4F4F2] px-8 py-4">
                <PromptBox
                  onSend={handleSend}
                  isChat
                />
              </div>

            </div>
          )}

        </motion.section>

      </div>
    </main>
  );
}