"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  History,
  Link2,
  User,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

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

interface SidebarProps {
  onNewChat: () => void;
  history: ChatHistory[];
  onOpenChat: (id: number) => void;
  onDeleteChat: (id: number) => void;
  onRenameChat: (id: number, title: string) => void;
}

export default function Sidebar({
  onNewChat,
  history,
  onOpenChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps) {
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredHistory = useMemo(() => {
    if (!searchText.trim()) return history;

    return history.filter((chat) =>
      chat.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [history, searchText]);

  return (
    <aside className="flex h-full w-[290px] flex-col rounded-[32px] bg-[#F5F2EE] p-6">

      {/* Logo */}

      <div className="flex flex-1 flex-col">

        <div className="flex items-center gap-3">
          <Image
            src="/transparentlogo.png"
            alt="AstraAI Logo"
            width={40}
            height={40}
            priority
            className="object-contain"
          />

          <h1 className="text-[26px] font-bold tracking-tight text-[#1F1F1F]">
            AstraAI
          </h1>
        </div>

        {/* New Chat */}

        <button
          onClick={onNewChat}
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-white
            py-4
            font-medium
            shadow-sm
            transition-all
            hover:-translate-y-0.5
            hover:shadow-lg
          "
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Navigation */}

        <div className="mt-10 space-y-2">

          <SidebarItem
            icon={<Search size={19} />}
            title="Search"
            onClick={() => {
              setSearchMode((prev) => !prev);
              setSearchText("");
            }}
          />

          <SidebarItem
            icon={<History size={19} />}
            title="History"
          />

          <SidebarItem
            icon={<Link2 size={19} />}
            title="Shared Links"
          />

        </div>

        {/* Chats */}

        <div className="mt-10 flex-1 overflow-y-auto">

          {searchMode ? (
            <input
              autoFocus
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search chats..."
              className="
                mb-4
                w-full
                rounded-xl
                border
                border-[#E6E6E6]
                bg-white
                px-3
                py-2
                text-sm
                outline-none
                focus:border-black
              "
            />
          ) : (
            <p className="mb-4 px-2 text-xs font-bold tracking-[0.28em] text-[#7A7A7A]">
              RECENT
            </p>
          )}

          <div className="space-y-2">

            {filteredHistory.length === 0 ? (
              <p className="px-3 py-2 text-sm text-[#8B8B8B]">
                {searchMode ? "No matching chats" : "No chats yet"}
              </p>
            ) : (
              filteredHistory.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  onOpen={onOpenChat}
                  onDelete={onDeleteChat}
                  onRename={onRenameChat}
                />
              ))
            )}

          </div>

        </div>

      </div>

      {/* Profile */}

      <button
        className="
          group
          mt-5
          flex
          items-center
          justify-between
          rounded-[20px]
          bg-white
          px-4
          py-3
          shadow-sm
          transition-all
          hover:-translate-y-0.5
          hover:shadow-lg
        "
      >
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F1F1F] text-white">
            <User size={18} />
          </div>

          <div className="text-left">

            <p className="font-semibold">
              Guest User
            </p>

            <p className="text-sm text-gray-500">
              Sign in with Google
            </p>

          </div>

        </div>

        <ChevronRight size={18} />

      </button>

    </aside>
  );
}

function SidebarItem({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        px-4
        py-3
        text-[17px]
        font-medium
        text-[#4B5563]
        transition-all
        hover:bg-white
        hover:pl-5
        hover:text-black
        hover:shadow-sm
      "
    >
      <div className="group-hover:scale-110 transition">
        {icon}
      </div>

      <span>{title}</span>
    </button>
  );
}

function ChatItem({
  chat,
  onOpen,
  onDelete,
  onRename,
}: {
  chat: ChatHistory;
  onOpen: (id: number) => void;
  onDelete: (id: number) => void;
  onRename: (id: number, title: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative">

      <button
        onClick={() => onOpen(chat.id)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          px-3
          py-2.5
          text-left
          hover:bg-white
        "
      >
        <span className="truncate text-[15px]">
          {chat.title}
        </span>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="opacity-0 group-hover:opacity-100 transition"
        >
          <MoreHorizontal size={18} />
        </div>

      </button>

      {menuOpen && (
        <div
          className="
            absolute
            right-2
            top-10
            z-50
            w-40
            rounded-xl
            border
            bg-white
            shadow-xl
          "
        >
          <button
            onClick={() => {
              const title = prompt("Rename chat", chat.title);

              if (title?.trim()) {
                onRename(chat.id, title);
              }

              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 hover:bg-gray-100"
          >
            <Pencil size={16} />
            Rename
          </button>

          <button
            onClick={() => {
              onDelete(chat.id);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      )}

    </div>
  );
}