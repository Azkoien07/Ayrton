import { PaymentMethod } from '@/generated/graphql'

export interface PaymentItem {
    id: string;
    purchaseAmount: number;
    paymentMethod: PaymentMethod;
}