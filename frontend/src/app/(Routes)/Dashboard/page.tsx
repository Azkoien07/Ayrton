'use client';

import { useState } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';
import DynamicIslkand from '@components/DynamicIsland';
import Task from '@/app/Components/Task';

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';

    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sections = roleOptions[validRole as keyof typeof roleOptions];

    return (
        <div className="flex h-screen dark:bg-dark-background bg-light-background transition-colors duration-300">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Pasamos el estado y setState al sidebar */}
            <main
                className={cn(
                    'flex-1 flex flex-col p-6 overflow-auto transition-all duration-300',
                    sidebarOpen ? 'ml-[220px]' : 'ml-[72px]'
                )}
                style={{
                    minWidth: `calc(100% - ${sidebarOpen ? 220 : 72}px)`,
                }}
            >
                <header className="mb-6">
                    <h1 className="text-3xl font-bold dark:text-dark-text text-light-text transition">
                        Panel de{' '}
                        <span className="text-light-primary dark:text-dark-primary capitalize">{validRole}</span>
                    </h1>
                    <p className="text-lg dark:text-dark-textSecondary text-light-textSecondary">
                        Sección: <strong>{selected}</strong>
                    </p>
                </header>

                <Task />
                <nav className="flex gap-4 mb-8">
                    {sections.map((section) => (
                        <button
                            key={section}
                            onClick={() => setSelected(section)}
                            className={cn(
                                'px-5 py-2 rounded-md font-semibold transition-colors',
                                selected === section
                                    ? 'bg-light-primary text-white dark:bg-dark-primary dark:text-dark-text shadow-md'
                                    : 'bg-light-card text-light-text hover:bg-light-primary hover:text-white dark:bg-dark-card dark:text-dark-textSecondary dark:hover:bg-dark-primary dark:hover:text-dark-text'
                            )}
                        >
                            {section}
                        </button>
                    ))}
                </nav>
                <section
                    className="flex-grow rounded-lg p-6 shadow border
          dark:bg-dark-card bg-light-card
          dark:border-dark-border border-light-border
          text-center dark:text-dark-text text-light-text"
                >
                    <p>
                        Aquí irá el contenido de <strong>{selected}</strong>.
                    </p>
                    <DynamicIslkand />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;