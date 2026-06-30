"use client";

import {
  BriefcaseBusiness,
  Play,
  Camera,
  FileText,
  Mail,
  Mic,
  Sparkles,
  Megaphone,
} from "lucide-react";

const templates = [
  {
    title: "LinkedIn",
    prompt: "Write a professional LinkedIn post about ",
    icon: BriefcaseBusiness,
    bg: "bg-blue-100/70",
    iconColor: "text-blue-600",
  },
  {
    title: "YouTube",
    prompt: "Create a YouTube video script about ",
    icon: Play,
    bg: "bg-rose-100/70",
    iconColor: "text-red-500",
  },
  {
    title: "Instagram",
    prompt: "Write an engaging Instagram caption for ",
    icon: Camera,
    bg: "bg-pink-100/70",
    iconColor: "text-pink-500",
  },
  {
    title: "Blog",
    prompt: "Write a professional blog post about ",
    icon: FileText,
    bg: "bg-amber-100/70",
    iconColor: "text-amber-600",
  },
  {
    title: "Email",
    prompt: "Write a professional email regarding ",
    icon: Mail,
    bg: "bg-green-100/70",
    iconColor: "text-green-600",
  },
  {
    title: "Podcast",
    prompt: "Create a podcast script about ",
    icon: Mic,
    bg: "bg-violet-100/70",
    iconColor: "text-violet-600",
  },
  {
    title: "Rewrite",
    prompt: "Rewrite the following content professionally:\n\n",
    icon: Sparkles,
    bg: "bg-cyan-100/70",
    iconColor: "text-cyan-600",
  },
  {
    title: "Ad Copy",
    prompt: "Write persuasive ad copy for ",
    icon: Megaphone,
    bg: "bg-orange-100/70",
    iconColor: "text-orange-500",
  },
];

interface TemplateGridProps {
  onTemplateClick: (prompt: string) => void;
}

export default function TemplateGrid({
  onTemplateClick,
}: TemplateGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {templates.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            onClick={() => onTemplateClick(item.prompt)}
            className={`
              ${item.bg}
              group
              flex
              h-[56px]
              items-center
              gap-3
              rounded-2xl
              border
              border-transparent
              px-4
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:border-white
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]
            `}
          >
            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white
                shadow-sm
                transition-all
                duration-300
                group-hover:scale-110
                ${item.iconColor}
              `}
            >
              <Icon size={19} strokeWidth={2.2} />
            </div>

            <span
              className="
                text-[15px]
                font-semibold
                text-[#1F1F1F]
                transition-all
                duration-300
                group-hover:translate-x-1
              "
            >
              {item.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}