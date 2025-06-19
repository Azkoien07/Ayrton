'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/Components/Sections/Navbar';
import Hero from '@/app/Components/Sections/Hero';
import Features from '@/app/Components/Sections/Features';
import Bento from '@/app/Components/Sections/Bento';
import TechStack from '@/app/Components/Sections/TechStack';
import Plans from '@/app/Components/Sections/Plans';
import Testimonials from '@/app/Components/Sections/Testimonials';
import FAQ from '@/app/Components/Sections/FAQ';
import Footer from '@/app/Components/Sections/Footer';
import Separator from '@/app/Components/Sections/Separator';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-light-background via-light-accentSoft/30 to-light-background dark:from-dark-background dark:via-dark-accentSoft/20 dark:to-dark-background text-light-text dark:text-dark-text font-sans transition-all duration-700 ease-in-out">
      {/* Efectos de fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-light-secondary/10 dark:bg-dark-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-light-primary/5 dark:bg-dark-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Patrón de puntos sutil */}
      <div 
        className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          color: 'rgb(156 163 175 / 0.3)'
        }}
      ></div>

      <Navbar />

      {/* Botón para cambiar de tema mejorado */}
      <button
        onClick={toggleTheme}
        className="fixed top-20 right-6 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-md p-3 rounded-full shadow-xl border border-light-border/50 dark:border-dark-border/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-light-card dark:hover:bg-dark-card z-50 group"
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span 
            className={`absolute text-xl transition-all duration-500 ${
              isDarkMode 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 rotate-180 scale-50'
            }`}
          >
            🌙
          </span>
          <span 
            className={`absolute text-xl transition-all duration-500 ${
              !isDarkMode 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 -rotate-180 scale-50'
            }`}
          >
            🌞
          </span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-light-card dark:bg-dark-card px-3 py-1 rounded-lg shadow-lg border border-light-border dark:border-dark-border text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          {/* Flecha del tooltip */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-light-card dark:border-l-dark-card border-y-4 border-y-transparent"></div>
        </div>
      </button>

      {/* Contenido principal */}
      <main className="relative z-10">
        <Hero />
        
        <div className="space-y-8">
          <Separator />
          <Features />
          
          <Separator />
          <Bento />
          
          <Separator />
          <TechStack />
          
          <Separator />
          <Testimonials />
          
          <Separator />
          <Plans />
          
          <Separator />
          <FAQ />
          
          <Separator />
        </div>
        
        <Footer />
      </main>

      {/* Scroll indicator */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="w-0.5 h-32 bg-light-border dark:bg-dark-border rounded-full relative">
          <div className="w-0.5 bg-light-primary dark:bg-dark-primary rounded-full transition-all duration-300 ease-out" style={{ height: '20%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;