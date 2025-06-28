import { Payment } from '@/generated/graphql';

export interface VoucherEntity {
    id?: string;
    code: string;
    payment: Payment;
}

export interface VoucherCreateRequest {
    code: string;
    paymentId: string;
}
