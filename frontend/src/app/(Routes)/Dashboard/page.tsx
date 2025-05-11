'use client';
import { useState } from 'react';
import { cn } from '@lib/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'learner';

    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen dark:bg-dark-background bg-light-background transition-colors duration-300">
            {/* Sidebar */}
            <aside className={cn(
                "flex flex-col transition-all duration-300",
                sidebarOpen ? "w-64" : "w-16",
                "dark:bg-dark-card bg-light-card dark:border-r dark:border-dark-border border-r border-light-border shadow-lg"
            )}>
                <div className="flex items-center justify-between p-4">
                    <span className="font-palmer text-xl dark:text-dark-text text-light-text truncate">{sidebarOpen ? 'Aquiles' : 'A'}</span>
                    <button
                        className="md:hidden p-1 rounded hover:bg-light-accent dark:hover:bg-dark-accent transition"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <svg className="w-6 h-6 text-light-text dark:text-dark-text" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {sidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                <nav className="flex-1 mt-4 space-y-2">
                    {roleOptions[validRole as keyof typeof roleOptions].map(option => (
                        <button
                            key={option}
                            className={cn(
                                'w-full text-left px-4 py-2 rounded transition font-medium',
                                selected === option
                                    ? 'bg-light-accent dark:bg-dark-primary text-light-background dark:text-dark-text'
                                    : 'hover:bg-light-accentSoft dark:hover:bg-dark-border dark:text-dark-text text-light-text'
                            )}
                            onClick={() => setSelected(option)}
                        >
                            {sidebarOpen ? option : option[0]}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col p-6 overflow-auto">
                <h1 className="text-3xl font-bold mb-4 dark:text-dark-text text-light-text transition">
                    Panel de <span className="text-light-primary dark:text-dark-primary capitalize">{validRole}</span>
                </h1>
                <p className="text-lg dark:text-dark-textSecondary text-light-textSecondary">
                    Sección: <strong>{selected}</strong>
                </p>

                <div className="mt-6 p-6 rounded-lg dark:bg-dark-card bg-light-card dark:border dark:border-dark-border border border-light-border shadow">
                    <p className="dark:text-dark-text text-light-text text-center">Aquí irá el contenido de <strong>{selected}</strong>.</p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;