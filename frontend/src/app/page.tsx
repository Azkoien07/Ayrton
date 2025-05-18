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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');  // Asegura que el modo oscuro esté activado al cargar
    }
  }, []);

  useEffect(() => {
    // Cambiar la clase 'dark' en el body dependiendo del estado
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="bg-light-background text-light-text font-sans dark:bg-dark-background dark:text-dark-text transition-colors duration-500">
      <Navbar />

      {/* Botón para cambiar de tema */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-light-card dark:bg-dark-card p-3 rounded-full shadow-lg transition-all hover:scale-105 z-50"
        aria-label="Toggle theme"
      >
        {isDarkMode ? '🌙' : '🌞'}
      </button>
      <Hero />
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
      <Footer />
    </div>
  );
};

export default LandingPage;