"use client";

import React from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`absolute top-6 right-6 p-3 rounded-full shadow-lg z-50 transition-all ${theme === "dark" ? "bg-[#2C2C2C]" : "bg-white"
        }`}
    >
      {theme === "dark" ? (
        <svg
          className="w-5 h-5 text-[#E5F7F6]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-[#1A5A4D]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
