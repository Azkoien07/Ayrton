import { useState, useEffect } from 'react';
import { client } from '@/app/Lib/apollo-client';
import VoucherService from '@/app/Services/voucherService';
import { getAllPayments } from '@/app/Services/paymentService';
import { PaymentEntity } from '@Types/typestransations';
import { VoucherEntity } from '@Types/voucher';

interface DashboardStats {
    totalIngresos: number;
    totalEgresos: number;
    totalTransacciones: number;
    transaccionesPendientes: number;
    ingresosTrend: number;
    egresosTrend: number;
}

interface UseDashboardDataResult {
    payments: PaymentEntity[];
    vouchers: VoucherEntity[];
    loading: boolean;
    error: string | null;
    stats: DashboardStats;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterMethod: string;
    setFilterMethod: (method: string) => void;
    dateFilter: string;
    setDateFilter: (filter: string) => void;
    fetchPayments: () => Promise<void>;
    fetchVouchers: () => Promise<void>;
    filteredPayments: PaymentEntity[];
}

export const useDashboardData = (): UseDashboardDataResult => {
    const voucherService = new VoucherService(client);
    
    const [payments, setPayments] = useState<PaymentEntity[]>([]);
    const [vouchers, setVouchers] = useState<VoucherEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, size: 10 });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMethod, setFilterMethod] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [stats, setStats] = useState<DashboardStats>({
        totalIngresos: 0,
        totalEgresos: 0,
        totalTransacciones: 0,
        transaccionesPendientes: 0,
        ingresosTrend: 0,
        egresosTrend: 0
    });

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await getAllPayments(client, pagination);
            
            if (!response || response.code !== "200" || !response.data) {
                throw new Error(response?.message || 'Error al obtener los pagos');
            }
            
            const validPayments = response.data.filter(payment => payment !== null) as PaymentEntity[];
            setPayments(validPayments);
            calculateStats(validPayments);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
            console.error('Error al obtener pagos:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchVouchers = async () => {
        try {
            const data = await voucherService.getVouchers(pagination);
            setVouchers(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido al obtener vouchers');
            console.error('Error al obtener vouchers:', err);
        }
    };

    const calculateStats = (paymentsData: PaymentEntity[]) => {
        const totalTransacciones = paymentsData.length;
        const totalIngresos = paymentsData.reduce((sum, payment) => sum + payment.purchaseAmount, 0);
        
        const totalEgresos = 0;
        
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
        
        const ingresosTrend = previousMonthTotal > 
            0 ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 
            : 0;

        setStats({
            totalIngresos,
            totalEgresos,
            totalTransacciones,
            transaccionesPendientes: 0,
            ingresosTrend,
            egresosTrend: 0
        });
    };

    useEffect(() => {
        fetchPayments();
        fetchVouchers();
    }, []);

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = (payment.voucher?.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesMethod = filterMethod === 'all' || payment.paymentMethod.toLowerCase() === filterMethod.toLowerCase();
        
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

    return {
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
    };
};
