"use client";

import React, { useState } from "react";
import AuthForm from "@components/AuthForm";
import ParticleBackground from "@components/ParticleBackground";
import ThemeToggle from "@components/ThemeToggle";

export default function LoginPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const bgColor = theme === "dark" ? "bg-[#1C1C1C]" : "bg-[#F4F4F4]";
  const textColor = theme === "dark" ? "text-[#EAEAEA]" : "text-[#2B2D42]";
  const textSecondary = theme === "dark" ? "text-[#B0B0B0]" : "text-[#4E5D6D]";

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${bgColor} ${textColor}`}
    >
      <ParticleBackground theme={theme} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="absolute w-full max-w-md transform -translate-y-60">
        <div className="text-center mb-6">
          <h1 className="text-7xl font-palmer tracking-wide drop-shadow-md animate__animated animate__fadeIn">
            Ayrton
          </h1>
          <p
            className={`${textSecondary} mt-3 animate__animated animate__fadeIn animate__delay-1s text-sm`}
          >
            Organiza tus tareas y equipos con elegancia
          </p>
        </div>

        <AuthForm theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
