'use client';

import { useState, useEffect } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';
import { client } from '@/app/Lib/apollo-client';
import VoucherService from '@/app/Services/voucherService';

import Task from '@/app/Components/Task';
import UserContentAdmin from '@/app/Components/content/UserContentAdmin';
import { motion } from 'framer-motion';
import DashboardHeader from '@/app/Components/Transactions/DashboardHeader';
import WelcomeSection from '@/app/Components/Transactions/WelcomeSection';
import QuickStatsSection from '@/app/Components/Transactions/QuickStatsSection';
import RecentPaymentsSection from '@/app/Components/Transactions/RecentPaymentsSection';
import VouchersSection from '@/app/Components/Transactions/VouchersSection';
import PaymentMethodDistributionSection from '@/app/Components/Transactions/PaymentMethodDistributionSection';
import { PaymentEntity as ImportedPaymentEntity, UserEntity as ImportedUserEntity } from '@Types/typestransations';
import { VoucherEntity as ImportedVoucherEntity } from '@Types/voucher';

interface DashboardStats {
    totalIngresos: number;
    totalEgresos: number;
    totalTransacciones: number;
    transaccionesPendientes: number;
    ingresosTrend: number;
    egresosTrend: number;
}

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = (roleOptions[role as keyof typeof roleOptions] ? role : 'admin') as string;
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMethod, setFilterMethod] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const voucherService = new VoucherService(client);
    
    // Estados para datos reales
    const [payments, setPayments] = useState<ImportedPaymentEntity[]>([]);
    const [vouchers, setVouchers] = useState<ImportedVoucherEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, size: 10 }); // Añadir estado de paginación
    const [stats, setStats] = useState<DashboardStats>({
        totalIngresos: 0,
        totalEgresos: 0,
        totalTransacciones: 0,
        transaccionesPendientes: 0,
        ingresosTrend: 0,
        egresosTrend: 0
    });

    const sections = roleOptions[validRole as keyof typeof roleOptions];

    // Función para obtener datos del backend
    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/payments');
            if (!response.ok) {
                throw new Error('Error al obtener los pagos');
            }
            const data = await response.json();
            setPayments(data);
            calculateStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const fetchVouchers = async () => {
        try {
            const data = await voucherService.getVouchers(pagination);
            setVouchers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido al obtener vouchers');
            console.error('Error al obtener vouchers:', err);
        }
    };

    // Calcular estadísticas basadas en los pagos reales
    const calculateStats = (paymentsData: ImportedPaymentEntity[]) => {
        const totalTransacciones = paymentsData.length;
        const totalIngresos = paymentsData.reduce((sum, payment) => sum + payment.purchaseAmount, 0);
        
        // Para este ejemplo, consideramos todos los pagos como ingresos
        // Si tienes una lógica diferente para distinguir ingresos de egresos, modifica aquí
        const totalEgresos = 0; // Actualizar según tu lógica de negocio
        
        // Calcular tendencias (comparar con el mes anterior)
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const currentMonthPayments = paymentsData.filter(payment => {
            const paymentDate = new Date(payment.paymentDate);
            return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
        });
        
        const previousMonthPayments = paymentsData.filter(payment => {
            const paymentDate = new Date(payment.paymentDate);
            const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            return paymentDate.getMonth() === previousMonth && paymentDate.getFullYear() === previousYear;
        });
        
        const currentMonthTotal = currentMonthPayments.reduce((sum, payment) => sum + payment.purchaseAmount, 0);
        const previousMonthTotal = previousMonthPayments.reduce((sum, payment) => sum + payment.purchaseAmount, 0);
        
        const ingresosTrend = previousMonthTotal > 0 
            ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 
            : 0;

        setStats({
            totalIngresos,
            totalEgresos,
            totalTransacciones,
            transaccionesPendientes: 0, // Actualizar según tu lógica
            ingresosTrend,
            egresosTrend: 0 // Actualizar según tu lógica
        });
    };

    useEffect(() => {
        fetchPayments();
        fetchVouchers();
    }, []);

    // Filtrar pagos según los criterios
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = (payment.voucher?.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.id.toString().includes(searchTerm);
        
        const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;
        
        const matchesDate = dateFilter === 'all' || (() => {
            const paymentDate = new Date(payment.paymentDate);
            const now = new Date();
            
            switch (dateFilter) {
                case 'today':
                    return paymentDate.toDateString() === now.toDateString();
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return paymentDate >= weekAgo;
                case 'month':
                    return paymentDate.getMonth() === now.getMonth() && 
                           paymentDate.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        })();
        
        return matchesSearch && matchesMethod && matchesDate;
    });

    if (loading) {
        return (
            <div className="flex h-screen bg-light-background dark:bg-dark-background">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />
                <main className={cn(
                    'flex-1 flex items-center justify-center transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-primary mx-auto mb-4"></div>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary">Cargando datos...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen bg-light-background dark:bg-dark-background">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />
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
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />
            
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
                        .filter(v => v.id !== undefined && !isNaN(Number(v.id)))
                        .map(v => ({
                            ...v,
                            id: typeof v.id === 'string' ? Number(v.id) : v.id
                        }))}
                    />
                    <PaymentMethodDistributionSection payments={payments} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
