'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import { useUser } from '@context/userContext';
import Sidebar from '@components/UI/Sidebar';
import UserContentAdmin from '@components/content/UserContentAdmin';
import { fetchUsers } from '@slice/userSlice'
import { UseDispatch } from 'react-redux';
import type { AppDispatch, RootState } from "@/app/Redux/store";

const Dashboard = ({ role }: DashboardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useUser();
    const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const users = useSelector((state: RootState) => state.user.data);
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;

    const sections = roleOptions[validRole as keyof typeof roleOptions];

    // Cerrar sidebar en móvil cuando se redimensiona a desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const quickStats = [
        { label: 'Usuarios Activos', value: '1,247', trend: '+12%', color: 'text-light-success dark:text-dark-success' },
        { label: 'Ingresos Mes', value: '$45,230', trend: '+8.2%', color: 'text-light-success dark:text-dark-success' },
        { label: 'Tareas Pendientes', value: '23', trend: '-5%', color: 'text-light-warning dark:text-dark-warning' },
        { label: 'Sistema', value: '99.9%', trend: '0%', color: 'text-light-success dark:text-dark-success' }
    ];


    useEffect(() => {
        dispatch(fetchUsers({ page, size: itemsPerPage }));
    }, [dispatch, page, itemsPerPage]);


    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background overflow-hidden">
            {/* Sidebar */}
            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                    'lg:relative lg:translate-x-0 lg:transform-none'
                )}
            >
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />
            </div>

            {/* Overlay para móviles */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col min-w-0 lg:ml-0">
                {/* Header Responsive */}
                <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/90 dark:bg-dark-card/90 border-b border-light-border dark:border-dark-border">
                    <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-between gap-2 sm:gap-4">
                            {/* Botón hamburguesa + Título */}
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                <button
                                    className="lg:hidden p-2 rounded-md text-light-text dark:text-dark-text hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-light-text dark:text-dark-text truncate">
                                        Panel de{' '}
                                        <span className="text-light-primary dark:text-dark-primary capitalize">
                                            {validRole}
                                        </span>
                                    </h1>
                                    <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary hidden sm:block">
                                        {new Date().toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Stats Rápidas - Solo desktop */}
                            <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
                                {quickStats.slice(0, 2).map((stat, index) => (
                                    <div key={index} className="text-right">
                                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                            {stat.label}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm lg:text-base font-bold text-light-text dark:text-dark-text">
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

                {/* Contenido Scrolleable */}
                <div className="flex-1 overflow-auto">
                    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
                        {/* Grid de Stats - Responsive */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {quickStats.map((stat, index) => (
                                <div key={index}
                                    className="bg-light-card dark:bg-dark-card rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-light-border dark:border-dark-border
                                        hover:shadow-lg hover:shadow-light-primary/5 dark:hover:shadow-dark-primary/5 transition-all duration-300
                                        hover:border-light-primary/20 dark:hover:border-dark-primary/20"
                                >
                                    <div className="space-y-1 sm:space-y-2">
                                        <p className="text-xs font-medium text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wide line-clamp-1">
                                            {stat.label}
                                        </p>
                                        <div className="flex items-end justify-between gap-1">
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-light-text dark:text-dark-text truncate">
                                                {stat.value}
                                            </p>
                                            <div className={`text-xs sm:text-sm font-semibold ${stat.color} bg-opacity-10 px-1 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0`}>
                                                {stat.trend}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sistema Status - Responsive */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-light-card dark:bg-dark-card rounded-lg sm:rounded-xl p-4 sm:p-6 border border-light-border dark:border-dark-border">
                                <h3 className="font-semibold text-light-text dark:text-dark-text mb-4 text-sm sm:text-base">
                                    Estado del Sistema
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary">CPU</span>
                                        <span className="text-xs sm:text-sm font-medium text-light-text dark:text-dark-text">45%</span>
                                    </div>
                                    <div className="w-full bg-light-background dark:bg-dark-background rounded-full h-2">
                                        <div className="bg-light-primary dark:bg-dark-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenido Principal con Tabs */}
                        <div className="bg-light-card dark:bg-dark-card rounded-lg sm:rounded-xl border border-light-border dark:border-dark-border">
                            {/* Navegación de Tabs - Responsive */}
                            <div className="border-b border-light-border dark:border-dark-border">
                                <nav className="flex overflow-x-auto scrollbar-hide">
                                    {sections.map((section, index) => (
                                        <button
                                            key={section}
                                            onClick={() => setSelected(section)}
                                            className={cn(
                                                'flex-shrink-0 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm border-b-2 transition-all duration-200 whitespace-nowrap',
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

                            {/* Contenido de la Sección */}
                            <div className="p-3 sm:p-4 lg:p-6">
                                <div className="mb-4 sm:mb-6">
                                    <h2 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text">
                                        {selected}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                                        Gestiona y configura {selected.toLowerCase()}
                                    </p>
                                </div>
                                <div className="min-h-[300px]">
                                    <UserContentAdmin role={validRole} users={users} />

                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center mb-4">
                                            <div className="w-6 h-6 bg-light-primary dark:bg-dark-primary rounded-full opacity-60"></div>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                                            {selected}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-md px-4">
                                            Esta sección permite gestionar todas las configuraciones relacionadas con {selected.toLowerCase()}.
                                        </p>
                                        <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg text-xs sm:text-sm
                                            hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-200">
                                            Configurar {selected}
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