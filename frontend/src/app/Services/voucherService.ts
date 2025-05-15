// voucherService.ts
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import {
    GET_ALL_VOUCHERS,
    GET_VOUCHER_BY_ID,
    ADD_VOUCHER,
    UPDATE_VOUCHER,
    DELETE_VOUCHER
} from '@graphql/Vouchers/vouchersGraph';

export enum PaymentMethod {
    TarjetaCredito = "TarjetaCredito",
    TarjetaDebito = "TarjetaDebito",
    Paypal = "Paypal"
}

interface VoucherInput {
    code: string;
    paymentId: string;
}

export interface VoucherUpdateInput {
    code: string;
    paymentId: string;
}

export class VoucherService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllVouchers({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_VOUCHERS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allVouchers;
    }

    async getVoucherById(id: string) {
        const { data } = await this.client.query({
            query: GET_VOUCHER_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.voucherById;
    }

    async addVoucher(input: VoucherInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_VOUCHER,
            variables: { input }
        });
        return data.addVoucher;
    }

    async updateVoucher(id: string, input: VoucherUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_VOUCHER,
            variables: { id, input }
        });
        return data.updateVoucher;
    }

    async deleteVoucher(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_VOUCHER,
            variables: { id }
        });
        return data.deleteVoucher;
    }
}