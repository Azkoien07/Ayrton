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
      <Sidebar
        role={validRole}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={isMobile ? sidebarOpen : true} // Always open on desktop
      />

     <main
  className={cn(
    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
    isMobile
      ? 'ml-0'
      : sidebarOpen
      ? 'ml-[160px]' // reducido para acercar al sidebar
      : 'ml-[72px]'
  )}
>
        {/* Header */}
<header className="sticky top-0 z-40 backdrop-blur-md bg-black-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border relative">
  {/* Botón fijo en la esquina superior izquierda */}
  {isMobile && (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="absolute top-4 left-4 p-2 rounded-full text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition"
    >
      ☰
    </button>
  )}

  <div className="max-w-4xl mx-auto p-4 md:p-6">
    <div>
      <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
        Panel de{' '}
        <span className="text-light-primary dark:text-dark-primary capitalize">
          {validRole}
        </span>
      </h1>
      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
        {new Date().toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>
  </div>
</header>

        <div className="flex-1 overflow-auto">
          {/* Welcome section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-6"
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
          <div className="px-4 md:px-6 pb-6">
            <CuadrosSettings role={validRole} />
          </div>
        </div>
      </main>
    </div>
  );
}
