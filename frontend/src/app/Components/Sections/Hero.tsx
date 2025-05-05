// components/Hero.tsx
import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <header className="relative overflow-hidden px-6 py-32 text-center rounded-b-3xl shadow-xl bg-light-background dark:bg-dark-background">
            <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-30 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none">
                    <circle cx="400" cy="300" r="300" fill="url(#gradient)" />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#6366F1" stopOpacity="0.15" />
                            <stop offset="1" stopColor="#818CF8" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-light-primary dark:text-dark-primary font-palmer">
                Impulsa tus proyectos <br className="hidden md:block" /> con <span className="text-light-accent dark:text-dark-accent">Ayrton</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-light-textSecondary dark:text-dark-textSecondary mb-8 font-palmer">
                Una plataforma moderna para gestionar tareas, colaborar en equipo y visualizar resultados como nunca antes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/Login" className="bg-light-accent text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-light-primary transition-all duration-300 dark:bg-dark-accent dark:hover:bg-dark-hover">
                    Comienza gratis
                </Link>
                <a href="#" className="border border-light-border text-light-primary py-3 px-8 rounded-full text-lg font-semibold hover:bg-light-card transition-all duration-300 dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-card">
                    Ver demo
                </a>
            </div>
        </header>
    );
};

export default Hero;