"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const logos = ["/logo.jpeg"];

export default function LogoDropdown() {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(logos[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-purple-500 bg-[#26144D] px-5 py-3 text-white"
      >
        Choose Logo
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-36 rounded-2xl bg-[#26144D] p-3 shadow-xl">
          {logos.map((logo) => (
            <img
              key={logo}
              src={logo}
              onClick={() => {
                setSelected(logo);
                setOpen(false);
              }}
              className={`mb-3 cursor-pointer rounded-xl border-2 ${
                selected === logo
                  ? "border-purple-500"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}