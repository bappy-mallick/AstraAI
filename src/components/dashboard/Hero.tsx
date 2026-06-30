"use client";

import TemplateGrid from "./TemplateGrid";

interface HeroProps {
  onTemplateClick: (prompt: string) => void;
}

export default function Hero({
  onTemplateClick,
}: HeroProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-10 pt-6">

      {/* Heading */}
      <div className="text-center">

        <h1 className="text-[42px] font-bold tracking-[-0.04em] text-[#1F1F1F] leading-tight">
          What are we creating today?
        </h1>

        <p className="mt-4 text-[21px] text-[#6B7280]">
          Pick a template or simply start typing below.
        </p>

      </div>

      {/* Templates */}
      <div className="mt-14">
        <TemplateGrid
          onTemplateClick={onTemplateClick}
        />
      </div>

    </div>
  );
}