'use client';
import React from 'react';
import Navbar from '@/app/Components/Sections/Navbar';
import Hero from '@/app/Components/Sections/Hero';
import Features from '@/app/Components/Sections/Features';
import Bento from '@/app/Components/Sections/Bento';
import Stats from '@/app/Components/Sections/Stats';
import TechStack from '@/app/Components/Sections/TechStack';
import Testimonials from '@/app/Components/Sections/Testimonials';
import FAQ from '@/app/Components/Sections/FAQ';
import CallToAction from '@/app/Components/Sections/CallToAction';
import Footer from '@/app/Components/Sections/Footer';
import Plans from '@/app/Components/Sections/Plans';

const LandingPage = () => {
  return (
    <div className="bg-light-background text-light-text font-sans dark:bg-dark-background dark:text-dark-text transition-colors duration-500">
      <Navbar />
      <Hero />
      <Features />
      <Bento />
      <Stats />
      <TechStack />
      <Testimonials />
      <Plans />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;