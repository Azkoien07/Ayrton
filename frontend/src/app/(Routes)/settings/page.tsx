'use client'
import Sidebar from '@/app/Components/Sidebar';
import { DashboardProps, roleOptions } from '@/app/Types/dashboard';
import { cn } from '@/app/Utilities/utils';
import { motion } from 'framer-motion'
import { useState } from 'react';
import CuadrosSettings from '@/app/Components/cuadrosSettings';

type SettingsPageProps = {
    role: string;
};

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const role = 'admin';
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';

    return(
        <div className='flex h-screen bg-light-background dark:bg-dark-background'>
            <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
            <main
                 className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                {/* Header */}
                <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border">
                    <div className="px-4 py-4">
                        <div className="flex items-center justify-between">
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
                    </div>
                </header>

                <div className="flex-1 overflow-auto">
                    {/* Sección de bienvenida */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    > 
                        <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
                            <div className='flex items-center space-x-2 mb-4'>
                                <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>Panel</span>
                                <span className='text-light-text dark:text-dark-text text-3xl font-bold'>de configuración</span>
                            </div>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mt-2">
                                Personaliza y configura todos los aspectos de tu sistema desde este panel centralizado.
                            </p>
                        </div>   
                    </motion.div>

                    {/* Contenido principal */}
                    <div className='px-6 pb-6'>
                        <CuadrosSettings role={role} />
                    </div>
                </div>      
            </main>
        </div>
    )
}