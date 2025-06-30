'use client';

import { useState, useEffect } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/UI/Sidebar';
import DashboardHeader from '@components/Transactions/DashboardHeader';
import WelcomeSection from '@components/Transactions/WelcomeSection';
import QuickStatsSection from '@components/Transactions/QuickStatsSection';
import RecentPaymentsSection from '@components/Transactions/RecentPaymentsSection';
import VouchersSection from '@components/Transactions/VouchersSection';
import { useDashboardData } from '@hooks/useDashboardData';
import { Voucher } from '@/generated/graphql';

const DashboardContent = ({ 
    sidebarOpen, 
    validRole, 
    isMobile,
    isTablet 
}: { 
    sidebarOpen: boolean; 
    validRole: string;
    isMobile: boolean;
    isTablet: boolean;
}) => {
    const {
        payments,
        vouchers,
        loading,
        error,
        stats,
        searchTerm,
        setSearchTerm,
        filterMethod,
        setFilterMethod,
        dateFilter,
        setDateFilter,
        fetchPayments,
        fetchVouchers,
        filteredPayments
    } = useDashboardData();

    if (loading) {
        return (
            <main className={cn(
                'flex-1 flex items-center justify-center transition-all duration-500 ease-in-out',
                // Responsive sidebar margins
                !isMobile && sidebarOpen ? 'ml-[240px]' : '',
                !isMobile && !sidebarOpen ? 'ml-[72px]' : '',
                isMobile ? 'ml-0' : ''
            )}>
                <div className="text-center px-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-primary mx-auto mb-4"></div>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Cargando datos...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={cn(
                'flex-1 flex items-center justify-center transition-all duration-500 ease-in-out',
                // Responsive sidebar margins
                !isMobile && sidebarOpen ? 'ml-[240px]' : '',
                !isMobile && !sidebarOpen ? 'ml-[72px]' : '',
                isMobile ? 'ml-0' : ''
            )}>
                <div className="text-center px-4">
                    <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
                    <h2 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text mb-2">
                        Error al cargar datos
                    </h2>
                    <p className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary mb-4">
                        {error}
                    </p>
                    <button
                        onClick={() => { fetchPayments(); fetchVouchers(); }}
                        className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main
            className={cn(
                'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                // Responsive sidebar margins
                !isMobile && sidebarOpen ? 'ml-[240px]' : '',
                !isMobile && !sidebarOpen ? 'ml-[72px]' : '',
                isMobile ? 'ml-0' : ''
            )}
        >
            <DashboardHeader
                validRole={validRole ?? 'admin'}
                fetchPayments={fetchPayments}
                fetchVouchers={fetchVouchers}
                sidebarOpen={sidebarOpen}
                {...(isMobile !== undefined && { isMobile })}
                {...(isTablet !== undefined && { isTablet })}
            />

            <div className="flex-1 overflow-auto">
                {/* Container con padding responsive */}
                <div className="px-2 sm:px-4 lg:px-6">
                    <WelcomeSection />
                    <QuickStatsSection 
                        stats={stats} 
                        vouchersLength={vouchers.length}
                        {...(isMobile !== undefined && { isMobile })}
                        {...(isTablet !== undefined && { isTablet })}
                    />
                    <RecentPaymentsSection
                        filteredPayments={filteredPayments}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterMethod={filterMethod}
                        setFilterMethod={setFilterMethod}
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}
                        {...(isMobile !== undefined && { isMobile })}
                        {...(isTablet !== undefined && { isTablet })}
                    />
                    <VouchersSection 
                        vouchers={(vouchers as unknown as Voucher[])
                            .filter((v) => v.id !== undefined)}
                        {...(isMobile !== undefined && { isMobile })}
                        {...(isTablet !== undefined && { isTablet })}
                    />
                </div>
            </div>
        </main>
    );
};

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = (roleOptions[role as keyof typeof roleOptions] ? role : 'admin') as string;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Hook para detectar el tamaño de pantalla
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768); // md breakpoint
            setIsTablet(width >= 768 && width < 1024); // lg breakpoint
            
            // Auto-close sidebar en móvil
            if (width < 768) {
                setSidebarOpen(false);
            }
        };
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // En móvil, cerrar sidebar cuando se hace clic fuera de él
    const handleOverlayClick = () => {
        if (isMobile && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background relative">
            {/* Overlay para móvil cuando el sidebar está abierto */}
            {isMobile && sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={handleOverlayClick}
                />
            )}
            
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                role={validRole}
                {...(isMobile !== undefined && { isMobile })}
                {...(isTablet !== undefined && { isTablet })}
            />
            
            <DashboardContent 
                sidebarOpen={sidebarOpen} 
                validRole={validRole}
                isMobile={isMobile}
                isTablet={isTablet}
            />
        </div>
    );
};

export default Dashboard;