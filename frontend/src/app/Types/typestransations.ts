import { VoucherEntity } from '@Types/voucher';
import { PaymentMethod } from '@/generated/graphql'; // Importar PaymentMethod del archivo generado

export interface PaymentEntity {
    id: string; 
    purchaseAmount: number;
    paymentMethod: PaymentMethod; // Usar el enum PaymentMethod de graphql.ts
    paymentDate: string;
    voucher?: VoucherEntity;
    users?: UserEntity[];
}

export interface UserEntity {
    id: string; // Cambiado de number a string
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
