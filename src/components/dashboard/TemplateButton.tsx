"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
  bg: string;
  color: string;
}

export default function TemplateButton({
  title,
  icon: Icon,
  bg,
  color,
}: Props) {
  return (
    <button
      className="flex items-center gap-3 rounded-2xl border border-gray-200 px-6 py-4 transition hover:shadow-md"
      style={{ backgroundColor: bg }}
    >
      <Icon
        size={18}
        style={{ color }}
      />

      <span className="font-medium">
        {title}
      </span>
    </button>
  );
}