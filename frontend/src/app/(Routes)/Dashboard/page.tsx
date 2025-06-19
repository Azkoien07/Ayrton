'use client';

import { useState } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';

import Task from '@/app/Components/Task';
import UserContentAdmin from '@/app/Components/content/UserContentAdmin';

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sections = roleOptions[validRole as keyof typeof roleOptions];

 
    const quickStats = [
        { label: 'Usuarios Activos', value: '1,247', trend: '+12%', color: 'text-light-success dark:text-dark-success' },
        { label: 'Ingresos Mes', value: '$45,230', trend: '+8.2%', color: 'text-light-success dark:text-dark-success' },
        { label: 'Tareas Pendientes', value: '23', trend: '-5%', color: 'text-light-warning dark:text-dark-warning' },
        { label: 'Sistema', value: '99.9%', trend: '0%', color: 'text-light-success dark:text-dark-success' }
    ];

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                {/* Header Compacto */}
                <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border">
                    <div className="px-6 py-4">
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
                            
                            {/* Stats Rápidas en Header */}
                            <div className="hidden lg:flex items-center gap-6">
                                {quickStats.slice(0, 2).map((stat, index) => (
                                    <div key={index} className="text-right">
                                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                            {stat.label}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-bold text-light-text dark:text-dark-text">
                                                {stat.value}
                                            </span>
                                            <span className={`text-xs ${stat.color}`}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Contenido Principal */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6 space-y-6">
                        
                        {/* Grid de Stats Principales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickStats.map((stat, index) => (
                                <div key={index} 
                                    className="bg-light-card dark:bg-dark-card rounded-xl p-5 border border-light-border dark:border-dark-border
                                        hover:shadow-lg hover:shadow-light-primary/5 dark:hover:shadow-dark-primary/5 transition-all duration-300
                                        hover:border-light-primary/20 dark:hover:border-dark-primary/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-medium text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wide">
                                                {stat.label}
                                            </p>
                                            <p className="text-2xl font-bold text-light-text dark:text-dark-text mt-1">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`text-sm font-semibold ${stat.color} bg-opacity-10 px-2 py-1 rounded`}>
                                            {stat.trend}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tareas y Dynamic Island en una fila */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Task />
                            </div>
                            <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
                                <h3 className="font-semibold text-light-text dark:text-dark-text mb-4">
                                    Estado del Sistema
                                </h3>
                
                            </div>
                        </div>

                        {/* Navegación por Tabs - Más Compacta */}
                        <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
                            <div className="border-b border-light-border dark:border-dark-border">
                                <nav className="flex overflow-x-auto">
                                    {sections.map((section, index) => (
                                        <button
                                            key={section}
                                            onClick={() => setSelected(section)}
                                            className={cn(
                                                'flex-shrink-0 px-6 py-4 font-medium text-sm border-b-2 transition-all duration-200',
                                                selected === section
                                                    ? 'border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary bg-light-primary/5 dark:bg-dark-primary/5'
                                                    : 'border-transparent text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text hover:border-light-border dark:hover:border-dark-border'
                                            )}
                                        >
                                            {section}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Contenido de la Sección Seleccionada */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                                        {selected}
                                    </h2>
                                    <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
                                        Gestiona y configura {selected.toLowerCase()}
                                    </p>
                                </div>
                                <div className="min-h-[300px]">
                                    <UserContentAdmin role={validRole} />
                                    
                                
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center mb-4">
                                            <div className="w-6 h-6 bg-light-primary dark:bg-dark-primary rounded-full opacity-60"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                                            {selected}
                                        </h3>
                                        <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-md">
                                            Esta sección permite gestionar todas las configuraciones relacionadas con {selected.toLowerCase()}.
                                        </p>
                                        <button className="mt-4 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg
                                            hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-200">
                                            Configurar {sections}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;