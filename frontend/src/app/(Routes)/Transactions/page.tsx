'use client';


import { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { UserRole } from '@components/UI/Sidebar';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import { useDashboardData } from '@hooks/useDashboardData';
import { Voucher } from '@/generated/graphql';
import Sidebar from '@components/UI/Sidebar';
import DashboardHeader from '@components/Transactions/DashboardHeader';
import WelcomeSection from '@components/Transactions/WelcomeSection';
import QuickStatsSection from '@components/Transactions/QuickStatsSection';
import RecentPaymentsSection from '@components/Transactions/RecentPaymentsSection';
import VouchersSection from '@components/Transactions/VouchersSection';

const DashboardContent = ({
    validRole,
    fetchPayments,
    fetchVouchers,
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
    filteredPayments
}: {
    validRole: UserRole;
    fetchPayments: () => void;
    fetchVouchers: () => void;
    payments: any[];
    vouchers: any[];
    loading: boolean;
    error: string | null;
    stats: any;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterMethod: string;
    setFilterMethod: (method: string) => void;
    dateFilter: string;
    setDateFilter: (date: string) => void;
    filteredPayments: any[];
}) => {
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-primary mx-auto mb-4"></div>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Cargando datos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center">
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
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
                <DashboardHeader
                    validRole={validRole ?? 'admin'}
                    fetchPayments={fetchPayments}
                    fetchVouchers={fetchVouchers}
                />

                <WelcomeSection />
                <QuickStatsSection
                    stats={stats}
                    vouchersLength={vouchers.length}
                />
                <RecentPaymentsSection
                    filteredPayments={filteredPayments}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterMethod={filterMethod}
                    setFilterMethod={setFilterMethod}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />
                <VouchersSection
                    vouchers={(vouchers as unknown as Voucher[])
                        .filter((v) => v.id !== undefined)}
                />
            </div>
        </div>
    );
};

const Dashboard = ({ role }: DashboardProps) => {
    const validRole: UserRole = (roleOptions[role as keyof typeof roleOptions] ? role : 'admin') as UserRole; // Castear a UserRole
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

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

            <main className="flex-1 flex flex-col min-w-0">
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
                                        Transacciones
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        Revisa el historial de tus pagos y vouchers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <DashboardContent
                    validRole={validRole}
                    fetchPayments={fetchPayments}
                    fetchVouchers={fetchVouchers}
                    payments={payments}
                    vouchers={vouchers}
                    loading={loading}
                    error={error}
                    stats={stats}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterMethod={filterMethod}
                    setFilterMethod={setFilterMethod}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    filteredPayments={filteredPayments}
                />
            </main>
        </div>
    );
};

export default Dashboard;
