import { Payment } from '@/generated/graphql'

export interface VoucherItem {
    id?: string | null
    code: string
    payment: Payment
}
