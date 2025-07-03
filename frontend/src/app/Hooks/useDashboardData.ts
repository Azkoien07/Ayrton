import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { fetchPayments } from '@slice/paymentSlice';
import { fetchVouchers } from '@slice/voucherSlice';
import { PaymentItem } from '@Types/slices/payment';
import { VoucherItem } from '@Types/slices/voucher';

interface DashboardStats {
    totalIngresos: number;
    totalEgresos: number;
    totalTransacciones: number;
    transaccionesPendientes: number;
    ingresosTrend: number;
    egresosTrend: number;
}

interface UseDashboardDataResult {
    payments: PaymentItem[];
    vouchers: VoucherItem[];
    loading: boolean;
    stats: DashboardStats;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterMethod: string;
    setFilterMethod: (method: string) => void;
    filteredPayments: PaymentItem[];
}

export const useDashboardData = (): UseDashboardDataResult => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: payments, loading: loadingPayments, error: errorPayments } = useSelector((state: RootState) => state.payment);
    const { data: vouchers, loading: loadingVouchers, error: errorVouchers } = useSelector((state: RootState) => state.voucher);

    const [page, setPage] = useState(0);
    const itemsPerPage = 5;

    const [searchTerm, setSearchTerm] = useState('');
    const [filterMethod, setFilterMethod] = useState('all');

    const [stats, setStats] = useState<DashboardStats>({
        totalIngresos: 0,
        totalEgresos: 0,
        totalTransacciones: 0,
        transaccionesPendientes: 0,
        ingresosTrend: 0,
        egresosTrend: 0
    });

    useEffect(() => {
        dispatch(fetchPayments({ page, size: itemsPerPage }));
        dispatch(fetchVouchers({ page, size: itemsPerPage }));
    }, [dispatch, page, itemsPerPage]);

    useEffect(() => {
        if (payments && payments.length > 0) {
            calculateStats(payments);
        }
    }, [payments]);

    const calculateStats = (paymentsData: PaymentItem[]) => {
        const totalTransacciones = paymentsData.length;
        const totalIngresos = paymentsData.reduce((sum, payment) => sum + (payment.purchaseAmount || 0), 0);
        const totalEgresos = 0;

        setStats({
            totalIngresos,
            totalEgresos,
            totalTransacciones,
            transaccionesPendientes: 0,
            ingresosTrend: 0,
            egresosTrend: 0
        });
    };

    const filteredPayments = payments.filter((payment: PaymentItem) => {
        const matchesSearch =
            (payment.voucher?.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesMethod =
            filterMethod === 'all' || payment.paymentMethod.toLowerCase() === filterMethod.toLowerCase();

        return matchesSearch && matchesMethod;
    });

    return {
        payments,
        vouchers,
        loading: loadingPayments || loadingVouchers,
        stats,
        searchTerm,
        setSearchTerm,
        filterMethod,
        setFilterMethod,
        filteredPayments
    };
};