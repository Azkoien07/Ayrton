import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_VOUCHERS, GET_VOUCHER_BY_ID, ADD_VOUCHER, UPDATE_VOUCHER, DELETE_VOUCHER } from '@graphql/Vouchers/vouchersGraph';
import {
    VoucherInput,
    VoucherUpdateInput,
    GetAllVouchersQuery,
    GetAllVouchersQueryVariables,
    GetVoucherByIdQuery,
    GetVoucherByIdQueryVariables,
    AddVoucherMutation,
    AddVoucherMutationVariables,
    UpdateVoucherMutation,
    UpdateVoucherMutationVariables,
    DeleteVoucherMutation,
    DeleteVoucherMutationVariables
} from '@/generated/graphql';

export const getAllVouchers = async (client: ApolloClient<NormalizedCacheObject>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllVouchersQuery, GetAllVouchersQueryVariables>({
        query: GET_ALL_VOUCHERS,
        variables: { page, size },
        fetchPolicy: 'network-only'
    });

    return data.allVouchers;
};

export const getVoucherById = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.query<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>({
        query: GET_VOUCHER_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only'
    });

    return data.voucherById;
};

export const addVoucher = async (client: ApolloClient<NormalizedCacheObject>, input: VoucherInput) => {
    const { data } = await client.mutate<AddVoucherMutation, AddVoucherMutationVariables>({
        mutation: ADD_VOUCHER,
        variables: { input }
    });

    if (!data?.addVoucher) {
        throw new Error('Failed to add voucher');
    }

    return data.addVoucher;
};

export const updateVoucher = async (client: ApolloClient<NormalizedCacheObject>, id: string, input: VoucherUpdateInput) => {
    const { data } = await client.mutate<UpdateVoucherMutation, UpdateVoucherMutationVariables>({
        mutation: UPDATE_VOUCHER,
        variables: { id, input }
    });

    if (!data?.updateVoucher) {
        throw new Error('Failed to update voucher');
    }

    return data.updateVoucher;
};

export const deleteVoucher = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.mutate<DeleteVoucherMutation, DeleteVoucherMutationVariables>({
        mutation: DELETE_VOUCHER,
        variables: { id }
    });

    if (!data?.deleteVoucher) {
        throw new Error('Failed to delete voucher');
    }

    return data.deleteVoucher;
};