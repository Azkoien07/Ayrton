"use client";

import React, { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  theme: "light" | "dark";
}

export default function ParticleBackground({ theme }: ParticleBackgroundProps) {
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesContainerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const count = 50;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full opacity-70";

      const size = Math.random() * 6 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      const hue = theme === "dark" ? 220 : 280;
      const sat = `${Math.random() * 40 + 60}%`;
      const light =
        theme === "dark"
          ? `${Math.random() * 30 + 60}%`
          : `${Math.random() * 20 + 40}%`;

      particle.style.backgroundColor = `hsl(${hue}, ${sat}, ${light})`;
      particle.style.animation = `float ${Math.random() * 10 + 10
        }s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(particle);
    }

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(0) translateX(20px); }
        75% { transform: translateY(20px) translateX(10px); }
        100% { transform: translateY(0) translateX(0); }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [theme]);

  return (
    <div
      ref={particlesContainerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
}
