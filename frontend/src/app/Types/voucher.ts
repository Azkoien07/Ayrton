import { Payment } from '@/generated/graphql';

export interface VoucherEntity {
    id: string; // Cambiado de number a string
    code: string;
    payment: Payment;
}

export interface VoucherCreateRequest {
    code: string;
    paymentId: number;
}
