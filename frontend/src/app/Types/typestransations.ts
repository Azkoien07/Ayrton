import { VoucherEntity } from '@Types/voucher';

export interface PaymentEntity {
    id: number;
    purchaseAmount: number;
    paymentMethod: 'TarjetaCredito' | 'TarjetaDebito' | 'Paypal';
    paymentDate: string;
    voucher?: VoucherEntity;
    users?: UserEntity[];
}

export interface UserEntity {
    id: number;
    name: string;
    email: string;
    payments?: PaymentEntity[];
}

export interface DashboardStats {
    totalIngresos: number;
    totalEgresos: number;
    totalTransacciones: number;
    transaccionesPendientes: number;
    ingresosTrend: number;
    egresosTrend: number;
}

export interface PaymentFilters {
    searchTerm: string;
    paymentMethod: string;
    dateRange: string;
    startDate?: string;
    endDate?: string;
}

export interface PaymentCreateRequest {
    purchaseAmount: number;
    paymentMethod: 'TarjetaCredito' | 'TarjetaDebito' | 'Paypal';
    voucherId?: string; // Cambiado a string para consistencia
    userIds?: number[];
}
