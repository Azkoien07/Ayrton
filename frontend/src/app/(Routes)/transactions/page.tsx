'use client';

import { useState } from 'react';
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

const DashboardContent = ({ sidebarOpen, validRole }: { sidebarOpen: boolean; validRole: string }) => {
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
                sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
            )}>
                <div className="text-center">
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
                sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
            )}>
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">Error al cargar datos</h2>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">{error}</p>
                    <button
                        onClick={() => { fetchPayments(); fetchVouchers(); }}
                        className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
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
                sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
            )}
        >
            <DashboardHeader
                validRole={validRole ?? 'admin'}
                fetchPayments={fetchPayments}
                fetchVouchers={fetchVouchers}
                sidebarOpen={sidebarOpen}
            />

            <div className="flex-1 overflow-auto">
                <WelcomeSection />
                <QuickStatsSection stats={stats} vouchersLength={vouchers.length} />
                <RecentPaymentsSection
                    filteredPayments={filteredPayments}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterMethod={filterMethod}
                    setFilterMethod={setFilterMethod}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />
                <VouchersSection vouchers={vouchers
                    .filter((v: Voucher) => v.id !== undefined)
                    .map((v: Voucher) => ({
                        ...v,
                    })) as Voucher[]}
                />
            </div>
        </main>
    );
};

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = (roleOptions[role as keyof typeof roleOptions] ? role : 'admin') as string;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />
            <DashboardContent sidebarOpen={sidebarOpen} validRole={validRole} />
        </div>
    );
};

export default Dashboard;
