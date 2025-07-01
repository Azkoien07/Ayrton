"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import FormEditProfile from '@components/Features/Profile/FormEditProfileUser';
import Sidebar from '@components/UI/Sidebar';
import { cn } from '@utilities/utils';
import { useUser } from '@context/userContext';

const ProfileUser: React.FC = () => {
  const { user } = useUser();
  const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar role={validRole} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64">
            <Sidebar role={validRole} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <button
                  onClick={handleGoBack}
                  className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-light-text dark:text-dark-text truncate">
                    Perfil de Usuario
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                    Gestiona la información de tu perfil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FormEditProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
