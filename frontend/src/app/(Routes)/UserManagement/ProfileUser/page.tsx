"use client";

import React from 'react';
import FormEditProfile from '@components/Features/Profile/FormEditProfileUser';
import Sidebar from '@components/UI/Sidebar';
import Barrita from '@components/Header';
import { cn } from '@utilities/utils';
import { useUser } from '@context/userContext';
import { useState } from 'react';

const ProfileUser: React.FC = () => {
  const { user } = useUser();
  const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-light-background dark:bg-dark-background">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />

      <main
        className={cn(
          'flex-1 flex flex-col transition-all duration-500 ease-in-out',
          sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
        )}
      >
        <header className='sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border'>
          <Barrita />
        </header>
        <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <FormEditProfile />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileUser;
