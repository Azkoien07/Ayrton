'use client'
import { roleOptions } from '@Types/dashboard';
import { cn } from '@utilities/utils';
import { motion } from 'framer-motion';
import { useUser } from '@context/userContext';
import Sidebar from '@components/UI/Sidebar';
import { useState, useEffect } from 'react';
import CuadrosSettings from '@components/cuadrosSettings';

type SettingsPageProps = {
  role: string;
};

export default function SettingsPage() {
  const { user } = useUser();
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';

  // Hook to detect mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-light-background dark:bg-dark-background">
      {/* Sidebar collapsible on mobile */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />

     <main
  className={cn(
    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
    isMobile
      ? 'ml-0'
      : sidebarOpen
      ? 'ml-[240px]'
      : 'ml-[72px]'
  )}
>
        {/* Header */}
<header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border relative">
  {/* Botón fijo en la esquina superior izquierda */}
  {isMobile && (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="absolute top-4 left-4 p-2 rounded-full text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition"
    >
      ☰
    </button>
  )}

  <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
    <div>
    </div>
  </div>
</header>

        <div className="flex-1 overflow-auto">
          {/* Welcome section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-6 sm:px-6 lg:px-8"
          >
            <div className="rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-6 md:p-10 lg:p-20 border border-light-border dark:border-dark-border">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-light-textSecondary dark:text-dark-textSecondary text-2xl md:text-3xl font-light">Panel</span>
                <span className="text-light-text dark:text-dark-text text-2xl md:text-3xl font-bold">de configuración</span>
              </div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mt-2">
                Personaliza y configura todos los aspectos de tu sistema desde este panel centralizado.
              </p>
            </div>
          </motion.div>

          {/* Main content */}
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <CuadrosSettings role={validRole} />
          </div>
        </div>
      </main>
    </div>
  );
}
