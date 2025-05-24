// voucherService.ts
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { VoucherInput, VoucherUpdateInput } from '@/generated/graphql';
import {
    GET_ALL_VOUCHERS,
    GET_VOUCHER_BY_ID,
    ADD_VOUCHER,
    UPDATE_VOUCHER,
    DELETE_VOUCHER
} from '@graphql/Vouchers/vouchersGraph';
import {
    GetVouchersQuery,
    GetVoucherByIdQuery,
    AddVoucherMutation,
    UpdateVoucherMutation,
    DeleteVoucherMutation
} from '@/generated/graphql';

export class VoucherService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllVouchers({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetVouchersQuery>({
            query: GET_ALL_VOUCHERS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allVouchers;
    }

    async getVoucherById(id: string) {
        const { data } = await this.client.query<GetVoucherByIdQuery>({
            query: GET_VOUCHER_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.voucherById;
    }

    async addVoucher(input: VoucherInput) {
        const { data } = await this.client.mutate<AddVoucherMutation>({
            mutation: ADD_VOUCHER,
            variables: { input }
        });

        if (!data || !data.addVoucher) {
            throw new Error("Failed to add voucher");
        }
        return data.addVoucher;
    }

    async updateVoucher(id: string, input: VoucherUpdateInput) {
        const { data } = await this.client.mutate<UpdateVoucherMutation>({
            mutation: UPDATE_VOUCHER,
            variables: { id, input }
        });

        if (!data || !data.updateVoucher) {
            throw new Error("Failed to update voucher");
        }
        return data.updateVoucher;
    }

    async deleteVoucher(id: string) {
        const { data } = await this.client.mutate<DeleteVoucherMutation>({
            mutation: DELETE_VOUCHER,
            variables: { id }
        });

        if (!data || !data.deleteVoucher) {
            throw new Error("Failed to delete voucher");
        }
        return data.deleteVoucher;
    }
}